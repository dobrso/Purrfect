from rest_framework import permissions, viewsets
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse, OpenApiExample
from drf_spectacular.types import OpenApiTypes

from .models import Article
from .serializers import ArticlesSerializer

@extend_schema_view(
    list=extend_schema(
        summary="Получить список всех статей",
        description="Возвращает список всех статей в системе. Доступно без авторизации.",
        tags=["Статьи"],
    ),
    create=extend_schema(
        summary="Создать новую статью",
        description="Создает новую статью. Требуется авторизация.",
        tags=["Статьи"],
    ),
    retrieve=extend_schema(
        summary="Получить статью по ID",
        description="Возвращает статью по указанному ID.",
        tags=["Статьи"],
    ),
    update=extend_schema(
        summary="Полное обновление статьи",
        description="Обновляет все поля статьи. Только автор может редактировать.",
        tags=["Статьи"],
    ),
    partial_update=extend_schema(
        summary="Частичное обновление статьи",
        description="Обновляет отдельные поля статьи. Только автор может редактировать.",
        tags=["Статьи"],
    ),
    destroy=extend_schema(
        summary="Удалить статью",
        description="Удаляет статью. Только автор может удалить.",
        tags=["Статьи"],
    ),
)
class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticlesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
