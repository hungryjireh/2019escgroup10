from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseForbidden
from .forms import CreateForm,UserTicketForm
from django.urls import reverse_lazy
from .models import StandardUser
from django.views import generic
from django.conf import settings
from django.views.generic import CreateView
from django.utils.decorators import method_decorator
from django.http import HttpResponseRedirect
# from django.contrib.auth.decorators import user_passes_test

class Signup(generic.CreateView):
    form_class=CreateForm
    success_url=reverse_lazy('login')
    template_name='signup.html'

# @method_decorator(user_passes_test(lambda u: u.is_superuser),name='dispatch')
def admin_view(request):
    if request.user.is_superuser:
        return render(request, 'adminpage.html')
    else:
        return HttpResponseForbidden()

class UserFormView(CreateView):
    model=StandardUser
    form_class=UserTicketForm
    template_name='ticketform.html'
    
    HttpResponseRedirect('success.html')

