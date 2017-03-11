from django import forms
from .models import *

class CajaFrom(forms.ModelForm):

	css_error_class = 'has-error'

	class Meta:
		model = caja
		fields = ('serial', 'num_abonado2')

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		for field in self.fields:
			self.fields[field].widget.attrs.update({'class': 'form-control'})