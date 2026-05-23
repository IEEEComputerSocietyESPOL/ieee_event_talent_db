function limpiarFormulario() {
  document.querySelectorAll('.form-input').forEach(i => i.value = '');
  document.querySelectorAll('.chip-input').forEach(c => c.checked = false);
  document.getElementById('cv-name').textContent = '';
  document.getElementById('cv-upload').value = '';
}

//recuperar referencias textos
const nombreInput      = document.querySelector('.nombre');
const correoInput      = document.querySelector('.correo');
const apellidoInput    = document.querySelector('.apellido');
const telefonoInput    = document.querySelector('.telefono');
const ciudadInput      = document.querySelector('.ciudad');
const carreraInput     = document.querySelector('.carrera');
const semestreInput    = document.querySelector('.semestre');
const fechaInput       = document.querySelector('.fecha');
const linkedinInput    = document.querySelector('.linkedin');

//recuperar referencias chips
const areasChips       = document.querySelectorAll('input[name="areas"]');
const oportunidadChips = document.querySelectorAll('input[name="oportunidad"]');
const cvUpload         = document.querySelector('#cv-upload');


//leer valores de chips y archivos
const areasSeleccionadas = [...areasChips].filter(c => c.checked).map(c => c.value);
const opSeleccionadas    = [...oportunidadChips].filter(c => c.checked).map(c => c.value);
const archivo            = cvUpload ? cvUpload.files[0] : null;