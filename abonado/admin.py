from django.contrib import admin

from .models import *
# Register your models here.

class AdminAbo(admin.ModelAdmin):

	list_display = ['cedula','__unicode__','nombre_abo1','nombre_abo2',
	'apellido_abo1','apellido_abo2','direccion_abo']

	class Meta:
		model = abonado

admin.site.register(abonado, AdminAbo)