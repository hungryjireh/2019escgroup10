from mysite.models import Message
from mysite import views
from mysite.serializers import UserSerializer, StaffSerializer, SuperStaffSerializer, MessageSerializer
from django.contrib.auth.models import User
from rest_framework import generics, permissions, renderers, viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib.auth.hashers import make_password, check_password
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from mysite.permissions import IsSuperUser

# Create your views here.

class MessageViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        if (self.request.user.is_staff or self.request.user.is_superuser):
            return Message.objects.all()
        else:
            return Message.objects.filter(user=user)            

class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return User.objects.filter(is_staff=False, is_superuser=False)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # instance.first_name = request.data.get("first_name")
        # instance.last_name = request.data.get("first_name")
        # instance.email = request.data.get('email')
        # instance.username = request.data.get('username')
        instance.password = make_password(request.data.get('password'))
        instance.save()

        serializer = self.get_serializer(data=instance)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class StaffViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    serializer_class = StaffSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return User.objects.filter(is_staff=True, is_superuser=False)

class SuperStaffViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    serializer_class = SuperStaffSerializer
    permission_classes = (IsSuperUser,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return User.objects.filter(is_staff=True, is_superuser=True)

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
