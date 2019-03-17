from django.db import models

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

class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    categories = models.CharField(max_length=20, choices=CATEGORIES, default='acnapi')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
    issue_description=models.TextField(max_length=400)
    priority = models.CharField(max_length=1, choices=PRIORITY, default='3')