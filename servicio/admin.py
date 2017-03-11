from django.contrib import admin

from .models import *
# Register your models here.

class AdminServ(admin.ModelAdmin):
	
	list_display = ['__unicode__','num_abonado3','nombre_abo_serv1','nombre_abo_serv2','apellido_abo_serv1',
	'apellido_abo_serv2','direccion_abo_serv','serial2','descripcion']

	class Meta:
		model = servicio

admin.site.register(servicio, AdminServ)