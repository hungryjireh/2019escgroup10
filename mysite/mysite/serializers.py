from rest_framework import serializers
from mysite.models import Message, AdminReply, UserReply
from django.contrib.auth.models import User
from datetime import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth import password_validation as validators
from django.core.exceptions import ValidationError

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    created = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Message
        fields = ('created', 'priority', 'categories', 'document','issue_description', 'user', 'url', 'resolved')
    
    def create(self, validated_data):
        message = Message(
            priority = validated_data['priority'],
            categories = validated_data['categories'],
            issue_description = validated_data['issue_description'],
            document=validated_data['document'],
            user = validated_data['user'],
        )
        message.save()
        subject, from_email, to = 'New ticket submitted! Here are the details.', 'ACNAPI-SUTD <hello@acnapi.icu>', 'hungryjireh@gmail.com'
        html_content = render_to_string("email_template.html", {
            "priority": validated_data['priority'],
            "categories": validated_data['categories'],
            "issue_description": validated_data['issue_description'],
            "user": validated_data['user'],
        })
        text_content = "Your CPU cannot process HTML?!"
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return message

class UserSerializer(serializers.HyperlinkedModelSerializer):
    email_sent=True
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only = True,
    )
    confirm_password = serializers.CharField(
        style={'input_type': 'password'},
        write_only = True,
    )
    date_joined = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)
    class Meta:
        model = User
        extra_kwargs = {
            'password': {'write_only': True},
            'url': {'view_name': 'user-detail'},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'username': {'required': True},
        }
        fields = ('first_name', 'last_name', 'email', 'password', 'confirm_password', 'last_login', 'date_joined', 'username', 'url')

    def create(self, validated_data):

        user = User(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'],
        )
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        confirm_password = validated_data['confirm_password']
        if (password != confirm_password):
            raise ValidationError({'no_match_password': 'Passwords do not match.'})
        elif len(password) < 8:
            raise ValidationError({'short_password': 'Password too short. Password should be at least 8 characters long.'})
        elif bool(re.match('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])', password)) == False:
            raise ValidationError({'weak_password': 'Password should contain numbers and at least one uppercase and at least one lowercase letter.'})
        elif email and User.objects.filter(email=email).count() > 0:
            raise ValidationError('Email addresses must be unique.')
        elif username and User.objects.filter(username=username).count() > 0:
            raise ValidationError('Usernames must be unique.')
        else:
            user.set_password(validated_data['password'])
            user.save()
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
                pass
            else:
                email_sent=False
            return user
        

class StaffSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only = True,
    )
    confirm_password = serializers.CharField(
        style={'input_type': 'password'},
        write_only = True,
    )
    date_joined = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)
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
        fields = ('first_name', 'last_name', 'email', 'password', 'confirm_password', 'last_login', 'date_joined', 'username', 'is_staff', 'url')
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
    date_joined = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)
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
        fields = ('first_name', 'last_name', 'email', 'password', 'confirm_password', 'last_login', 'date_joined', 'username', 'is_staff', 'is_superuser', 'url')
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
            return user

class AdminReplySerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    resolved = serializers.ReadOnlyField(source='message_link.resolved')
    class Meta:
        model = AdminReply
        fields = ('created', 'message_link', 'admin_reply', 'url', 'user', 'resolved')

class UserReplySerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    resolved = serializers.ReadOnlyField(source='resolved.resolved')
    class Meta:
        model = UserReply
        fields = ('created', 'message_link', 'user_reply', 'url', 'user', 'resolved')
