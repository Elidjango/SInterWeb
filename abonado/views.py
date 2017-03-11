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

from abonado.forms import *
from abonado.models import *

from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt


@login_required()
def rg_abonado(request):
	form = AbonadoFrom(request.GET or None)

	Context={
		"form":form
	}

	if form.is_valid():
		form_data = form.cleaned_data
		cedula = form_data.get("cedula")
		num_abonado = form_data.get("num_abonado")
		nombre_abo1 = form_data.get("nombre_abo1")
		nombre_abo2 = form_data.get("nombre_abo2")
		apellido_abo1 = form_data.get("apellido_abo1")
		apellido_abo2 = form_data.get("apellido_abo2")
		direccion_abo = form_data.get("direccion_abo")

		obj = abonado.objects.create(cedula=cedula, num_abonado=num_abonado,
			nombre_abo1=nombre_abo1, nombre_abo2=nombre_abo2, apellido_abo1=apellido_abo1, 
			apellido_abo2=apellido_abo2, direccion_abo=direccion_abo)
	else:
		print ("No Existe")

	return render_to_response("rg_abonado.html", Context)