from __future__ import unicode_literals

from django.db import models
from abonado.models import *
# Create your models here.

class caja(models.Model):
	serial = models.CharField(max_length=40, null=True, blank=True, unique=True)
	num_abonado2 = models.ForeignKey(abonado, on_delete=models.CASCADE)

	def __unicode__(self):
		Dato ="%s"%(self.serial)
		return Dato