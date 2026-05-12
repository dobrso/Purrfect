import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

import torch
import torch.nn as nn
from torch.optim import Adam, lr_scheduler
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, transforms

from pet_classfier import PetClassifier

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_data(data_path):
    transform = transforms.Compose([
        transforms.Resize((128, 128)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    dataset = datasets.ImageFolder(root=data_path, transform=transform)

    train_size = int(0.8 * len(dataset))
    test_size = len(dataset) - train_size
    train_dataset, test_dataset = random_split(dataset, [train_size, test_size])

    return train_dataset, test_dataset, dataset.classes

def train_epoch(model, dataloader, loss_function, optimizer, device):
    model.train()
    total_loss = 0
    correct = 0

    for x_batch, y_batch in dataloader:
        x_batch = x_batch.to(device)
        y_batch = y_batch.to(device)

        y_pred = model(x_batch)
        loss = loss_function(y_pred, y_batch)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        total_loss += loss.item() * x_batch.size(0)
        correct += (y_pred.argmax(1) == y_batch).sum().item()

    avg_loss = total_loss / len(dataloader.dataset)
    accuracy = correct / len(dataloader.dataset)

    return avg_loss, accuracy

def evaluate_epoch(model, dataloader, loss_function, device):
    model.eval()
    total_loss = 0
    correct = 0

    with torch.no_grad():
        for x_batch, y_batch in dataloader:
            x_batch = x_batch.to(device)
            y_batch = y_batch.to(device)

            y_pred = model(x_batch)
            loss = loss_function(y_pred, y_batch)

            total_loss += loss.item() * x_batch.size(0)
            correct += (y_pred.argmax(1) == y_batch).sum().item()

    avg_loss = total_loss / len(dataloader.dataset)
    accuracy = correct / len(dataloader.dataset)

    return avg_loss, accuracy


def train_model(model, train_dataset, test_dataset, n_epochs, batch_size, learning_rate, device):
    train_loader = DataLoader(train_dataset, batch_size=batch_size,
                              shuffle=True, drop_last=False)
    test_loader = DataLoader(test_dataset, batch_size=batch_size,
                             shuffle=False, drop_last=False)

    optimizer = Adam(model.parameters(), lr=learning_rate)
    loss_function = nn.CrossEntropyLoss()

    scheduler = lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='min', factor=0.5, patience=10,
        threshold=1e-4, cooldown=2, min_lr=1e-6
    )

    history = {
        "learning_rate": [],
        "train_loss": [],
        "train_acc": [],
        "test_loss": [],
        "test_acc": []
    }

    for epoch in range(1, n_epochs + 1):
        train_loss, train_acc = train_epoch(
            model, train_loader, loss_function, optimizer, device
        )

        test_loss, test_acc = evaluate_epoch(
            model, test_loader, loss_function, device
        )

        scheduler.step(test_loss)
        current_lr = optimizer.param_groups[0]['lr']

        history["learning_rate"].append(current_lr)
        history["train_loss"].append(train_loss)
        history["train_acc"].append(train_acc)
        history["test_loss"].append(test_loss)
        history["test_acc"].append(test_acc)

        print(f"epoch: {epoch:3d} | "
              f"lr: {current_lr:.6f} | "
              f"train_loss: {train_loss:.6f} | "
              f"train_acc: {train_acc:.6f} | "
              f"test_loss: {test_loss:.6f} | "
              f"test_acc: {test_acc:.6f}")

    return history

def plot_training_history(history):
    train_acc_percent = [acc * 100 for acc in history["train_acc"]]
    test_acc_percent = [acc * 100 for acc in history["test_acc"]]

    plt.figure(figsize=(12, 7))

    plt.plot(range(1, len(train_acc_percent) + 1), train_acc_percent,
             label='Train Accuracy', color='blue', linewidth=2, marker='o', markersize=4)
    plt.plot(range(1, len(test_acc_percent) + 1), test_acc_percent,
             label='Test Accuracy', color='red', linewidth=2, marker='s', markersize=4)

    max_train_epoch = np.argmax(train_acc_percent)
    max_test_epoch = np.argmax(test_acc_percent)
    max_train_acc = max(train_acc_percent)
    max_test_acc = max(test_acc_percent)

    plt.scatter(max_train_epoch + 1, max_train_acc,
                color='blue', s=100, zorder=5, edgecolors='black', linewidth=1.5)
    plt.scatter(max_test_epoch + 1, max_test_acc,
                color='red', s=100, zorder=5, edgecolors='black', linewidth=1.5)

    plt.annotate(f'Best: {max_train_acc:.1f}%',
                 xy=(max_train_epoch + 1, max_train_acc),
                 xytext=(max_train_epoch + 1, max_train_acc + 5),
                 ha='center', fontsize=10, fontweight='bold',
                 bbox=dict(boxstyle="round,pad=0.3", facecolor="lightblue", alpha=0.7))

    plt.annotate(f'Best: {max_test_acc:.1f}%',
                 xy=(max_test_epoch + 1, max_test_acc),
                 xytext=(max_test_epoch + 1, max_test_acc - 8),
                 ha='center', fontsize=10, fontweight='bold',
                 bbox=dict(boxstyle="round,pad=0.3", facecolor="lightcoral", alpha=0.7))

    plt.xlabel('Epoch', fontsize=14, fontweight='bold')
    plt.ylabel('Accuracy (%)', fontsize=14, fontweight='bold')
    plt.title('Model Accuracy During Training', fontsize=16, fontweight='bold')
    plt.legend(fontsize=12, loc='lower right')
    plt.grid(True, alpha=0.3, linestyle='--')

    plt.xticks(range(1, len(train_acc_percent) + 1, max(1, len(train_acc_percent) // 10)))
    plt.ylim(0, 105)

    plt.axhline(y=100, color='green', linestyle='--', alpha=0.5, label='100%')

    plt.tight_layout()
    plt.show()

    print_statistics(history)

def print_statistics(history):
    print("\n" + "=" * 60)
    print("МЕТРИКИ ОБУЧЕНИЯ")
    print("=" * 60)

    best_train_acc = max(history["train_acc"])
    best_test_acc = max(history["test_acc"])
    best_train_acc_epoch = history["train_acc"].index(best_train_acc)
    best_test_acc_epoch = history["test_acc"].index(best_test_acc)

    best_train_loss = min(history["train_loss"])
    best_test_loss = min(history["test_loss"])
    best_train_loss_epoch = history["train_loss"].index(best_train_loss)
    best_test_loss_epoch = history["test_loss"].index(best_test_loss)

    print(f"Лучшая точность на обучении: {best_train_acc:.4f} (эпоха {best_train_acc_epoch})")
    print(f"Лучшая точность на тесте: {best_test_acc:.4f} (эпоха {best_test_acc_epoch})")
    print(f"Минимальные потери на обучении: {best_train_loss:.4f} (эпоха {best_train_loss_epoch})")
    print(f"Минимальные потери на тесте: {best_test_loss:.4f} (эпоха {best_test_loss_epoch})")
    print(f"Разрыв между train и test accuracy: {best_train_acc - best_test_acc:.4f}")
    print(f"Финальная learning rate: {history['learning_rate'][-1]:.6f}")
    print("=" * 60)

    if best_test_acc_epoch < len(history["test_acc"]) - 10:
        print("\nВозможно переобучение!")
        print(f"Лучшая точность на тесте достигнута на эпохе {best_test_acc_epoch}, "
              f"а обучение продолжалось до {len(history['test_acc'])} эпох")
    else:
        print("\n✓ Модель хорошо обобщает данные")

def main():
    DATA_PATH = 'Pet_Breeds'
    N_EPOCHS = 2
    BATCH_SIZE = 16
    LEARNING_RATE = 0.001

    print("=" * 60)
    print("ЗАПУСК ОБУЧЕНИЯ МОДЕЛИ")
    print("=" * 60)
    print(f"Device: {device}")
    print(f"Data path: {DATA_PATH}")
    print(f"Epochs: {N_EPOCHS}")
    print(f"Batch size: {BATCH_SIZE}")
    print(f"Learning rate: {LEARNING_RATE}")
    print("=" * 60 + "\n")

    train_dataset, test_dataset, classes = load_data(DATA_PATH)
    print(f"Найдено классов: {len(classes)}")
    print(f"Классы: {classes}")
    print(f"Размер обучающей выборки: {len(train_dataset)}")
    print(f"Размер тестовой выборки: {len(test_dataset)}")
    print()

    model = PetClassifier(num_classes=len(classes)).to(device)

    print("Начало обучения...\n")
    history = train_model(
        model=model,
        train_dataset=train_dataset,
        test_dataset=test_dataset,
        n_epochs=N_EPOCHS,
        batch_size=BATCH_SIZE,
        learning_rate=LEARNING_RATE,
        device=device
    )

    plot_training_history(history)

    print("\nОбучение завершено успешно!")

if __name__ == "__main__":
    main()