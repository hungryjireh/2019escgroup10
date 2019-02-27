from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

class StandardUser(models.Model): #create more user id options
    REQUIRED_FIELDS = ('user_id', 'ticket_category', 'issue_description', 'ticket_priority',)
    CATEGORIES=(
        ('UI', 'User Interface'),
        ('UX', 'User Experience'),
        ('BU', 'System Bugs'),
        ('GE', 'General Feedback'),
        )
    # user=models.OnetoOneField(User, on_delete=models.CASCADE, primary_key=True)
    PRIORITY = (
        (1, '1. Critical'),
        (2, '2. High'),
        (3, '3. Normal'),
        (4, '4. Low'),
    )
    user_id=models.IntegerField(default=0)
    ticket_category=models.CharField(
        max_length=2,
        choices=CATEGORIES,
        default='General Feedback',
    )
    issue_description=models.TextField(max_length=400)

    ticket_priority=models.IntegerField( #Critical-1 Low-4
            ('Priority'),
        choices=PRIORITY,
        default=3,
        blank=3,
        help_text=('1 = High Priority, 5 = Low Priority'),
    )
    def get_absolute_url(self):
        return reverse('success')
    def __str__(self):
        return "ticket priority:[%s] user_id:[%s] issue_description:[%s]" % (self.ticket_priority,self.user_id,self.issue_description)
class CustomUser(AbstractUser):
    def __str__(self):
        return self.username







    
        
