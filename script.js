function limpiarFormulario() {
  document.querySelectorAll('.form-input').forEach(i => i.value = '');
  document.querySelectorAll('.chip-input').forEach(c => c.checked = false);
  document.getElementById('cv-name').textContent = '';
  document.getElementById('cv-upload').value = '';
}