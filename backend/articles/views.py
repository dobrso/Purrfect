from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Article
from .serializers import ArticlesSerializer

class ArticlesList(APIView):
    queryset = Article.objects.all()
    serializer_class = ArticlesSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        articles = Article.objects.all()
        serializer = ArticlesSerializer(articles, many=True)
        return Response({
            'articles': serializer.data,
        }, status=status.HTTP_200_OK)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({
                "message": "Требуется авторизация"
            }, status=status.HTTP_401_UNAUTHORIZED)

        serializer = ArticlesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Статья успешно создана",
                "article": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "message": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class ArticleDetail(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, article_id):
        article = Article.objects.get(id=article_id)
        serializer = ArticlesSerializer(article)
        return Response({
            "article": serializer.data,
        }, status=status.HTTP_200_OK)

    def put(self, request, article_id):
        if not request.user.is_authenticated:
            return Response({
                "message": "Требуется авторизация"
            }, status=status.HTTP_401_UNAUTHORIZED)

        article = Article.objects.get(id=article_id)

        if article.author != request.user:
            return Response({
                "message": "У вас нет прав на данное действие"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = ArticlesSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "article": serializer.data
            }, status=status.HTTP_200_OK)

        return Response({
            "message": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, article_id):
        if not request.user.is_authenticated:
            return Response({
                "message": "Требуется авторизация"
            }, status=status.HTTP_401_UNAUTHORIZED)

        article = Article.objects.get(id=article_id)

        if article.author != request.user:
            return Response({
                "message": "У вас нет прав на данное действие"
            }, status=status.HTTP_403_FORBIDDEN)

        article.delete()
        return Response({
            "message": "Статья успешно удалена"
        }, status=status.HTTP_204_NO_CONTENT)
