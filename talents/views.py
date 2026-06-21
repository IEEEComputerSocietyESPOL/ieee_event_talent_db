from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Talent, AreaInteres, TipoOportunidad
from .forms import TalentRegistrationForm

@require_http_methods(["GET", "POST"])
def registro(request):
    """Vista para el formulario de registro de talentos"""

    if request.method == 'POST':
        #Si es una solicitud AJAX/JSON
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return procesar_registro_ajax(request)
        
        #Si es un envío tradicional de formulario
        form = TalentRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            talent = form.save()
            messages.success(request, '¡Registro completado exitosamente!')
            return redirect('registro_exitoso', pk=talent.pk)
        else:
            #Devolver errores del formulario
            return render(request, 'talents/registro.html', {'form': form})
    else: #GET
        form = TalentRegistrationForm()
        areas = AreaInteres.objects.all()
        oportunidades = TipoOportunidad.objects.all()

        return render(request, 'talents/registro.html', {
            'form': form,
            'areas': areas,
            'oportunidades': oportunidades
        })

def procesar_registro_ajax(request):
    """Procesa el registro mediante AJAX/FormData de forma compatible con archivos"""
    try:
        form = TalentRegistrationForm(request.POST, request.FILES)
        
        if form.is_valid():
            # Guarda los datos, el archivo CV y gestiona automáticamente las relaciones M2M (áreas e interés)
            talent = form.save()
            
            return JsonResponse({
                'success': True,
                'message': '¡Registro completado con éxito!',
                'talent_id': talent.pk
            })
        else:
            # Si el formulario no pasa las validaciones (ej: el teléfono está mal o el correo ya existe)
            # Extraemos el primer error para mostrarlo de forma amigable en el frontend
            errores = form.errors.get_json_data()
            primer_campo = list(errores.keys())[0]
            mensaje_error = errores[primer_campo][0]['message']
            
            return JsonResponse({
                'success': False,
                'message': f'Error en el campo {primer_campo}: {mensaje_error}'
            }, status=400)
            
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error del servidor: {str(e)}'
        }, status=500)

def registro_exito(request):
    """Renderiza la página de agradecimiento y confirmación de registro"""
    return render(request, 'talents/exito.html')