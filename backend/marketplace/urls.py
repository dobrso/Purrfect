from django.urls import path

from .views import CategoryListAPIView, ProductListAPIView, ProductRetrieveAPIView, CartAPIView, CartItemAPIView, \
    CartClearAPIView

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category_list'),
    path('products/', ProductListAPIView.as_view(), name='product_list'),
    path('products/<int:pk>/', ProductRetrieveAPIView.as_view(), name='product_detail'),
    path('cart/', CartAPIView.as_view(), name='cart'),
    path('cart/items/<int:item_id>/', CartItemAPIView.as_view(), name='cart_item'),
    path('cart/clear/', CartClearAPIView.as_view(), name='cart_clear'),
]