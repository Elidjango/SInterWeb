from django.contrib import admin

from .models import *
# Register your models here.

class AdminCaja(admin.ModelAdmin):
	
	list_display = ['__unicode__','num_abonado2']

	class Meta:
		model = caja

admin.site.register(caja, AdminCaja)