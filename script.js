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
  document.querySelector('.textoSalida').textContent = '';
}

function toggleOtroInput(el) {
  document.getElementById('otro-input-wrapper').classList.toggle('visible', el.checked);
}

document.getElementById('cv-upload').addEventListener('change', function () {
  document.getElementById('cv-name').textContent = this.files[0] ? this.files[0].name : '';
});
