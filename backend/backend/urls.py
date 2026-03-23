from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('main.urls')),
    path('api/auth/', include('users.urls')),
    path('api/articles/', include('articles.urls')),
    path('api/pets/', include('pets.urls')),
]
