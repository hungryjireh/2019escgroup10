from django.urls import reverse
from rest_framework import status
from mysite.views import SuperStaffViewSet, StaffViewSet
# from mysite.views import UserViewSet, MessageViewSet, SuperStaffViewSet, StaffViewSet
# from mysite.serializers import UserSerializer, StaffSerializer, SuperStaffSerializer
from mysite.serializers import StaffSerializer, SuperStaffSerializer, ReactMessageSerializer
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase, APIClient
import unittest
from django.contrib.auth.models import User
import http.client
import requests
import unittest
from urllib.parse import urlencode

class CheckUserViewTest(APITestCase):

    #testing user login
    def test_1(self):
        user = User.objects.create_user(username='username', password='Pas$w0rd', is_staff=True)
        self.assertTrue(self.client.login(username='username', password='Pas$w0rd'))

    #testing creating staff
    def test_2(self):
        data = {
            'username':'username',
            'password':'password',
            'confirm_password': 'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
            'is_staff': 'True',
        }
        serializer = StaffSerializer(data=data)
        assert(serializer.is_valid())

    #testing creating superstaff
    def test_3(self):
        data = {
            'username':'username',
            'password':'password',
            'confirm_password': 'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
            'is_staff': 'True',
            'is_superuser': 'True',
        }
        serializer = SuperStaffSerializer(data=data)
        assert(serializer.is_valid())

    #testing creating staff with missing field (is_staff)
    def test_4(self):
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
    def test_5(self):
        data = {
            'username':'username',
            'password':'password',
            'confirm_password': 'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
            'is_staff': 'True',
        }
        serializer = SuperStaffSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    #cannot view staff database as no adminuser privileges
    def test_6(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/staff/')
        self.assertEqual(response.status_code, 403)

    #cannot view superstaff database as no adminuser privileges
    def test_7(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/superstaff/')
        self.assertEqual(response.status_code, 403)

    #can view superstaff database as user has superuser privileges
    def test_8(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_superuser=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/superstaff/')
        self.assertEqual(response.status_code, 200)
        
class CheckTicketViewTest(APITestCase):
    #successfully create a ticket without logging in (AllowAny)
    def test_1(self):
        response = self.client.post('/api/tickets/post/', {'requester': 'john', 'subject': 'Foo Bar', 'status': 'unviewed', 'group': 'api_devops', 'phone': '83283727', 'email': 'hungry@hungry.com', 'content': 'Hello!'}, format='json')
        self.assertEqual(response.status_code, 201)
    
    #create ticket as logged in user
    def test_2(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/tickets/post/', {'requester': self.username, 'subject': 'Foo Bar', 'status': 'unviewed', 'group': 'api_devops', 'phone': '83283727', 'email': 'hungry@hungry.com', 'content': 'Hello!'}, format='json')
        self.assertEqual(response.status_code, 201)

    #invalid request: fields do not exist
    def test_3(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/reacttickets/', {'issue_description': 'Foo Bar', 'priority': '1', 'categories': 'acnapi'}, format='json')
        self.assertEqual(response.status_code, 400)

    #unauthorized request: not logged in, thus not valid user and cannot view all tickets
    def test_4(self):
        response = self.client.get('/reacttickets/')
        self.assertEqual(response.status_code, 401,
            'Expected Response Code 401, received {0} instead.'.format(response.status_code))

    #authorized request: logged in as admin, thus can view all tickets
    def test_5(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/reacttickets/')
        self.assertEqual(response.status_code, 200)

    #authorized request: logged in as user, and can view tickets
    def test_6(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/reacttickets/')
        self.assertEqual(response.status_code, 200)

class CheckReactMessageTest(APITestCase):
    #serializing a valid ticket
    def test_1(self):
        data = {
            'requester': 'john', 
            'subject': 'Foo Bar', 
            'status': 'unviewed', 
            'group': 'api_devops', 
            'phone': '83283727', 
            'email': 'hungry@hungry.com', 
            'content': 'Hello!'
        }
        serializer = ReactMessageSerializer(data=data)
        assert(serializer.is_valid())

    #serializing an incomplete ticket - missing content section
    def test_2(self):
        data = {
            'requester': 'john', 
            'subject': 'Foo Bar', 
            'status': 'unviewed', 
            'group': 'api_devops', 
            'phone': '83283727', 
            'email': 'hungry@hungry.com', 
        }
        serializer = ReactMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())

class CheckJWTToken(APITestCase):
    #1
    def test_1(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/token', {'username': self.username, 'password': self.password}, format='json')
        self.assertEqual(response.status_code, 301)

    #testing creating user with missing field (last_name)
    # def test_5(self):
    #     data = {
    #         'username':'username',
    #         'password':'password',
    #         'first_name': 'user',
    #         'email': 'hello@hello.com',
    #     }
    #     serializer = UserSerializer(data=data)
    #     self.assertFalse(serializer.is_valid())

    #can view own user entry as ordinary user
    # def test_8(self):
    #     self.username = 'john_doe'
    #     self.password = 'foobar'
    #     self.user = User.objects.create(username=self.username, password=self.password)
    #     self.client = APIClient()
    #     self.client.force_authenticate(user=self.user)
    #     response = self.client.get('/users/' + str(self.user.id) + '/')
    #     self.assertEqual(response.status_code, 200)

    #can view user database as user has adminuser privileges
    # def test_11(self):
    #     self.username = 'john_doe'
    #     self.password = 'foobar'
    #     self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
    #     self.client = APIClient()
    #     self.client.force_authenticate(user=self.user)
    #     response = self.client.get('/users/')
    #     self.assertEqual(response.status_code, 200)

    #can view staff database as user has superuser privileges
    # def test_12(self):
    #     self.username = 'john_doe'
    #     self.password = 'foobar'
    #     self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
    #     self.client = APIClient()
    #     self.client.force_authenticate(user=self.user)
    #     response = self.client.get('/staff' + str(self.user.id) + '/')
    #     self.assertEqual(response.status_code, 200)

     #testing creating user
    # def test_2(self):
    #     data = {
    #         'username':'username',
    #         'password':'password',
    #         'confirm_password': 'password',
    #         'first_name': 'user',
    #         'last_name': 'tan',
    #         'email': 'hello@hello.com',
    #     }
    #     serializer = UserSerializer(data=data)
    #     assert(serializer.is_valid())

    # def test_email_notif(self):
    #     data = {
    #         'username':'username',
    #         'password':'password',
    #         'confirm_password': 'password',
    #         'first_name': 'user',
    #         'last_name': 'tan',
    #         'email': 'hello@hello.com',
    #         'is_staff': 'true'
    #     }
    #     seralizer=StaffSerializer(data)
    #     self.assertEqual(len(msg.outbox), 1)

# class CheckJWTToken(APITestCase):
#     def test_1(self):
#         self.username = 'john_doe'
#         self.password = 'foobar'
#         self.user = User.objects.create(username=self.username, password=self.password)
#         self.client = APIClient()
#         self.client.force_authenticate(user=self.user)
#         response = self.client.post('/api/token', {'username': 'john_doe', 'password': 'foobar'}, format='json')
#         self.assertEqual(response.status_code, 200)