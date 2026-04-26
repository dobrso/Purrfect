from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from drf_spectacular.utils import extend_schema

from .models import Category, Product, Cart, CartItem
from .serializers import CategorySerializer, SimpleProductSerializer, ProductSerializer, CartSerializer, \
    AddCartItemSerializer, UpdateCartItemSerializer


@extend_schema(
    summary='Список категорий',
    description='Возвращает список всех категорий товаров',
    tags=['Маркетплейс']
)
class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

@extend_schema(
    summary='Список товаров',
    description='Возвращает список всех товаров',
    tags=['Маркетплейс']
)
class ProductListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = SimpleProductSerializer
    permission_classes = [permissions.AllowAny]

@extend_schema(
    summary='Детальная информация о товаре',
    description='Возвращает детальную информацию о товаре по его ID',
    tags=['Маркетплейс']
)
class ProductRetrieveAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class CartAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    @extend_schema(
        summary='Список товаров в корзине',
        description='Возвращает список товаров в корзине текущего пользователя',
        tags=['Маркетплейс']
    )
    def get(self, request):
        cart = self.get_cart(request.user)
        serializer = CartSerializer(cart)
        return Response({
            'cart': serializer.data,
        })

    @extend_schema(
        summary='Добавить товар в корзину',
        description='Добавляет товар в корзину текущего пользователя',
        tags=['Маркетплейс']
    )
    def post(self, request):
        serializer = AddCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']

        product = get_object_or_404(Product, id=product_id)

        cart = self.get_cart(request.user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={'quantity': quantity})

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        cart_serializer = CartSerializer(cart)
        return Response({
            'cart': cart_serializer.data,
        })

class CartItemAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_cart(self, user):
        cart = get_object_or_404(Cart, user=user)
        return cart

    def get_cart_item(self, item_id, cart):
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        return cart_item

    @extend_schema(
        summary='Обновить количество товара',
        description='Обновляет количество определенного товара',
        tags=['Маркетплейс']
    )
    def put(self, request, item_id):
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cart = self.get_cart(request.user)
        cart_item = self.get_cart_item(item_id, cart)

        cart_item.quantity = serializer.validated_data['quantity']
        cart_item.save()

        cart_serializer = CartSerializer(cart)
        return Response({
            'cart': cart_serializer.data,
        })

    @extend_schema(
        summary='Удалить товар',
        description='Удаляет товар из корзины текущего пользователя',
        tags=['Маркетплейс']
    )
    def delete(self, request, item_id):
        cart = self.get_cart(request.user)
        cart_item = self.get_cart_item(item_id, cart)
        cart_item.delete()

class CartClearAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_cart(self, user):
        cart = get_object_or_404(Cart, user=user)
        return cart

    @extend_schema(
        summary='Очистить корзину',
        description='Очищает корзину текущего пользователя',
        tags=['Маркетплейс']
    )
    def delete(self, request):
        cart = self.get_cart(request.user)
        cart.cart_items.all().delete()