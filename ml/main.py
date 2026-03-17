from pathlib import Path
from PIL import Image
import torchvision.transforms as T
import numpy as np
import torch
from torch.utils.data import TensorDataset, Subset, DataLoader

# Путь к папке с животными
path = Path('Pet_Breeds')
fixed_size = (256, 256)
transform = T.Compose([
    T.Resize(fixed_size),
    T.ToTensor(),
])

def main():
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

    xy = TensorDataset(x, y)

    N = len(xy)
    index_train = np.arange(0, int(N * 0.7))
    index_test = np.arange(int(N * 0.7), N)

    xy_train = Subset(xy, index_train)
    xy_test = Subset(xy, index_test)

    xy_train_batches = DataLoader(xy_train, batch_size=64, shuffle=True, drop_last=False)
    xy_test_batches = DataLoader(xy_test, batch_size=64, shuffle=True, drop_last=False)

    num_classes = len(classes)

    return xy_train_batches, xy_test_batches, num_classes


if __name__ == '__main__':
    xy_train_batches, xy_test_batches, num_classes = main()
    print(xy_train_batches)
    print(xy_test_batches)
    print(num_classes)