from mysite.models import Message, AdminReply, UserReply
from mysite import views
from mysite.serializers import UserSerializer, StaffSerializer, SuperStaffSerializer, MessageSerializer, AdminReplySerializer, UserReplySerializer
from django.contrib.auth.models import User
from rest_framework import generics, permissions, renderers, viewsets, status, filters
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from mysite.permissions import IsSuperUser
from django.core.exceptions import ValidationError
from rest_framework.parsers import FileUploadParser
from django.views.decorators.cache import cache_control
from rest_framework.views import APIView
from rest_framework.throttling import UserRateThrottle

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
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        #get the file uploaded and pass it to the model field
        serializer.save(user=self.request.user, document=self.request.data.get('document'))


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
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('username', 'email')

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return User.objects.filter(is_staff=False, is_superuser=False)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.password = request.data.get('password')
        instance.confirm_password = request.data.get('confirm_password')
        print(instance.password)
        print(instance.confirm_password)
        if instance.password != instance.confirm_password:
            raise ValidationError({'no_match_password': 'Passwords do not match.'})
        elif len(instance.password) < 8:
            raise ValidationError({'short_password': 'Password too short. Password should be at least 8 characters long.'})
        elif bool(re.match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', instance.password)) == False:
            raise ValidationError({'weak_password': 'Password should contain numbers and at least one uppercase and at least one lowercase letter.'})
        else:
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
    permission_classes = (IsSuperUser,)
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('username', 'email')

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
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('username', 'email')

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        return User.objects.filter(is_staff=True, is_superuser=True)

class AdminReplyViewSet(viewsets.ModelViewSet):
    serializer_class = AdminReplySerializer
    permission_classes = (IsAdminUser,)
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('message_link', 'user_reply_link', 'created', 'resolved')

    queryset = AdminReply.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        if (self.request.user.is_staff or self.request.user.is_superuser):
            return AdminReply.objects.all()
        else:
            return AdminReply.objects.filter(user=user)       

class UserReplyViewSet(viewsets.ModelViewSet):
    serializer_class = UserReplySerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('admin_reply_link', 'created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        if (self.request.user.is_staff or self.request.user.is_superuser):
            return UserReply.objects.all()
        else:
            return UserReply.objects.filter(user=user)       
