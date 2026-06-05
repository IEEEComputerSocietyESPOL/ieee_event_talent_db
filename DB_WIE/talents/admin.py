from django.contrib import admin
from .models import Talent, AreaInteres, TipoOportunidad

@admin.registrer(Talent)
class TalentAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'correo', 'carrera', 'fecha_registro', 'nivel_ingles')
    list_filter = ('carrera', 'nivel_ingles', 'semestre', 'area_interes', 'fecha_registro')
    search_fields = ('nombre', 'apellido', 'correo', 'carrera', 'linkedin_url')
    readonly_fields = ('fecha_registro', 'actualizado_en')

    fieldsets = (
        ('Datos Personales', {
            'field': ('nombre', 'apellido', 'correo', 'telefono', 'ciudad', 'sexo')
        }),
        ('Datos Académicos', {
            'field': ('carrera', 'universidad', 'semestre', 'fecha_graduacion')
        }),
        ('Datos Profesionales', {
            'fields': ('linkedin_url', 'github_url', 'nivel_ingles', 'areas_interes', 'tipo_oportunidad', 'cv')
        }),
        ('Consentimiento', {
            'fields': ('acepta_datos')
        }),
        ('Timestamps', {
            'fields': ('fecha_registro', 'actualizado_en'),
            'classes': ('collapse')
        }),
    )

    def get_queryset(self, request):
        #Optimizar consultas
        qs = super().get_queryset(request)
        return qs.prefetch_related('areas_interes', 'tipo_oportunidad')

@admin.register(AreaInteres)
class AreaInteresAdmin(admin.ModelAdmin):
    list_display = ('nomnre', 'descripcion')
    search_fields = ('nombre',)

@admin.register(TipoOportunidad)
class TipoOportunidadAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre',)