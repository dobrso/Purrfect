import time
from pathlib import Path
from PIL import Image
import torchvision.transforms as T
import numpy as np
import torch
from torch import nn, optim
from torch.utils.data import TensorDataset, Subset, DataLoader

from simple_cnn import SimpleCNN

# Путь к папке с животными
path = Path('Pet_Breeds')
fixed_size = (256, 256)
transform = T.Compose([
    T.Resize(fixed_size),
    T.ToTensor(),
])
device = torch.device('cpu')
epochs = 10

def create_data_batches():
    if not path.exists():
        print(f'Папка {path.name} не существует')
        return

    x_list = []
    y_list = []
    classes = []

    for class_index, breed_folder in enumerate(path.iterdir()):
        if not breed_folder.is_dir():
            continue

        classes.append(breed_folder.name)

        for image_path in breed_folder.iterdir():
            if not image_path.is_file():
                continue

            try:
                with Image.open(image_path) as image:
                    if image.mode != 'RGB':
                        image = image.convert('RGB')

                    image_tensor = transform(image)

                    x_list.append(image_tensor)
                    y_list.append(class_index)

            except Exception as e:
                print(f'Ошибка: {e}')

    x = torch.stack(x_list, dim=0)
    y = torch.tensor(y_list)

    sort_index = torch.randperm(x.shape[0])

    x_sort = x[sort_index]
    y_sort = y[sort_index]

    xy = TensorDataset(x_sort, y_sort)

    N = len(xy)
    index_train = np.arange(0, int(N * 0.7))
    index_test = np.arange(int(N * 0.7), N)

    xy_train = Subset(xy, index_train)
    xy_test = Subset(xy, index_test)

    xy_train_batches = DataLoader(xy_train, batch_size=64, shuffle=True, drop_last=False)
    xy_test_batches = DataLoader(xy_test, batch_size=64, shuffle=True, drop_last=False)

    num_classes = len(classes)

    return xy_train_batches, xy_test_batches, num_classes

@torch.no_grad()
def evaluate(model, loader, criterion):
    model.eval()
    correct, total, loss_sum = 0, 0, 0.0
    for x, y in loader:
        x, y = x.to(device), y.to(device)
        logits = model(x)
        loss = criterion(logits, y)
        loss_sum += loss.item() * x.size(0)

        preds = logits.argmax(dim=1)
        correct += (preds == y).sum().item()
        total += y.size(0)

    return loss_sum / total, correct / total

def train_one_epoch(model, loader, optimizer, criterion):
    model.train()
    running_loss = 0.0
    for x, y in loader:
        x, y = x.to(device), y.to(device)

        optimizer.zero_grad(set_to_none=True)
        logits = model(x)
        loss = criterion(logits, y)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * x.size(0)

    return running_loss / len(loader.dataset)

if __name__ == '__main__':
    print('Скрипт начал свое выполнение')
    time_start = time.time()

    try:
        xy_train_batches, xy_test_batches, num_classes = create_data_batches()
        model = SimpleCNN(num_classes).to(device)
        criterion = nn.CrossEntropyLoss()
        optimizer = optim.Adam(model.parameters(), lr=1e-3)

        print('Началось обучение модели')
        for epoch in range(1, epochs+1):
            train_loss = train_one_epoch(model, xy_train_batches, optimizer, criterion)
            test_loss, test_acc = evaluate(model, xy_test_batches, criterion)
            print(f'Epoch {epoch:02d} | train_loss={train_loss:.4f} | test_loss={test_loss:.4f} | test_acc={test_acc:.4f}')

    except Exception as e:
        print(e)

    time_end = time.time()
    print(f'Прошло {(time_end - time_start) / 60} минут')