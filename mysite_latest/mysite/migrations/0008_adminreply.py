# Generated by Django 2.1.5 on 2019-03-18 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0007_auto_20190318_0605'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminReply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('issue_description', models.TextField(max_length=400)),
            ],
        ),
    ]