# Generated by Django 2.1.5 on 2019-03-18 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0004_remove_message_highlight'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='resolved',
            field=models.CharField(choices=[('yes', 'Yes'), ('no', 'No')], default='Yes', max_length=3),
        ),
        migrations.AlterField(
            model_name='message',
            name='categories',
            field=models.CharField(choices=[('api_devops', 'API DevOps'), ('chart_as_a_service', 'Chart as a Service'), ('recruitment_platform', 'Recruitment Platform'), ('aesop', 'Aesop'), ('travel_marketplace', 'Travel Marketplace'), ('banking_lifestyle_app', 'Banking Lifestyle App'), ('ar_car_visualizer', 'AR Car Visualizer'), ('ar_car_manual', 'AR Car Manual'), ('ar_gamification', 'AR Gamification'), ('ar_theatre', 'AR Theatre'), ('ar_menu', 'AR Menu'), ('ai_wealth_manager', 'AI Wealth Manager'), ('multilingual_chatbot', 'Multilingual Chatbot'), ('ai_translator', 'AI Translator'), ('digital_butler', 'Digital Butler'), ('video_analytics', 'Video Analytics'), ('sentiments_analysis', 'Sentiments Analysis'), ('acnapi_mfa_login', 'ACNAPI MFA Login'), ('ticketing_platform', 'Ticketing Platform'), ('smart_lock', 'Smart Lock'), ('smart_home', 'Smart Home'), ('smart_parking', 'Smart Parking'), ('smart_restaurant', 'Smart Restaurant'), ('queuing_system', 'Queuing System'), ('iot_led_wall', 'IoT Led Wall')], default='acnapi', max_length=20),
        ),
        migrations.AlterField(
            model_name='message',
            name='priority',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], default='3', max_length=1),
        ),
    ]
