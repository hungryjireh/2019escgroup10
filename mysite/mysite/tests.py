from django.urls import reverse
from rest_framework import status
from mysite.views import UserViewSet, MessageViewSet, SuperStaffViewSet, StaffViewSet
from mysite.serializers import UserSerializer, StaffSerializer, SuperStaffSerializer
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase, APIClient
import unittest
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import http.client
import requests
import unittest
from .models import Message, AdminReply, UserReply
from django.test import TestCase
# factory = APIRequestFactory(enforce_csrf_checks=True)
class CheckUserViewTest(APITestCase):
    #1
    #testing user login
    def user_test(self):
        user = User.objects.create_user(username='username', password='Pas$w0rd', is_staff=True)
        self.assertTrue(self.client.login(username='username', password='Pas$w0rd'))
    #2
    #testing creating user
    def test_create_user(self):
        data = {
            'username':'username',
            'password':'password',
            'confirm_password': 'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
        }
        serializer = UserSerializer(data=data)
        assert(serializer.is_valid())
    #3
    #testing creating staff
    def test_staff(self):
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
    #4
    #testing creating superstaff
    def test_create_super_staff(self):
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
    #5
    #testing creating user with missing field (last_name)
    def test_create_incomplete_user(self):
        data = {
            'username':'username',
            'password':'password',
            'first_name': 'user',
            'email': 'hello@hello.com',
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())
    #6
    #testing creating staff with missing field (is_staff)
    def test_create_incomplete_staff(self):
        data = {
            'username':'username',
            'password':'password',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'hello@hello.com',
        }
        serializer = StaffSerializer(data=data)
        self.assertFalse(serializer.is_valid())
    #7
    #testing creating superstaff with missing field (is_superstaff)
    def test_create_incomplete_super_user(self):
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
    #8
    #cannot view user database as no superuser privileges
    def test_redirect_user_to_view_user(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 403)
    #9
    #cannot view staff database as no superuser privileges
    def test_redirect_user_to_staff_page(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/staff/')
        self.assertEqual(response.status_code, 403)
    #10
    #cannot view superstaff database as no staff privileges
    def test_redirect_user_to_admin_page(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/superstaff/')
        self.assertEqual(response.status_code, 403)
    #11
    #can view user database as user has staff privileges
    def test_redirect_admin_to_view_users(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)
    #12
    #can view staff database as user has superuser privileges
    def test_redirect_admin_to_view_staff(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_superuser=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/staff/')
        self.assertEqual(response.status_code, 200)
    #13
    #can view superstaff database as user has superuser privileges
    def test_redirect_admin_to_view_superstaff(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_superuser=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/superstaff/')
        self.assertEqual(response.status_code, 200)
        
class CheckTicketViewTest(APITestCase):
    #1
    #successfully create a ticket with staff privileges 
    def test_ticket(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/tickets/', {'issue_description': 'Foo Bar', 'priority': '1', 'categories': 'api_devops'}, format='json')
        self.assertEqual(response.status_code, 201)
    #2
    #invalid request: category does not exist
    def test_incorrect_category(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/tickets/', {'issue_description': 'Foo Bar', 'priority': '1', 'categories': 'acnapi'}, format='json')
        self.assertEqual(response.status_code, 400)
    #3
    #unauthorized request: not logged in, thus not valid user and thus cannot post ticket
    def test_unauthorized_access(self):
        response = self.client.post('/tickets/', {'issue_description': 'Foo Bar', 'priority': '1', 'categories': 'api_devops'}, format='json')
        self.assertEqual(response.status_code, 401)
    #4
    #unauthorized request: not logged in, thus not valid user and cannot view all tickets
    def test_unauthorized_view(self):
        response = self.client.get('/tickets/')
        self.assertEqual(response.status_code, 401,
            'Expected Response Code 401, received {0} instead.'.format(response.status_code))
    #5
    #authorized request: logged in as admin, thus can view all tickets
    def test_admin_view_tickets(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/tickets/')
        self.assertEqual(response.status_code, 200)
    #6
    #authorized request: logged in as user, and can view tickets
    def test_user_view_tickets(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/tickets/')
        self.assertEqual(response.status_code, 200)
    #7
    #checks for invalid char fields
    def test_char_invalid(self):
        self.username = 'john_doe'
        self.password = 'foobar'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/tickets/', {'issue_description': 'Foo Bar', 'priority': 'abcd', 'categories': '1234'}, format='json')
        self.assertEqual(response.status_code, 400)
    #8
    def test_email_notif(self):
        data = {
            'username':'username',
            'password':'password123',
            'confirm_password': 'password123',
            'first_name': 'user',
            'last_name': 'tan',
            'email': 'pker96@gmail.com',
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.email_sent)  
    #9
    def test_staff_view_user_reply(self):
        self.username = 'hello'
        self.password = 'helloworld'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/userreply/')
        self.assertEqual(response.status_code, 200)

    #10
    def test_staff_view_admin_reply(self):
        self.username = 'hello'
        self.password = 'helloworld'
        self.user = User.objects.create(username=self.username, password=self.password, is_staff=True)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/adminreply/')
        self.assertEqual(response.status_code, 200)


#creating message in database
class database_testing(TestCase):
    #1
    def test_message_creation(self):
        Message.objects.create(categories='AR Theatre', issue_description='Test case', priority='1', resolved='no')
        testmessage=Message.objects.get(categories='AR Theatre')
        self.assertEqual(testmessage.issue_description, 'Test case')
    #2
    def test_string_for_priority_message_creation(self):    
        try:
            message=Message.objects.create(categories='Travel Marketplace', issue_description='Test case', priority='g', resolved='no')
        except:
            self.assertRaises(ValueError)
    #3
    def test_empty_fields_message_creation(self):
        message=Message.objects.create(categories='API DevOps', issue_description='asdfg', priority='1', resolved='no')
        self.assertRaises(ValidationError, message.full_clean)
    #4
    def test_tostring(self):
        message=Message.objects.create(categories='Aesop', issue_description='bad vibes', priority='1', resolved='no')
        self.assertEqual(str(message.categories), message.categories)
        self.assertEqual(str(message.issue_description), message.issue_description)
        self.assertEqual(str(message.priority), message.priority)
        self.assertEqual(str(message.resolved), message.resolved)

    #5
    def test_admin_reply(self):
        message=Message.objects.create(categories='Smart Restaurant', issue_description='asdfg', priority='1', resolved='no')
        admin=AdminReply.objects.create(admin_reply='resolved', message_link=message)
        updated_message=Message.objects.get(categories='Smart Restaurant')
        updated_message.resolved='yes'
        updated_message.save()
        Message.objects.get(categories='Smart Restaurant').resolved='yes'
        self.assertEqual(admin.admin_reply, 'resolved')
        self.assertEqual(updated_message.resolved, 'yes')

    #6
    def test_tostring_admin_reply(self):
        message=Message.objects.create(categories='Aesop', issue_description='bad vibes', priority='1', resolved='no')
        admin=AdminReply.objects.create(admin_reply='helloworld', message_link=message)
        self.assertEqual(str(admin.admin_reply), admin.admin_reply)

    #7
    def test_user_reply(self):
        message=Message.objects.create(categories='AI Translator', issue_description='bad translator', priority='1', resolved='no')
        admin=AdminReply.objects.create(admin_reply='Issue resolved', message_link=message)
        updated_message=Message.objects.get(categories='AI Translator')
        updated_message.resolved='yes'
        updated_message.save()
        userreply=UserReply.objects.create(user_reply='Thanks for the resolution', message_link=admin)
        self.assertEqual('Thanks for the resolution', userreply.user_reply)
        self.assertEqual('yes',updated_message.resolved)
    #8
    def test_tostring_userreply(self):
        message=Message.objects.create(categories='Aesop', issue_description='bad vibes', priority='1', resolved='no')
        admin=AdminReply.objects.create(admin_reply='helloworld', message_link=message)
        userreply=UserReply.objects.create(user_reply='Thanks for the resolution', message_link=admin)
        self.assertEqual(str(userreply.user_reply), userreply.user_reply)

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


    