# Generated by Django 2.1.5 on 2019-03-11 06:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='author',
            new_name='user',
        ),
    ]
