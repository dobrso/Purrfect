import os
import io
import base64
import requests
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Pet
from .serializers import PetSerializer
from backend.settings import BASE_DIR


class PetClassifier(nn.Module):
    def __init__(self, num_classes):
        super(PetClassifier, self).__init__()

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),

            nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),

            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 16 * 16, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

transform = transforms.Compose([
        transforms.Resize((128, 128)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

model = None
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def load_model():
    global model
    model = PetClassifier(num_classes=23)

    weights_path = os.path.join(BASE_DIR, 'pet_classifier.pth')
    state_dict = torch.load(weights_path, map_location=device, weights_only=True)
    model.load_state_dict(state_dict)

    model = model.to(device)
    model.eval()
    print(f"Модель загружена на {device}")

load_model()

@extend_schema_view(
    list=extend_schema(
        summary='Получить профили всех питомцев',
        description='Возвращает профили всех питомцев в системе. Требуется авторизация.',
        tags=['Питомцы'],
    ),
    create=extend_schema(
        summary='Создать новый профиль питомца',
        description='Создает новый профиль питомца. Требуется авторизация.',
        tags=['Питомцы'],
    ),
    retrieve=extend_schema(
        summary='Получить профиль питомца по ID',
        description='Возвращает профиль питомца по указанному ID.',
        tags=['Питомцы'],
    ),
    update=extend_schema(
        summary='Полное обновление профиля питомца',
        description='Обновляет все поля профиля питомца. Только владелец может редактировать.',
        tags=['Питомцы'],
    ),
    partial_update=extend_schema(
        summary='Частичное обновление профиля питомца',
        description='Обновляет отдельные поля профиля питомца. Только владелец может редактировать.',
        tags=['Питомцы'],
    ),
    destroy=extend_schema(
        summary='Удалить профиль питомца',
        description='Удаляет профиль питомца. Только владелец может удалить.',
        tags=['Питомцы'],
    ),
)
class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary='Получить профили питомцев по ID владельца.',
        description='Возвращает профили всех питомцев по заданному ID владельца. Требуется авторизация.',
        tags=['Питомцы'],
    )
    @action(detail=False, methods=['get'], url_path='owner/(?P<owner_id>[0-9]+)')
    def pet_list_by_owner(self, request, owner_id):
        if not request.user.is_authenticated or request.user.id != owner_id:
            return Response({'error': 'У вас нет прав на это действие!'})
        pets = Pet.objects.filter(owner_id=owner_id)
        serializer = PetSerializer(pets, many=True)
        return Response({'pets': serializer.data})

class PredictionAPIView(APIView):
    @extend_schema(
        summary='Определитель породы',
        description='Предсказывает породу животного по его фотографии',
        tags=['Питомцы']
    )
    def post(self, request):
        global model

        image = None

        if 'image' in request.FILES:
            image_file = request.FILES['image']
            image = Image.open(image_file).convert('RGB')

        elif 'image_base64' in request.data:
            base64_str = request.data['image_base64']
            if ',' in base64_str:
                base64_str = base64_str.split(',')[1]
            image_bytes = base64.b64decode(base64_str)
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

        elif 'image_url' in request.data:
            response = requests.get(request.data['image_url'], timeout=10)
            image = Image.open(io.BytesIO(response.content)).convert('RGB')

        else:
            return Response(
                {"error": "Изображение не найдено. Передайте 'image' (файл), 'image_base64' или 'image_url'"}
            )

        try:
            input_tensor = transform(image)
            input_batch = input_tensor.unsqueeze(0)
            input_batch = input_batch.to(device)
        except Exception as e:
            return Response(
                {"error": f"Ошибка обработки изображения: {str(e)}"}
            )

        with torch.no_grad():
            outputs = model(input_batch)
            probabilities = torch.softmax(outputs, dim=1)
            predicted_class = torch.argmax(probabilities, dim=1).item()
            confidence = probabilities[0][predicted_class].item()

        return Response({
            "status": "success",
            "predicted_class": predicted_class,
            "confidence": round(confidence, 4),
            "all_probabilities": probabilities.cpu().numpy().tolist()[0]
        })