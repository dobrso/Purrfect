from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', verbose_name='Пользователь')
    avatar = models.ImageField('Аватар', null=True, blank=True)
    city = models.CharField('Город', max_length=20, null=True, blank=True)
    birth_date = models.DateField('Дата рождения', null=True, blank=True)
    phone_number = models.CharField('Номер телефона', max_length=20, null=True, blank=True)
    # Еще одно поле с животными!!! o2m

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def __str__(self):
        return f'Профиль {self.user.username}'