from rest_framework import serializers

from .models import Article
from users.serializers import SimpleUserSerializer


class ArticleSerializer(serializers.ModelSerializer):
    author = SimpleUserSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'author']