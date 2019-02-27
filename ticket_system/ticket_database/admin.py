from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .forms import CreateForm, ChangeForm

class CustomUserAdmin(UserAdmin):
    add_form=CreateForm
    change_form=ChangeForm
    model=CustomUser
    list_display=['username','email',]

admin.site.register(CustomUser, UserAdmin)

