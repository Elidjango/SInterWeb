from __future__ import unicode_literals

from django.db import models

from caja.models import *
from abonado.models import abonado
# Create your models here.

class servicio(models.Model):
	cedula2 = models.CharField(max_length=10, null=True, blank=True)
	num_abonado3 = models.ForeignKey(abonado, on_delete=models.CASCADE)
	nombre_abo_serv1 = models.CharField(max_length=30, null=True, blank=True)
	nombre_abo_serv2 = models.CharField(max_length=30)
	apellido_abo_serv1 = models.CharField(max_length=30, null=True, blank=True)
	apellido_abo_serv2 = models.CharField(max_length=30)
	direccion_abo_serv = models.TextField(max_length=500, null=True, blank=True)
	serial2 = models.ForeignKey(caja, on_delete=models.CASCADE)
	descripcion = models.TextField(max_length=500, null=True, blank=True)

	def __unicode__(self):
		Dato ="%s"%(self.cedula2)
		return Dato