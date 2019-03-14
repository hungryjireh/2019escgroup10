from django.db import models

# Create your models here.

CATEGORIES = (
    ('acnapi', 'ACNAPI'),
)

PRIORITY = (
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
)

class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    categories = models.CharField(max_length=20, choices=CATEGORIES, default='acnapi')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
    issue_description=models.TextField(max_length=400)
    priority = models.CharField(max_length=1, choices=PRIORITY, default='3')