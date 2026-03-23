from torch import nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),  # (B,32,32,32)
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),  # (B,32,16,16)

            nn.Conv2d(32, 64, kernel_size=3, padding=1),  # (B,64,16,16)
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),  # (B,64,8,8)

            nn.Conv2d(64, 128, kernel_size=3, padding=1),  # (B,128,8,8)
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),  # (B,128,4,4)
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 32 * 32, 256),
            nn.ReLU(inplace=True),
            nn.Dropout(0.3),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x