# Generated by Django 2.1.5 on 2019-04-05 06:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0019_remove_reactmessage_document'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reactmessage',
            old_name='last_updated',
            new_name='lastUpdatedTime',
        ),
        migrations.RenameField(
            model_name='reactmessage',
            old_name='submit_time',
            new_name='submitTime',
        ),
    ]