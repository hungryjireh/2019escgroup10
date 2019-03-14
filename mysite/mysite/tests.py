from django.urls import reverse
from rest_framework import status
from mysite.views import UserViewSet, MessageViewSet, SuperStaffViewSet, StaffViewSet
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase, APIClient
import unittest
from django.contrib.auth.models import User
import http.client
import requests

class CheckUserViewTest(APITestCase):

    def test_fetch(self):
        # try:
        #     user = User.objects.get(username='admin')
        # except User.DoesNotExist:
        #     user = None
        user = User.objects.create_user('admin', 'happy')
        self.client.force_authenticate(user)
        view = UserViewSet.as_view({'get': 'list'})
        factory = APIRequestFactory()
        request = factory.get('/users/4')
        force_authenticate(request, user=user)
        response = view(request, pk='4')
        response.render()  # Cannot access `response.content` without this.
        self.assertEqual(response.content, '{"username": "normaltan", "id": 4}')