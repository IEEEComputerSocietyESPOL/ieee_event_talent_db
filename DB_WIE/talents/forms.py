from django import forms
from django.core.exceptions import ValidationError
from .models import Talent
import re

class TalentRegistrationForm(forms.ModelForm):

    class Meta:
        model = Talent
        fields = [
            'nombre', 'apellido', 'correo', 'telefono', 'ciudad', 'sexo',
            'carrera', 'universidad', 'semestre', 'fecha_graduacion',
            'linkedin_url', 'github_url', 'nivel_ingles',
            'areas_interes', 'tipo_oportunidad', 'cv', 'acepta_datos'
        ]

        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-input', 'required': True}),
            'apellido': forms.TextInput(attrs={'class': 'form-input', 'required': True}),
            'correo': forms.EmailInput(attrs={'class': 'form-input', 'required': True}),
            'telefono': forms.TextInput(attrs={'class': 'form-input', 'required': True}),
            'ciudad': forms.TextInput(attrs={'class': 'form-input', 'required': True}),
            'sexo': forms.Select(attrs={'class': 'form-input', 'required': True}),
            'carrera': forms.TextInput(attrs={'class': 'form-input', 'required': True}),
            'universidad': forms.TextInput(attrs={'class': 'form-input', 'required': True}),
            'semestre': forms.Select(attrs={'class': 'form-input', 'required':True}),
            'fecha_graduacion': forms.DateInput(attrs={'class': 'form-input', 'type': 'date', 'required': True}),
            'linkedin_url': forms.URLInput(attrs={'class': 'form-input', 'required': True}),
            'github_url': forms.URLInput(attrs={'class': 'form-input', 'required': False}),
            'nivel_ingles': forms.Select(attrs={'class': 'form-input', 'required': True}),
            'areas_interes': forms.CheckboxSelectMultiple(),
            'tipo_oportunidad': forms.CheckboxSelectMultiple(),
            'cv': forms.FileInput(attrs={'class': 'form-input', 'accept': '.pdf,.doc,.docx', 'required': True}),
            'acepta_datos': forms.CheckboxInput(attrs={'required': True}),
        }
    
    def clean_linkedin_url(self):
        url = self.cleaned_data.get('linkedin_url')
        if url and not url.startswith('https://linkedin.com/'):
            raise ValidationError('El enlace debe comenzar con https://linkedin.com/')
        return url
    
    def clean_github_url(self):
        url = self.cleaned_data.get('github_url')
        if url and not url.starswith('https://github.com/'):
            raise ValidationError('El enlace debe comenzar con https://github.com/')
        return url
    
    def clean_telefono(self):
        telefono = self.cleaned_data.get('telefono')
        #Validar que sea un número de teléfono valido
        if not re.match(r'^[\d\s\-\+\(\)]{7,20}$', telefono):
            raise ValidationError('Teléfono inválido')
        return telefono
    
    def clean_cv(self):
        cv = self.cleaned_data.get('cv')
        if cv and cv.size > 5 * 1024 * 1024: #5MB máximo
            raise ValidationError('El archivo debe ser menor a 5MB')
        return cv