from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Specialist(models.Model):
    name = models.CharField(max_length=100)
    speciality = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Специалист'
        verbose_name_plural = 'Специалисты'

    def __str__(self):
        return f'{self.name} - {self.speciality}'

class Consultation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    specialist = models.ForeignKey(Specialist, on_delete=models.CASCADE)
    time = models.DateTimeField()

    class Meta:
        verbose_name = 'Запись к специалисту'
        verbose_name_plural = 'Записи к специалистам'

    def __str__(self):
        return f'{self.user.username} - {self.specialist.speciality}: {self.time}'
