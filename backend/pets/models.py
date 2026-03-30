from django.db import models
from django.contrib.auth.models import User

class Pet(models.Model):
    name = models.CharField('Кличка', max_length=200)
    city = models.CharField('Город', max_length=200)
    age = models.IntegerField('Возраст')
    breed = models.CharField('Порода', max_length=200)
    color = models.CharField('Окрас', max_length=200)
    image = models.ImageField('Изображение', null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pets', verbose_name='Владелец')

    class Meta:
        verbose_name = 'Питомец'
        verbose_name_plural = 'Питомцы'

    def __str__(self):
        return self.name