from rest_framework import permissions
from rest_framework.generics import ListAPIView, CreateAPIView
from drf_spectacular.utils import extend_schema

from .models import Specialist, Consultation
from .serializers import SpecialistSerializer, ConsultationSerializer


@extend_schema(
    summary='Получить список специалистов',
    description='Возвращает список всех специалистов по животным',
    tags=['Медицина'],
)
class SpecialistListAPIView(ListAPIView):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer
    permission_classes = [permissions.AllowAny]

@extend_schema(
    summary='Получить список записей пользователя',
    description='Возвращает список записей к специалистам текущего пользователя',
    tags=['Медицина'],
)
class UserConsultationListAPIView(ListAPIView):
    serializer_class = ConsultationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Consultation.objects.filter(user=self.request.user)


@extend_schema(
    summary='Создать новую запись',
    description='Создает новую запись к специалисту для текущего пользователя',
    tags=['Медицина'],
)
class ConsultationCreateAPIView(CreateAPIView):
    serializer_class = ConsultationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        specialist_id = request.data.get('specialist')

        self.perform_create(serializer)