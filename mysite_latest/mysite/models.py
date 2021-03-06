from django.db import models
from .validators import validate_extension

# Create your models here.

CATEGORIES = (
    ('api_devops', 'API DevOps'),
    ('chart_as_a_service', 'Chart as a Service'),
    ('recruitment_platform', 'Recruitment Platform'),
    ('aesop', 'Aesop'),
    ('travel_marketplace', 'Travel Marketplace'),
    ('banking_lifestyle_app', 'Banking Lifestyle App'),
    ('ar_car_visualizer', 'AR Car Visualizer'),
    ('ar_car_manual', 'AR Car Manual'),
    ('ar_gamification', 'AR Gamification'),
    ('ar_theatre', 'AR Theatre'),
    ('ar_menu', 'AR Menu'),
    ('ai_wealth_manager', 'AI Wealth Manager'),
    ('multilingual_chatbot', 'Multilingual Chatbot'),
    ('ai_translator', 'AI Translator'),
    ('digital_butler', 'Digital Butler'),
    ('video_analytics', 'Video Analytics'),
    ('sentiments_analysis', 'Sentiments Analysis'),
    ('acnapi_mfa_login', 'ACNAPI MFA Login'),
    ('ticketing_platform', 'Ticketing Platform'),
    ('smart_lock', 'Smart Lock'),
    ('smart_home', 'Smart Home'),
    ('smart_parking', 'Smart Parking'),
    ('smart_restaurant', 'Smart Restaurant'),
    ('queuing_system', 'Queuing System'),
    ('iot_led_wall', 'IoT Led Wall'),
)

PRIORITY = (
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),
)

BINARY = (
    ('no', 'No'),
    ('yes', 'Yes'),
)

class ReactMessage(models.Model):
    requester = models.CharField(max_length=20)
    subject = models.CharField(max_length=50)
    status = models.CharField(max_length=20)
    group = models.CharField(max_length=50)
    lastUpdatedTime = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(max_length=50, null=True)
    phone = models.CharField(max_length=20, null=True)
    submitTime = models.DateTimeField(auto_now_add=True, null=True)
    content = models.TextField(max_length=5000, null=True)
    # document = models.FileField(upload_to='testfolder',null=True, blank=True, validators=[validate_extension])

# class Message(models.Model):
#     created = models.DateTimeField(auto_now_add=True)
#     categories = models.CharField(max_length=20, choices=CATEGORIES)
#     user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
#     issue_description=models.TextField(max_length=400)
#     priority = models.CharField(max_length=1, choices=PRIORITY)
#     resolved = models.CharField(max_length=3, choices=BINARY, default='no')
#     def __str__(self):
#         return "Date: " + str(self.created) + ", Created by: " + str(self.user.username) + ", Description: " + str(self.issue_description)

# class AdminReply(models.Model):
#     created = models.DateTimeField(auto_now_add=True)
#     issue_description=models.TextField(max_length=400)
#     message_link = models.ForeignKey(Message, on_delete=models.CASCADE, null=True)
#     user_reply_link = models.ForeignKey('UserReply', on_delete=models.CASCADE, null=True, blank=True)
#     user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
#     def __str__(self):
#         return "Date: " + str(self.created) + ", Created by: " + str(self.user.username) + ", Description: " + str(self.issue_description)

# class UserReply(models.Model):
#     created = models.DateTimeField(auto_now_add=True)
#     issue_description=models.TextField(max_length=400)
#     admin_reply_link = models.ForeignKey(AdminReply, on_delete=models.CASCADE, null=True)
#     user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
#     resolved = models.ForeignKey(Message, on_delete=models.CASCADE, null=True)
#     def __str__(self):
#         return "Date: " + str(self.created) + ", Created by: " + str(self.user.username) + ", Description: " + str(self.issue_description)