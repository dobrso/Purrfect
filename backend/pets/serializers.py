from rest_framework import serializers

from .models import Pet


class PetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'city', 'age', 'breed', 'color', 'image', 'owner']