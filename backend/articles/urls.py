from django.urls import path

from .views import ArticlesList, ArticleDetail

urlpatterns = [
    path('', ArticlesList.as_view(), name='articles_list'),
    path('<int:article_id>/', ArticleDetail.as_view(), name='article_detail'),
]