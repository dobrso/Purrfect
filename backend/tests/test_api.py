import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import datetime, timedelta
from django.utils import timezone
import base64
from io import BytesIO
from PIL import Image

from articles.models import Article
from marketplace.models import Category, Product, Cart, CartItem
from medicine.models import Specialist, Consultation
from pets.models import Pet
from users.models import Profile

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user(db):
    return User.objects.create_user(
        username='testuser',
        password='testpassword',
        email='test@example.com'
    )

@pytest.fixture
def another_user(db):
    return User.objects.create_user(
        username='anotheruser',
        password='anotherpassword',
    )

@pytest.fixture
def authenticated_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client

@pytest.fixture
def article(db, user):
    return Article.objects.create(
        title='Тестовая Статья',
        content='Тестовое описание',
        author=user
    )

@pytest.fixture
def category(db):
    return Category.objects.create(name='Корм')

@pytest.fixture
def product(db, category):
    product = Product.objects.create(
        name='Кошачий корм',
        description='Очень вкусный',
        price=999.99,
        in_stock=True
    )
    product.categories.add(category)
    return product

@pytest.fixture
def out_of_stock_product(db):
    return Product.objects.create(
        name='Товар недоступен',
        description='Нет в наличии',
        price=49.99,
        in_stock=False
    )

@pytest.fixture
def cart(db, user):
    return Cart.objects.create(user=user)

@pytest.fixture
def cart_item(db, cart, product):
    return CartItem.objects.create(cart=cart, product=product, quantity=3)

@pytest.fixture
def specialist(db):
    return Specialist.objects.create(
        name='Наталья Олеговна',
        speciality='Грумер'
    )

@pytest.fixture
def consultation(db, user, specialist):
    return Consultation.objects.create(
        user=user,
        specialist=specialist,
        time=timezone.now() + timedelta(days=1)
    )

@pytest.fixture
def pet(db, user):
    return Pet.objects.create(
        name='Песик',
        city='Москва',
        age=3,
        breed='Чихуахуа',
        color='Черный',
        owner=user
    )

@pytest.fixture
def profile(db, user):
    return Profile.objects.create(
        user=user,
        city='Москва',
        phone_number='+79991234567'
    )

@pytest.mark.django_db
class TestArticleAPI:
    def test_list_articles_unauthorized(self, api_client, article):
        url = reverse('articles-list')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1

    def test_create_article_authorized(self, authenticated_client, user):
        url = reverse('articles-list')
        data = {
            'title': 'Новое название',
            'content': 'Новое описание'
        }
        response = authenticated_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED

    def test_create_article_unauthorized(self, api_client):
        url = reverse('articles-list')
        data = {
            'title': 'Новое название',
            'content': 'Новое описание'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_update_article_authorized_owner(self, authenticated_client, article, user):
        url = reverse('articles-detail', args=[article.id])
        data = {'title': 'Обновленное название'}
        response = authenticated_client.patch(url, data)
        assert response.status_code == status.HTTP_200_OK
        article.refresh_from_db()
        assert article.title == 'Обновленное название'

    def test_delete_article_owner(self, authenticated_client, article):
        url = reverse('articles-detail', args=[article.id])
        response = authenticated_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Article.objects.count() == 0

    def test_retrieve_article_detail(self, api_client, article):
        url = reverse('articles-detail', args=[article.id])
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == article.title

@pytest.mark.django_db
class TestMarketplaceAPI:
    def test_category_list(self, api_client, category):
        url = reverse('category_list')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'Корм'

    def test_product_list(self, api_client, product):
        url = reverse('product_list')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1

    def test_product_detail(self, api_client, product):
        url = reverse('product_detail', args=[product.id])
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == 'Кошачий корм'

    def test_add_to_cart(self, authenticated_client, user, product):
        url = reverse('cart')
        data = {'product_id': product.id, 'quantity': 2}
        response = authenticated_client.post(url, data)
        assert response.status_code == status.HTTP_200_OK
        assert 'cart' in response.data

        cart = Cart.objects.get(user=user)
        assert cart.cart_items.count() == 1
        assert cart.cart_items.first().quantity == 2

    def test_add_to_cart_product_not_found(self, authenticated_client):
        url = reverse('cart')
        data = {'product_id': 99999, 'quantity': 1}
        response = authenticated_client.post(url, data)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_add_duplicate_to_cart(self, authenticated_client, user, product):
        url = reverse('cart')

        authenticated_client.post(url, {'product_id': product.id, 'quantity': 2})
        response = authenticated_client.post(url, {'product_id': product.id, 'quantity': 3})

        cart = Cart.objects.get(user=user)
        cart_item = cart.cart_items.first()
        assert cart_item.quantity == 5
        assert response.status_code == status.HTTP_200_OK

    def test_get_cart(self, authenticated_client, cart, cart_item):
        url = reverse('cart')
        response = authenticated_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['cart']) == 5

    def test_update_cart_item(self, authenticated_client, cart, cart_item):
        url = reverse('cart_item', args=[cart_item.id])
        response = authenticated_client.put(url, {'quantity': 10})
        assert response.status_code == status.HTTP_200_OK
        cart_item.refresh_from_db()
        assert cart_item.quantity == 10

    def test_update_cart_item_invalid_quantity(self, authenticated_client, cart_item):
        url = reverse('cart_item', args=[cart_item.id])
        response = authenticated_client.put(url, {'quantity': -5})
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_delete_cart_item(self, authenticated_client, cart, cart_item):
        url = reverse('cart_item', args=[cart_item.id])
        response = authenticated_client.delete(url)
        assert response.status_code == status.HTTP_200_OK
        assert CartItem.objects.filter(id=cart_item.id).count() == 0

    def test_clear_cart(self, authenticated_client, cart, cart_item):
        url = reverse('cart_clear')
        response = authenticated_client.delete(url)
        assert response.status_code == status.HTTP_200_OK
        assert cart.cart_items.count() == 0

@pytest.mark.django_db
class TestConsultationAPI:
    def test_specialist_list(self, api_client, specialist):
        url = reverse('specialist_list')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'Наталья Олеговна'

    def test_user_consultations_list(self, authenticated_client, consultation, user):
        url = reverse('consultation_list')
        response = authenticated_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['user']['id'] == user.id

    def test_user_consultations_unauthorized(self, api_client):
        url = reverse('consultation_list')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
class TestPetAPI:
    def test_list_pets_unauthorized(self, api_client):
        url = reverse('pets-list')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_list_pets_authorized(self, authenticated_client, pet):
        url = reverse('pets-list')
        response = authenticated_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_create_pet(self, authenticated_client, user):
        url = reverse('pets-list')
        data = {
            'name': 'Бобик',
            'city': 'Владивосток',
            'age': 2,
            'breed': 'Овчарка',
            'color': 'Коричневый',
            'owner': user.id
        }
        response = authenticated_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Pet.objects.count() == 1

    def test_update_own_pet(self, authenticated_client, pet, user):
        url = reverse('pets-detail', args=[pet.id])
        data = {'name': 'Питомец обновился'}
        response = authenticated_client.patch(url, data)
        assert response.status_code == status.HTTP_200_OK
        pet.refresh_from_db()
        assert pet.name == 'Питомец обновился'

@pytest.mark.django_db
class TestAuthAPI:
    def test_register_user(self, api_client):
        url = reverse('register')
        data = {
            'username': 'newuser',
            'password': 'very123har6password',
            'password_confirmation': 'very123har6password',
            'email': 'new@example.com',
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert 'access' in response.data
        assert 'refresh' in response.data
        assert User.objects.count() == 1

    def test_register_duplicate_username(self, api_client, user):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'password': 'pass123',
            'email': 'test2@example.com'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_login_success(self, api_client, user):
        url = reverse('login')
        data = {
            'email': 'test@example.com',
            'password': 'testpassword'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
        assert 'refresh' in response.data
        assert response.data['user']['email'] == 'test@example.com'

    def test_login_wrong_password(self, api_client, user):
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_get_profile(self, authenticated_client, user, profile):
        url = reverse('profile')
        response = authenticated_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['username'] == 'testuser'

    def test_update_profile(self, authenticated_client, user):
        url = reverse('profile')
        data = {
            'first_name': 'Updated',
            'last_name': 'Name',
            'email': 'updated@example.com'
        }
        response = authenticated_client.patch(url, data)
        assert response.status_code == status.HTTP_200_OK
        user.refresh_from_db()
        assert user.first_name == 'Updated'
        assert user.email == 'updated@example.com'

    def test_update_profile_avatar(self, authenticated_client, user):
        url = reverse('profile')

        image = Image.new('RGB', (100, 100), color='red')
        image_io = BytesIO()
        image.save(image_io, format='JPEG')
        image_io.seek(0)

        uploaded_file = SimpleUploadedFile(
            'avatar.jpg',
            image_io.read(),
            content_type='image/jpeg'
        )

        response = authenticated_client.patch(url, {'avatar': uploaded_file}, format='multipart')
        assert response.status_code == status.HTTP_200_OK

        profile = Profile.objects.get(user=user)
        assert profile.avatar is not None