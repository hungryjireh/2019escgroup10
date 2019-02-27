from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser, StandardUser
from django.db import transaction #ensures that DB info gets passed in one shot

class CreateForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model=CustomUser
        fields=('username',)

class ChangeForm(UserChangeForm): #for admin to change user permission and details
    class Meta:
        model=CustomUser
        fields=('username',)

class UserTicketForm(ModelForm):
    class Meta:
        model=StandardUser
        fields = '__all__'
