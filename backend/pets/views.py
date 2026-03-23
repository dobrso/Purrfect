from rest_framework import status, permissions
from rest_framework.views import APIView

class PetDetail(APIView):
    permission_class = [permissions.IsAuthenticated]

    def get(self, request, pet_id):
        pass

    def put(self, request, pet_id):
        pass

    def delete(self, request, pet_id):
        pass

class PetList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, owner_id):
        pass