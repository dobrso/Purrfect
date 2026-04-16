from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Pet
from .serializers import PetsSerializer

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
    serializer_class = PetsSerializer
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
        serializer = PetsSerializer(pets, many=True)
        return Response({'pets': serializer.data})
