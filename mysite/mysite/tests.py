from django.urls import reverse
from rest_framework import status
from mysite.views import UserViewSet, MessageViewSet, SuperStaffViewSet, StaffViewSet
from mysite.serializers import UserSerializer, StaffSerializer, SuperStaffSerializer
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase, APIClient
import unittest
from django.contrib.auth.models import User
import http.client
import requests
import unittest
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from django.http import JsonResponse

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def check_user(request):
#     user = request.user
#     # use user object here
#     return JsonResponse({})

class CheckUserViewTest(APITestCase):

    #testing user login
    def test_1(self):
        user = User.objects.create_user(username='username', password='Pas$w0rd', is_staff=True)
        self.assertTrue(self.client.login(username='username', password='Pas$w0rd'))

    #testing creating user
    def test_2(self):
        data = {
            'username':'username',
            'password':'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
        }
        serializer = UserSerializer(data=data)
        assert(serializer.is_valid())

    #testing creating staff
    def test_3(self):
        data = {
            'username':'username',
            'password':'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
            'is_staff': 'True',
        }
        serializer = StaffSerializer(data=data)
        assert(serializer.is_valid())

    #testing creating superstaff
    def test_4(self):
        data = {
            'username':'username',
            'password':'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
            'is_staff': 'True',
            'is_superuser': 'True',
        }
        serializer = SuperStaffSerializer(data=data)
        assert(serializer.is_valid())

    #testing creating user with missing field (last_name)
    def test_5(self):
        data = {
            'username':'username',
            'password':'password',
            'first_name': 'user',
            'email': 'hello@hello.com',
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    #testing creating staff with missing field (is_staff)
    def test_6(self):
        data = {
            'username':'username',
            'password':'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
        }
        serializer = StaffSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    #testing creating superstaff with missing field (is_superstaff)
    def test_7(self):
        data = {
            'username':'username',
            'password':'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
            'is_staff': 'True',
        }
        serializer = SuperStaffSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    #cannot view user database as no adminuser privileges
    def test_8(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 403)

    #cannot view staff database as no adminuser privileges
    def test_9(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/staff/')
        self.assertEqual(response.status_code, 403)

    #cannot view superstaff database as no adminuser privileges
    def test_10(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/superstaff/')
        self.assertEqual(response.status_code, 403)

    #can view user database as user has adminuser privileges
    def test_11(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    #can view staff database as user has adminuser privileges
    def test_12(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/staff/')
        self.assertEqual(response.status_code, 200)

    #can view superstaff database as user has superuser privileges
    def test_13(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_superuser=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/superstaff/')
        self.assertEqual(response.status_code, 200)
        
class CheckTicketViewTest(APITestCase):
    #successfully create a ticket
    def test_1(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/tickets/', {'issue_description': 'Foo Bar', 'priority': '1', 'categories': 'acnapi'}, format='json')
        self.assertEqual(response.status_code, 201)

    #invalid request: category does not exist
    def test_2(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/tickets/', {'issue_description': 'Foo Bar', 'priority': '1', 'categories': 'ACNAPI'}, format='json')
        self.assertEqual(response.status_code, 400)
    
    #unauthorized request: not logged in, thus not valid user and thus cannot post ticket
    def test_3(self):
        response = self.client.post('/tickets/', {'issue_description': 'Foo Bar', 'priority': '1', 'categories': 'acnapi'}, format='json')
        self.assertEqual(response.status_code, 401)

    #unauthorized request: not logged in, thus not valid user and cannot view all tickets
    def test_4(self):
        response = self.client.get('/tickets/')
        self.assertEqual(response.status_code, 401,
            'Expected Response Code 401, received {0} instead.'.format(response.status_code))

    #authorized request: logged in as admin, thus can view all tickets
    def test_5(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/tickets/')
        self.assertEqual(response.status_code, 200)

    #authorized request: logged in as user, and can view tickets
    def test_6(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/tickets/')
        self.assertEqual(response.status_code, 200)


    