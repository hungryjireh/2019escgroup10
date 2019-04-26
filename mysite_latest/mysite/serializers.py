# from mysite.models import Message, AdminReply, UserReply, ReactMessage, Config, Priorities, Updates
from mysite.models import ReactMessage
from django.contrib.auth.models import User, Group
from datetime import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth import password_validation as validators
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import re

from django.utils.six import text_type
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('acnapi-335c7-firebase-adminsdk-qp66v-dc60643228.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

class ReactMessageSerializer(serializers.HyperlinkedModelSerializer):
    lastUpdatedTime = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
    submitTime = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = ReactMessage
        ordering = ['-last_updated']
        fields = ('requester', 'subject', 'status', 'group', 'lastUpdatedTime', 'id', 'phone', 'email', 'submitTime', 'content')
        extra_kwargs = {
            'requester': {'required': True},
            'subject': {'required': True},
            'status': {'required': True},
            'group': {'required': True},
            'phone': {'required': True},
            'email': {'required': True},
            'content': {'required': True},
        }

    def create(self, validated_data):
        message = ReactMessage(
            requester = validated_data['requester'],
            subject = validated_data['subject'],
            status = validated_data['status'],
            group = validated_data['group'],
            phone = validated_data['phone'],
            email = validated_data['email'],
            content = validated_data['content'],
            # document = validated_data['document'],
        )
        requester = validated_data['requester']
        group = validated_data['group']
        status = validated_data['status']
        subject = validated_data['subject']
        message.save()
        subject, from_email, to = 'New Ticket Submitted! Here are the details', 'ACNAPI-SUTD <hello@acnapi.icu>', 'hungryjireh@gmail.com'
        html_content = render_to_string("react_email_template.html", {
            "requester": validated_data['requester'],
            "subject": validated_data['subject'],
            "status": validated_data['status'],
            "group": validated_data['group'],
            "phone": validated_data['phone'],
            "email": validated_data['email'],
            "content": validated_data['content'],
        })
        text_content = "Your CPU cannot process HTML?!"
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return message

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('name', 'url')

class StaffSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only = True,
    )
    confirm_password = serializers.CharField(
        style={'input_type': 'password'},
        write_only = True,
    )
    date_joined = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
    last_login = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
    groups = serializers.PrimaryKeyRelatedField(many=True, queryset=Group.objects.all())
    class Meta:
        model = User
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'url': {'view_name': 'staff-detail'},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'username': {'required': True},
            'is_staff': {'required': True},
        }
        fields = ('first_name', 'last_name', 'email', 'password', 'confirm_password', 'last_login', 'date_joined', 'username', 'is_staff', 'url', 'id', 'groups')
    def create(self, validated_data):
        user = User(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'],
            is_staff = validated_data['is_staff'],
        )
        email = validated_data['email']
        password = validated_data['password']
        confirm_password = validated_data['confirm_password']
        username = validated_data['username']
        if (password != confirm_password):
            raise ValidationError({'no_match_password': 'Passwords do not match.'})
        elif len(password) < 8:
            raise ValidationError({'short_password': 'Password too short. Password should be at least 8 characters long.'})
        elif bool(re.match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', password)) == False:
            raise ValidationError({'weak_password': 'Password should contain numbers and at least one uppercase and at least one lowercase letter.'})
        elif email and User.objects.filter(email=email).exclude(username=user.username).exists():
            raise ValidationError('Email addresses must be unique.')
        elif username and User.objects.filter(username=username).count() > 0:
            raise ValidationError('Usernames must be unique.')
        else:
            user.set_password(validated_data['password'])
            user.save()
            group_array = []
            for group in validated_data['groups']:
                group.user_set.add(user)
                group_array.append(group.name)
            doc_ref = db.collection(u'users').document(str(user.id))
            doc_ref.set({
                u'name': validated_data['first_name'] + " " + validated_data['last_name'],
                u'email': validated_data['email'],
                u'position': 'admin',
                u'config': {
                    u'defaultSort': 'Status',
                    'priorities': [
                        {
                            'criteria': "Unviewed",
                            'highlight': "Blue",
                        },
                        {
                            'criteria': "Await Your Reply",
                            'highlight': "Purple",
                        },
                    ],
                    u'groups': group_array,
                    'updates': [
                        True,
                        True,
                        True,
                        False,
                        False,
                    ],
                },
            })
            subject, from_email, to = 'Welcome to ACNAPI! Here are your login details', 'ACNAPI-SUTD <hello@acnapi.icu>', validated_data['email']
            html_content = render_to_string("user_account_template.html", {
                "first_name": validated_data['first_name'],
                "last_name": validated_data['last_name'],
                "username": validated_data['username'],
            })
            text_content = "Your CPU cannot process HTML?!"
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            if(msg.send()):
                email_sent=True
            else:
                email_sent=False
            return user

class SuperStaffSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only = True,
    )
    confirm_password = serializers.CharField(
        style={'input_type': 'password'},
        write_only = True,
    )
    date_joined = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
    last_login = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = User
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'url': {'view_name': 'superstaff-detail'},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'username': {'required': True},
            'is_superuser': {'required': True},
            'is_staff': {'required': True},
        }
        fields = ('first_name', 'last_name', 'email', 'password', 'confirm_password', 'last_login', 'date_joined', 'username', 'is_staff', 'is_superuser', 'url', 'id')
    def create(self, validated_data):
        user = User(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            username = validated_data['username'],
            is_staff = validated_data['is_staff'],
            is_superuser = validated_data['is_superuser'],
        )
        password = validated_data['password']
        confirm_password = validated_data['confirm_password']
        email = validated_data['email']
        username = validated_data['username']
        if (password != confirm_password):
            raise ValidationError({'no_match_password': 'Passwords do not match.'})
        elif len(password) < 8:
            raise ValidationError({'short_password': 'Password should contain numbers and at least one uppercase and at least one lowercase letter.'})
        elif bool(re.match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', password)) == False:
            raise ValidationError({'weak_password': 'Password should contain numbers and letters.'})
        elif email and User.objects.filter(email=email).exclude(username=user.username).exists():
            raise ValidationError('Email addresses must be unique.')
        elif username and User.objects.filter(username=username).count() > 0:
            raise ValidationError('Usernames must be unique.')
        else:
            user.set_password(validated_data['password'])
            user.save()
            group_array = []
            for group in Group.objects.all():
                group.user_set.add(user)
                group_array.append(group.name)
            doc_ref = db.collection(u'users').document(str(user.id))
            doc_ref.set({
                u'name': validated_data['first_name'] + " " + validated_data['last_name'],
                u'email': validated_data['email'],
                u'position': u'superadmin',
                u'config': {
                    u'defaultSort': 'Status',
                    'priorities': [
                        {
                            'criteria': "Unviewed",
                            'highlight': "Blue",
                        },
                        {
                            'criteria': "Await Your Reply",
                            'highlight': "Purple",
                        },
                    ],
                    u'groups': group_array,
                    'updates': [
                        True,
                        True,
                        True,
                        False,
                        False,
                    ],
                },
            })
            subject, from_email, to = 'Welcome to ACNAPI! Here are your login details', 'ACNAPI-SUTD <hello@acnapi.icu>', validated_data['email']
            html_content = render_to_string("user_account_template.html", {
                "first_name": validated_data['first_name'],
                "last_name": validated_data['last_name'],
                "username": validated_data['username'],
            })
            text_content = "Your CPU cannot process HTML?!"
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            if(msg.send()):
                email_sent=True
            else:
                email_sent=False
            return user

# class UpdatesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Updates
#         fields = ('0', '1', '2', '3')

# class PrioritiesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Priorities
#         fields = ('criteria', 'highlight')

# class ConfigSerializer(serializers.ModelSerializer):
#     priorities = PrioritiesSerializer(read_only=True)
#     updates = UpdatesSerializer(read_only=True)
#     class Meta:
#         model = Config
#         fields = ('defaultSort', 'groups', 'priorities', 'updates')

# class MessageSerializer(serializers.HyperlinkedModelSerializer):
#     user = serializers.ReadOnlyField(source='user.username')
#     created = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
#     class Meta:
#         model = Message
#         ordering = ['-id']
#         fields = ('created', 'priority', 'categories', 'issue_description', 'user', 'url', 'resolved', 'id')
    
#     def create(self, validated_data):
#         message = Message(
#             priority = validated_data['priority'],
#             categories = validated_data['categories'],
#             issue_description = validated_data['issue_description'],
#             user = validated_data['user'],
#         )
#         message.save()
#         subject, from_email, to = 'New ticket submitted! Here are the details.', 'ACNAPI-SUTD <hello@acnapi.icu>', 'hungryjireh@gmail.com'
#         html_content = render_to_string("email_template.html", {
#             "priority": validated_data['priority'],
#             "categories": validated_data['categories'],
#             "issue_description": validated_data['issue_description'],
#             "user": validated_data['user'],
#         })
#         text_content = "Your CPU cannot process HTML?!"
#         msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
#         msg.attach_alternative(html_content, "text/html")
#         msg.send()
#         return message

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     password = serializers.CharField(
#         style={'input_type': 'password'},
#         write_only = True,
#     )
#     confirm_password = serializers.CharField(
#         style={'input_type': 'password'},
#         write_only = True,
#     )
#     date_joined = serializers.DateTimeField(read_only=True ,format="%Y-%m-%d %H:%M:%S")
#     last_login = serializers.DateTimeField(read_only=True ,format="%Y-%m-%d %H:%M:%S")
#     email_sent=True
#     class Meta:
#         model = User
#         extra_kwargs = {
#             'password': {'write_only': True},
#             'url': {'view_name': 'user-detail'},
#             'first_name': {'required': True},
#             'last_name': {'required': True},
#             'email': {'required': True},
#             'username': {'required': True},
#         }
#         fields = ('first_name', 'last_name', 'email', 'password', 'confirm_password', 'last_login', 'date_joined', 'username', 'url')

#     def create(self, validated_data):
#         user = User(
#             email = validated_data['email'],
#             first_name = validated_data['first_name'],
#             last_name = validated_data['last_name'],
#             username = validated_data['username'],
#         )
#         username = validated_data['username']
#         email = validated_data['email']
#         password = validated_data['password']
#         confirm_password = validated_data['confirm_password']
#         if (password != confirm_password):
#             raise ValidationError({'no_match_password': 'Passwords do not match.'})
#         elif len(password) < 8:
#             raise ValidationError({'short_password': 'Password too short. Password should be at least 8 characters long.'})
#         elif bool(re.match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', password)) == False:
#             raise ValidationError({'weak_password': 'Password should contain numbers and at least one uppercase and at least one lowercase letter.'})
#         elif email and User.objects.filter(email=email).count() > 0:
#             raise ValidationError('Email addresses must be unique.')
#         elif username and User.objects.filter(username=username).count() > 0:
#             raise ValidationError('Usernames must be unique.')
#         else:
#             user.set_password(validated_data['password'])
#             user.save()
#             subject, from_email, to = 'Welcome to ACNAPI! Here are your login details', 'ACNAPI-SUTD <hello@acnapi.icu>', validated_data['email']
#             html_content = render_to_string("user_account_template.html", {
#                 "first_name": validated_data['first_name'],
#                 "last_name": validated_data['last_name'],
#                 "username": validated_data['username'],
#             })
#             text_content = "Your CPU cannot process HTML?!"
#             msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
#             msg.attach_alternative(html_content, "text/html")
#             if(msg.send()):
#                 email_sent=True
#             else:
#                 email_sent=False
#             return user

# class AdminReplySerializer(serializers.HyperlinkedModelSerializer):
#     created = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
#     user = serializers.ReadOnlyField(source='user.username')
#     resolved = serializers.ReadOnlyField(source='message_link.resolved')
#     class Meta:
#         model = AdminReply
#         fields = ('created', 'message_link', 'user_reply_link', 'issue_description', 'url', 'user', 'resolved')

# class UserReplySerializer(serializers.HyperlinkedModelSerializer):
#     created = serializers.DateTimeField(read_only=True, format="%Y-%m-%d %H:%M:%S")
#     user = serializers.ReadOnlyField(source='user.username')
#     resolved = serializers.ReadOnlyField(source='resolved.resolved')
#     class Meta:
#         model = UserReply
#         fields = ('created', 'admin_reply_link', 'issue_description', 'url', 'user', 'resolved')

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super(MyTokenObtainPairSerializer, cls).get_token(user)
#         token['email'] = user.email
#         return token
# groups = [
#     'API DevOps',
#     'Chart as a Service',
#     'Recruitment Platform',
#     'Aesop',
#     'Travel Marketplace',
#     'Banking Lifestyle App',
#     'AR Car Visualizer',
#     'AR Car Manual',
#     'AR Gamification',
#     'AR Theatre',
#     'AR Menu',
#     'AR Wealth Manager',
#     'Multilingual Chatbot',
#     'AI Translator',
#     'Digital Butler',
#     'Video Analytics',
#     'Sentiments Analysis',
#     'ACNAPI MFA Login',
#     'Ticketing Platform',
#     'Smart Lock',
#     'Smart Home',
#     'Smart Parking',
#     'Smart Restaurant',
#     'Queuing System',
#     'IoT Led Wall',
# ]