from django import forms
from .models import *

class CajaFrom(forms.ModelForm):

	css_error_class = 'has-error'

	class Meta:
		model = servicio
		fields = ('cedula2', 'num_abonado3' ,'nombre_abo_serv1' , 'nombre_abo_serv2',
			'apellido_abo_serv1' ,'apellido_abo_serv2','direccion_abo_serv' ,'serial2',
			'descripcion')

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		for field in self.fields:
			self.fields[field].widget.attrs.update({'class': 'form-control'})