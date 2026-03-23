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

class ArticleDetail:
    pass