let currentStep = 1;
const totalSteps = 3;

function updateSteps(direction) {
  const prev = currentStep;
  currentStep += direction;

  // Update panels
  document.getElementById('panel-' + prev).classList.remove('visible');
  document.getElementById('panel-' + currentStep).classList.add('visible');

  // Update step indicators
  const prevItem = document.getElementById('si-' + prev);
  const currItem = document.getElementById('si-' + currentStep);

  prevItem.classList.remove('active');
  currItem.classList.remove('done');
  currItem.classList.add('active');

  if (direction > 0) {
    prevItem.classList.add('done');
    document.getElementById('sc-' + prev).innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:16px;height:16px">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
      </svg>`;
  } else {
    prevItem.classList.remove('done');
    document.getElementById('sc-' + prev).textContent = prev;
  }

  // Update counter
  document.getElementById('step-counter').textContent = 'Paso ' + currentStep + ' de ' + totalSteps;

  // Update buttons
  const backBtn = document.getElementById('btn-back');
  const nextBtn = document.getElementById('btn-next');

  backBtn.disabled = currentStep === 1;

  if (currentStep === totalSteps) {
    nextBtn.textContent = 'Enviar datos';
    nextBtn.classList.add('btn-enviar');
  } else {
    nextBtn.textContent = 'Siguiente →';
    nextBtn.classList.remove('btn-enviar');
  }
}

function goNext() {
  if (currentStep === totalSteps) {
    enviarFormulario();
    return;
  }
  if (currentStep < totalSteps) updateSteps(1);
}

function goBack() {
  if (currentStep > 1) updateSteps(-1);
}

function enviarFormulario() {
  const salida = document.querySelector('.textoSalida');
  salida.textContent = '✅ ¡Datos enviados correctamente!';
  salida.style.color = '#6B21A8';
  salida.style.fontWeight = '600';
}

function limpiarFormulario() {
  document.querySelectorAll('.form-input').forEach(el => {
    if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else el.value = '';
  });
  document.querySelectorAll('.chip-input').forEach(el => el.checked = false);
  document.getElementById('otro-input-wrapper').classList.remove('visible');
  document.getElementById('cv-name').textContent = '';

  alert("limpiado")
}

function validarDatos(datos) {
  const errores = [];
  if (!datos.nombre)          errores.push("El nombre es obligatorio.");
  if (!datos.apellido)        errores.push("El apellido es obligatorio.");
  if (!datos.correo)          errores.push("El correo electrónico es obligatorio.");
  if (!datos.telefono)        errores.push("El teléfono es obligatorio.");
  if (!datos.ciudad)          errores.push("La ciudad de residencia es obligatoria.");
  if (!datos.carrera)         errores.push("La carrera es obligatoria.");
  if (!datos.semestre)        errores.push("El semestre es obligatorio.");
  if (!datos.fecha_graduacion) errores.push("La fecha estimada de graduación es obligatoria.");
  if (!datos.linkedin)        errores.push("El perfil de LinkedIn es obligatorio.");
  if (datos.areas_interes.length === 0) errores.push("Selecciona al menos un área de interés.");
  if (datos.tipo_oportunidad.length === 0) errores.push("Selecciona al menos un tipo de oportunidad.");
  if (!datos.cv_file)         errores.push("Adjunta tu CV.");
 
  //validar email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (datos.correo && !emailRegex.test(datos.correo)) {
    errores.push("El correo electrónico no tiene un formato válido.");
  }
 
  return errores;
}

//recuperar referencias textos
function recuperarDatos(){
  const nombre = document.querySelector(".form-input.nombre").value.trim();
  const apellido = document.querySelector(".form-input.apellido").value.trim();
  const correo   = document.querySelector(".form-input.correo").value.trim();
  const telefono = document.querySelector(".form-input.telefono").value.trim();
  const ciudad = document.querySelector(".form-input.ciudad").value.trim();

  //academicos
  const carrera  = document.querySelector(".form-input.carrera").value.trim();
  const semestre = document.querySelector(".form-input.semestre").value.trim();
  const fecha_graduacion = document.querySelector(".form-input.fecha").value.trim();

  //profesionales
   const linkedin = document.querySelector(".form-input.linkedin").value.trim();

  // Checkboxes — áreas de interés (múltiple)
  const areas_interes = Array.from(
    document.querySelectorAll('input[name="areas"]:checked')
  ).map(cb => cb.value);
 
  // Checkboxes — tipo de oportunidad (múltiple)
  const tipo_oportunidad = Array.from(
    document.querySelectorAll('input[name="oportunidad"]:checked')
  ).map(cb => cb.value);
 
  // Archivo CV
  const cvInput = document.getElementById("cv-upload");
  const cv_file = cvInput?.files?.[0] ?? null;

  return{
    nombre, apellido, telefono, correo, ciudad, carrera, semestre,
     fecha_graduacion, linkedin, areas_interes, tipo_oportunidad, cv_file,
    };
  }

  async function enviarFormulario(){
    const datos = recuperarDatos();
    const errores = validarDatos(datos);

    const btnEnviar = document.querySelector(".btn-primary");
    btnEnviar.textContent = "enviando..."

  }

function toggleOtroInput(checkbox) {
  const wrapper = document.getElementById('otro-input-wrapper');
  const input   = document.getElementById('area-otro-texto');
  if (checkbox.checked) {
    wrapper.classList.add('visible');
    input.focus();
  } else {
    wrapper.classList.remove('visible');
    input.value = '';
  }
}