from mysite.models import Message, AdminReply, UserReply, ReactMessage
from mysite import views
from mysite.serializers import UserSerializer, StaffSerializer, SuperStaffSerializer, MessageSerializer, AdminReplySerializer, UserReplySerializer, ReactMessageSerializer
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
from rest_framework.decorators import api_view
import re
import datetime

# Create your views here.

@api_view(['GET', 'POST'])
def message_list(request):
    '''
    List tickets or create a new ticket
    '''
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        messages = ReactMessage.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(messages, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        serializer = ReactMessageSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages, 'nextlink': '/api/tickets/?page=' + str(nextPage), 'prevlink': '/api/tickets/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = ReactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def message_detail(request, pk):
    """
    Retrieve, update or delete a customer by id/pk.
    """
    try:
        message = Message.objects.get(pk=pk)
    except Message.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ReactMessageSerializer(message, context={'request': request})
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ReactMessageSerializer(message, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ReactMessageViewSet(viewsets.ModelViewSet):
    queryset = ReactMessage.objects.all()
    serializer_class = ReactMessageSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = '__all__'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.requester = request.data.get('requester')
        instance.subject = request.data.get('subject')
        instance.status = request.data.get('status')
        instance.group = request.data.get('group')
        instance.phone = request.data.get('phone')
        instance.email = request.data.get('email')
        instance.content = request.data.get('content')
        # instance.document = request.data.get('document')
        instance.last_updated = datetime.datetime.now()
        serializer = self.get_serializer(data=instance)
        instance.save()
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)        

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
