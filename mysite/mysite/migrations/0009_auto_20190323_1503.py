# Generated by Django 2.1.7 on 2019-03-23 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0008_adminreply_userreply'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='priority',
            field=models.IntegerField(choices=[('1', 1), ('2', 2), ('3', 3), ('4', 4), ('5', 5)], max_length=1),
        ),
    ]
