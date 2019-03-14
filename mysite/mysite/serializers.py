from rest_framework import serializers
from mysite.models import Message
from django.contrib.auth.models import User
from datetime import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    created = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Message
        fields = ('created', 'priority', 'categories', 'issue_description', 'user', 'url')
    
    def create(self, validated_data):
        message = Message(
            priority = validated_data['priority'],
            categories = validated_data['categories'],
            issue_description = validated_data['issue_description'],
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
    password = serializers.CharField(
        style={'input_type': 'password'}
    )
    date_joined = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)
    class Meta:
        model = User
        extra_kwargs = {
            'password': {'write_only': True},
            'url': {'view_name': 'user-detail'},
        }
        fields = ('first_name', 'last_name', 'email', 'password', 'last_login', 'date_joined', 'username', 'url')

    # def validate_password(self, value):
    #     user = self.context['request'].user
    #     validate_password(password=value, user=user)

    def create(self, validated_data):
        user = User(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class StaffSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'}
    )
    date_joined = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)
    class Meta:
        model = User
        extra_kwargs = {
            'password': {'write_only': True},
            'url': {'view_name': 'staff-detail'},
        }
        fields = ('first_name', 'last_name', 'email', 'password', 'last_login', 'date_joined', 'username', 'is_staff', 'url')
    def create(self, validated_data):
        user = User(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'],
            is_staff = validated_data['is_staff'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class SuperStaffSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'}
    )
    date_joined = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)
    class Meta:
        model = User
        extra_kwargs = {
            'password': {'write_only': True},
            'url': {'view_name': 'superstaff-detail'},
        }
        fields = ('first_name', 'last_name', 'email', 'password', 'last_login', 'date_joined', 'username', 'is_staff', 'is_superuser', 'url')
    def create(self, validated_data):
        user = User(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'],
            is_staff = validated_data['is_staff'],
            is_superuser = validated_data['is_superuser'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user