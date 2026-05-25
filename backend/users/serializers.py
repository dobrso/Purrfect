from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password

from .models import Profile

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirmation = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirmation']

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError(
                {"password": "Пароли не совпадают"}
            )
        return data

    def validate_username(self, data):
        if User.objects.filter(username=data).exists():
            raise serializers.ValidationError('Пользователь с таким именем уже существует!')
        return data

    def validate_email(self, data):
        if User.objects.filter(email=data).exists():
            raise serializers.ValidationError('Пользователь с таким адресом почты уже существует!')
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirmation')
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source='profile.avatar', required=False, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'avatar']

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            try:
                user_object = User.objects.get(email=email)
                user = authenticate(username=user_object.username, password=password)
            except User.DoesNotExist:
                raise serializers.ValidationError("Пользователь не существует!")

        data['user'] = user
        return data

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['avatar', 'city', 'birth_date', 'phone_number']