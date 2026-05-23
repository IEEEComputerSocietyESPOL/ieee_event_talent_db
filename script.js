function limpiarFormulario() {
  document.querySelectorAll('.form-input').forEach(i => i.value = '');
  document.querySelectorAll('.chip-input').forEach(c => c.checked = false);
  document.getElementById('cv-name').textContent = '';
  document.getElementById('cv-upload').value = '';
}

//recuperar referencias
const nombreInput      = document.querySelector('input[placeholder="Ej. Chritian David"]');
const correoInput      = document.querySelector('input[type="email"]');
const apellidoInput    = document.querySelector('input[placeholder="Ej. Olmedo Benitez"]');
const telefonoInput    = document.querySelector('input[type="tel"]');
const ciudadInput      = document.querySelector('input[placeholder="Ej. Ambato, Cuenca, etc."]');
const carreraInput     = document.querySelector('input[placeholder="Ej. Computación, Mecatrónica, etc."]');
const semestreInput    = document.querySelector('input[placeholder="Semestre que cursa"]');
const fechaInput       = document.querySelector('input[placeholder="Fecha estimada de graduación"]');
const linkedinInput    = document.querySelector('input[type="url"]');
const areasChips       = document.querySelectorAll('input[name="areas"]');
const oportunidadChips = document.querySelectorAll('input[name="oportunidad"]');
const cvUpload         = document.querySelector('#cv-upload');
