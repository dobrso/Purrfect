import torch.nn as nn

# class PetClassifier(nn.Sequential):
#     def __init__(self, num_classes):
#         self.features = nn.Sequential(
#             nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1),
#             nn.ReLU(),
#             nn.MaxPool2d(kernel_size=2, stride=2),
#
#             nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, padding=1),
#             nn.ReLU(),
#             nn.MaxPool2d(kernel_size=2, stride=2),
#
#             nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, padding=1),
#             nn.ReLU(),
#             nn.MaxPool2d(kernel_size=2, stride=2),
#         )
#
#         self.classifier = nn.Sequential(
#             nn.Flatten(),
#             nn.Linear(128 * 16 * 16, 512),
#             nn.ReLU(),
#             nn.Dropout(0.5),
#             nn.Linear(512, num_classes)
#         )
#
#     def forward(self, x):
#         x = self.features(x)
#         x = self.classifier(x)
#         return x

class PetClassifier(nn.Sequential):
    def __init__(self, num_classes):
        self.features = nn.Sequential(

            # исходное изображение       # size = 64 x 64, chanels = 3
            nn.Conv2d(in_channels=3,
                      out_channels=16,
                      kernel_size=3,
                      stride=1,
                      padding=1),  # size = 64 x 64, chanels = 16
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2,
                         stride=2,
                         padding=0),  # size = 32 x 32, chanels = 16
            nn.Conv2d(in_channels=16,
                      out_channels=32,
                      kernel_size=3,
                      stride=1,
                      padding=1),  # size = 32 x 32, chanels = 32
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2,
                         stride=2,
                         padding=0))  # size = 16 x 16, chanels = 32

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(16 * 16 * 32, 512),
            nn.ReLU(),
            nn.Linear(512, num_classes))

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x