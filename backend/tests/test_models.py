import pytest
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.contrib.auth import get_user_model

from articles.models import Article
from marketplace.models import Category, Product, Cart, CartItem
from medicine.models import Specialist, Consultation
from pets.models import Pet
from users.models import Profile

User = get_user_model()

@pytest.fixture
def user(db):
    return User.objects.create_user(username='testuser', password='testpassword')

@pytest.fixture
def category(db):
    return Category.objects.create(name='Корм')

@pytest.mark.django_db
class TestArticle:
    def test_create_article_with_author(self, user):
        article = Article.objects.create(
            title='Test Title',
            content='Test Content',
            author=user
        )
        assert article.title == 'Test Title'
        assert article.author == user
        assert str(article) == 'Test Title'

@pytest.mark.django_db
class TestCategory:
    def test_category_creation(self):
        category = Category.objects.create(name='Игрушки')
        assert str(category) == 'Игрушки'

@pytest.mark.django_db
class TestProduct:
    def test_product_creation_with_categories(self, category):
        product = Product.objects.create(
            name='Кошачий корм',
            description='Очень вкусный',
            price=29.99,
            in_stock=True
        )
        product.categories.add(category)

        assert product.categories.count() == 1
        assert category in product.categories.all()
        assert str(product) == 'Кошачий корм'

    def test_product_default_out_of_stock(self):
        product = Product.objects.create(
            name='Нет в наличии',
            description='Товар кончился',
            price=100.00
        )
        assert product.in_stock is False

@pytest.mark.django_db
class TestCartAndCartItem:
    def test_cart_creation(self, user):
        cart = Cart.objects.create(user=user)
        assert str(cart) == f'Корзина {user.username}'

    def test_cart_item_unique_constraint(self, user):
        cart = Cart.objects.create(user=user)
        product = Product.objects.create(name='Продукт', description='Тестовый продукт', price=10.00)

        CartItem.objects.create(cart=cart, product=product, quantity=2)

        with pytest.raises(IntegrityError):
            CartItem.objects.create(cart=cart, product=product, quantity=3)

    def test_cart_item_str_method(self, user):
        cart = Cart.objects.create(user=user)
        product = Product.objects.create(name='Продукт', description='Тестовый продукт', price=15.00)
        cart_item = CartItem.objects.create(cart=cart, product=product, quantity=5)

        assert str(cart_item) == 'Продукт: 5'

@pytest.mark.django_db
class TestSpecialistAndConsultation:
    def test_specialist_creation(self):
        specialist = Specialist.objects.create(name='Наталья Олеговна', speciality='Грумер')
        assert str(specialist) == 'Наталья Олеговна - Грумер'

    def test_consultation_creation(self, user):
        from datetime import datetime, timezone

        specialist = Specialist.objects.create(name='Наталья Олеговна', speciality='Грумер')
        time = datetime.now(timezone.utc)

        consultation = Consultation.objects.create(
            user=user,
            specialist=specialist,
            time=time
        )

        assert consultation.user.username == user.username
        assert f'{user.username} - {specialist.speciality}' in str(consultation)


@pytest.mark.django_db
class TestPet:
    def test_pet_creation_with_owner(self, user):
        pet = Pet.objects.create(
            name='Песик',
            city='Москва',
            age=3,
            breed='Чихуахуа',
            color='Черный',
            owner=user
        )

        assert pet.name == 'Песик'
        assert pet.owner == user
        assert str(pet) == 'Песик'

@pytest.mark.django_db
class TestProfile:
    def test_profile_auto_creation(self, user):
        profile, created = Profile.objects.get_or_create(user=user)

        assert profile.user == user
        assert str(profile) == f'Профиль {user.username}'