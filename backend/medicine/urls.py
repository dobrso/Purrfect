from django.urls import path

from .views import SpecialistListAPIView, UserConsultationListAPIView, ConsultationCreateAPIView

urlpatterns = [
    path('specialists/', SpecialistListAPIView.as_view(), name='specialist_list'),
    path('consultations/', UserConsultationListAPIView.as_view(), name='consultation_list'),
    path('consultations/create/', ConsultationCreateAPIView.as_view(), name='consultation_create'),
]