# Generated by Django 2.1.7 on 2019-03-24 11:01

from django.db import migrations, models
import mysite.validators


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0011_auto_20190323_1627'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='document',
            field=models.FileField(null=True, upload_to='testfolder', validators=[mysite.validators.validate_extension]),
        ),
    ]
