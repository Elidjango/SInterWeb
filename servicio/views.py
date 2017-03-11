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

from servicio.models import *
from servicio.forms import *

from caja.forms import *
from caja.models import *

from abonado.models import *
from abonado.forms import *

from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt


class ServView(TemplateView):
    template_name = 'rg_servicio.html'
    def get(self, request, *args, **kwargs):
        abo = abonado.objects.all()
        caj = caja.objects.all()

        return render(request,self.template_name, {'data': abo, 'data': caj})
   
    def post(self, request):
        servicio.objects.create(cedula2=request.POST['cedula2'],
	                            num_abonado3_id=int(request.POST['num_abonado3']),
	                            nombre_abo_serv1=request.POST['nombre_abo_serv1'],
	                            nombre_abo_serv2=request.POST['nombre_abo_serv2'],
	                            apellido_abo_serv1=request.POST['apellido_abo_serv1'],
	                            apellido_abo_serv2=request.POST['apellido_abo_serv2'],
	                            direccion_abo_serv=request.POST['direccion_abo_serv'],
	                            serial2_id=int(request.POST['serial2']),
	                            descripcion=request.POST['descripcion'])
        return redirect('rg_servicio')