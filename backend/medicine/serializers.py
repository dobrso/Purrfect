from rest_framework import serializers

from .models import Specialist, Consultation
from users.serializers import SimpleUserSerializer


class SpecialistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialist
        fields = ['id', 'name', 'speciality']

class ConsultationSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)
    specialist = SpecialistSerializer(read_only=True)

    class Meta:
        model = Consultation
        fields = ['id', 'user', 'specialist', 'time']