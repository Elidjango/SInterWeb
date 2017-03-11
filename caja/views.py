#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.template import Context
from django.template.loader import get_template
from django.http.response import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from django.core.urlresolvers import reverse
from django.template.context import RequestContext
from django.contrib.auth.models import User
from django.utils import timezone
from django.views.generic.edit import CreateView
from django.views.generic import ListView, DeleteView, TemplateView
# from .forms import FormularioEvento
from django.core.urlresolvers import reverse_lazy

from caja.forms import *
from caja.models import *

from abonado.models import *
from abonado.forms import *

from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt


class CajaView(TemplateView):
    template_name = 'rg_caja.html'
    def get(self, request, *args, **kwargs):
        Listas = abonado.objects.all()

        return render(request,self.template_name, {'data': Listas})
   
    def post(self, request):
        caja.objects.create(serial=request.POST['serial'],
                             num_abonado2_id=int(request.POST['num_abonado2']))
        return redirect('rg_caja')