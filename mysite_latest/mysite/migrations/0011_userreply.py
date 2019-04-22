# Generated by Django 2.1.5 on 2019-03-18 12:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mysite', '0010_adminreply_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserReply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('issue_description', models.TextField(max_length=400)),
                ('message_link', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='mysite.AdminReply')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
