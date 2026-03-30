from django.urls import path

from .views import PetList, PetDetail

urlpatterns = [
    path('<int:owner_id>/', PetList.as_view(), name='pet_list'),
    path('pet/<int:pet_id>/', PetDetail.as_view(), name='pet_detail'),
]