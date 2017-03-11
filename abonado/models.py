from __future__ import unicode_literals

from django.db import models
# Create your models here.

class abonado(models.Model):
	cedula = models.CharField(max_length=10, null=True, blank=True)
	num_abonado = models.IntegerField(primary_key=True)
	nombre_abo1 = models.CharField(max_length=30, null=True, blank=True)
	nombre_abo2 = models.CharField(max_length=30)
	apellido_abo1 = models.CharField(max_length=30, null=True, blank=True)
	apellido_abo2 = models.CharField(max_length=30)
	direccion_abo = models.TextField(max_length=500, null=True, blank=True)

	def __unicode__(self):
		Dato ="%i"%(self.num_abonado)
		return Dato