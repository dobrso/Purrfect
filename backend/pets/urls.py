from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PetViewSet, PredictionAPIView

router = DefaultRouter()
router.register(r'pets', PetViewSet, basename='pets')

urlpatterns = [
    path('', include(router.urls)),
    path('prediction/', PredictionAPIView.as_view(), name='prediction'),
]