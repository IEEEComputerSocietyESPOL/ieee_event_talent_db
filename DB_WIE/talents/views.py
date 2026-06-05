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
    """Procesa el registro mediante AJAX"""
    try:
        data = json.loads(request.body)

        #Validar datos
        campos_reqeridos = [
            'nombre', 'apellido', 'correo', 'telefono', 'ciudad', 'sexo',
            'carrera', 'universidad', 'semestre', 'fecha_graduacion',
            'linkedin_url'
        ]

        for campo in campos_reqeridos:
            if campo not in data or not data[campo]:
                return JsonResponse({
                    'success': False,
                    'message': f'Campo requerido: {campo}'
                }, status=400)
        
        #Crear el registro
        talent = Talent.objects.create(
            nombre=data['nombre'],
            apellido=data['apellido'],
            correo=data['correo'],
            telefono=data['telefono'],
            ciudad=data['ciudad'],
            sexo=data['sexo'],
            carrera=data['carrera'],
            universidad=data['universidad'],
            semestre=int(data['semestre']),
            fecha_graduacion=data['fecha_graduacion'],
            linkedin_url=data['linkedin_url'],
            github_url=data.get('github_url', ''),
            nivel_ingles=data['nivel_ingles'],
            acepta_datos=data.get('acepta_datos', False)
        )

        return JsonResponse({
            'success': True,
            'message': '¡Registro completaod exitosamente!',
            'talent_id': talent.pk
        })
    
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Error: JSON inválido'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error del servidor: {str(e)}'
        }, status=500)

def registro_exitoso(request, pk):
    """Página de confirmación después del registro"""
    try:
        talent = Talent.objects.get(pk=pk)
        return render(request, 'talents/registro_exitoso.html', {'talent': talent})
    except Talent.DoesNotExist:
        return redirect('registro')