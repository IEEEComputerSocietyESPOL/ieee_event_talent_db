from django.db import models

class Talent(models.Model):
    first_name = models.CharField("Nombres", max_length=100)
    last_name = models.CharField("Apellidos", max_length=100)
    email = models.EmailField("Correo electrónico", unique=True)
    phone = models.CharField("Teléfono", max_length=20, blank=True)
    
    # Datos académicos y profesionales
    degree = models.CharField("Carrera", max_length=100, help_text="Ej: Ingeniería en Computación")
    university = models.CharField("Universidad", max_length=100, default="ESPOL")
    skills = models.TextField("Habilidades Clave", help_text="Separadas por comas (Ej: Python, Django, Liderazgo)")
    
    # Enlaces y archivos
    linkedin_url = models.URLField("Perfil de LinkedIn", blank=True)
    portfolio_url = models.URLField("GitHub / Portafolio", blank=True)
    cv = models.FileField("Curriculum Vitae", upload_to='cvs/')
    
    # Metadatos
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.degree}"
    

#OJOOOOOOOOO ESTOOOOOOOOOS DATOS SON GENERICOS DE IA, USTEDES TENDRAN QUE HACER LA BASE DE DATOS DESDE AQUI, 
# SOLO PARA QUE TENGAN UN IDEA DE LO QUE TIENEN QUE HACER
