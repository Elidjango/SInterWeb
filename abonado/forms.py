from django import forms
from .models import *


class AbonadoFrom(forms.ModelForm):

	class Meta:
		model = abonado
			
		fields = [
			'cedula',
			'num_abonado',
			'nombre_abo1',
			'nombre_abo2',
			'apellido_abo1',
			'apellido_abo2',
			'direccion_abo',
		]

		widgets = {
		 	'cedula': forms.TextInput(attrs={'class':'form-control'}),
		 	'num_abonado': forms.NumberInput(attrs={'class': 'form-control'}),
		 	'nombre_abo1': forms.TextInput(attrs={'class': 'form-control'}),
		 	'nombre_abo2': forms.TextInput(attrs={'class': 'form-control'}),
		 	'apellido_abo1': forms.TextInput(attrs={'class': 'form-control'}),
		 	'apellido_abo2': forms.TextInput(attrs={'class': 'form-control'}),
		 	'direccion_abo': forms.TextInput(attrs={'class': 'form-control'}),
		}