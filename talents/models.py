from django.db import models
from django.core.validators import URLValidator, FileExtensionValidator
from datetime import date

class Talent(models.Model):
    #Opciones para selects
    SEXO_CHOICES = [('masculino', 'Masculino'), ('femenino', 'Femenino'),
                    ('otro', 'Otro'),]
    
    SEMESTRE_CHOICES = [(i, f'Semestre {i}') for i in range(1,11)]

    NIVEL_INGLES_CHOICES = [('basico', 'Basico'), ('intermedio', 'Intermedio'),
                            ('avanzado', 'Avanzado'), ('fluido', 'Fluido')]
    
    AREA_INTERES_CHOICES = [('ia', 'Inteligencia Artificial'),
                            ('web', 'Desarrollo Web'),
                            ('mobile', 'Desarrollo Mobile'),
                            ('data', 'Data Science'),
                            ('cybersecurity', 'Ciberseguridad'),
                            ('otro', 'Otro')]
    
    TIPO_OPORTUNIDADES_CHOICES = [('pasantia', 'Pasantía'),
                                  ('tiempo_completo', 'Empleo a Tiempo Completo'),
                                  ('freelace', 'Freelance'),
                                  ('startup', 'Startup')]
    
    # === DATOS PERSONALES ===
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)
    ciudad = models.CharField(max_length=100)
    sexo = models.CharField(max_length=20, choices=SEXO_CHOICES)

    # === DATOS ACADÉMICOS ===
    carrera = models.CharField(max_length=150)
    universidad = models.CharField(max_length=150, default="ESPOL")
    semestre = models.IntegerField(choices=SEMESTRE_CHOICES)
    fecha_graduacion = models.DateField()

    # === DATOS PROFESIONALES ===
    linkedin_url = models.URLField()
    github_url = models.URLField(blank=True, null=True)
    nivel_ingles = models.CharField(max_length=20, choices=NIVEL_INGLES_CHOICES)

    # Áreas de interés
    areas_interes = models.ManyToManyField('AreaInteres', related_name='talentos')

    #Tipo de oportunidades
    tipo_oportunidad = models.ManyToManyField('TipoOportunidad', related_name='talentos')

    #Archivo CV
    cv = models.FileField(
        upload_to='cvs/%Y/%m/%d/', 
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])]
    ) 

    #Consentimiento
    acepta_datos = models.BooleanField(default=False)

    #Metadatos
    fecha_registro = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Talento"
        verbose_name_plural = "Talentos"
        ordering = ['-fecha_registro']
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class AreaInteres(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        verbose_name = "Área de Interés"
        verbose_name_plural = "Áreas de Interés"

    def __str__(self):
        return self.nombre

class TipoOportunidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        verbose_name = "Tipo de Oportunidad"
        verbose_name_plural = "Tipos de Oportunidades"

    def __str__(self):
        return self.nombre