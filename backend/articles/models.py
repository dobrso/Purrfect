from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    title = models.CharField('Заголовок', max_length=200)
    content = models.TextField('Содержание', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles', verbose_name='Автор', null=True, blank=True)
    preview_image = models.ImageField(null=True, blank=True)

    class Meta:
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'

    def __str__(self):
        return self.title
