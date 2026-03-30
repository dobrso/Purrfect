from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Pet
from .serializers import PetsSerializer

class PetDetail(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pet_id):
        if not request.user.is_authenticated or request.user.id != owner_id:
            return Response(
                {"message": "У вас нет прав на данное действие"},
            )

        pet = Pet.objects.get(pet_id=pet_id)
        serializer = PetsSerializer(pet)
        return Response(
            {"pet": serializer.data},
            status=status.HTTP_200_OK
        )

    def put(self, request, pet_id):
        if not request.user.is_authenticated or request.user.id != owner_id:
            return Response(
                {"message": "У вас нет прав на данное действие"},
            )

        pet = Pet.objects.get(pet_id=pet_id)
        serializer = PetsSerializer(pet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"pet": serializer.data},
                status=status.HTTP_200_OK
            )

        return Response(
            {"message": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pet_id):
        if not request.user.is_authenticated or request.user.id != owner_id:
            return Response(
                {"message": "У вас нет прав на данное действие"},
            )

        pet = Pet.objects.get(pet_id=pet_id)
        pet.delete()
        return Response(
            {"message": "Питомец удален"},
            status=status.HTTP_200_OK
        )

class PetList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, owner_id):
        if not request.user.is_authenticated or request.user.id != owner_id:
            return Response(
                {"message": "У вас нет прав на данное действие"},
            )

        pets = Pet.objects.filter(owner_id=owner_id)
        serializer = PetsSerializer(pets, many=True)
        return Response(
            {"pets": serializer.data},
            status=status.HTTP_200_OK
        )

    def post(self, request, owner_id):
        if not request.user.is_authenticated or request.user.id != owner_id:
            return Response(
                {"message": "У вас нет прав на данное действие"},
            )

        data = request.data.copy()
        data['owner_id'] = owner_id

        serializer = PetsSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"pet": serializer.data},
                status=status.HTTP_201_CREATED
            )

        return Response(
            {"message": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )