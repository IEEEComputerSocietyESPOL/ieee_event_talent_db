let currentStep = 1;
const totalSteps = 3;

document.addEventListener("DOMContentLoaded", () => {
  const cvUpload = document.getElementById("cv-upload");
  const cvName = document.getElementById("cv-name");

  if (cvUpload) {
    cvUpload.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        cvName.textContent = "📄 " + this.files[0].name;
        cvName.style.color = "#6B21A8";
        cvName.style.fontWeight = "500";
      } else {
        cvName.textContent = "";
      }
    });
  }
});

function updateSteps(direction) {
  const prev = currentStep;
  currentStep += direction;

  document.getElementById("panel-" + prev).classList.remove("visible");
  document.getElementById("panel-" + currentStep).classList.add("visible");

  const prevItem = document.getElementById("si-" + prev);
  const currItem = document.getElementById("si-" + currentStep);

  prevItem.classList.remove("active");
  currItem.classList.remove("done");
  currItem.classList.add("active");

  if (direction > 0) {
    prevItem.classList.add("done");

    document.getElementById("sc-" + prev).innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:16px;height:16px">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
      </svg>
    `;
  } else {
    prevItem.classList.remove("done");
    document.getElementById("sc-" + prev).textContent = prev;
  }

  document.getElementById("step-counter").textContent =
    "Paso " + currentStep + " de " + totalSteps;

  const backBtn = document.getElementById("btn-back");
  const nextBtn = document.getElementById("btn-next");

  backBtn.disabled = currentStep === 1;

  if (currentStep === totalSteps) {
    nextBtn.textContent = "Enviar datos";
  } else {
    nextBtn.textContent = "Siguiente →";
  }
}

function validarPaso1() {
  const nombre = document.querySelector(".nombre").value.trim();
  const apellido = document.querySelector(".apellido").value.trim();
  const correo = document.querySelector(".correo").value.trim();
  const telefono = document.querySelector(".telefono").value.trim();
  const ciudad = document.querySelector(".ciudad").value.trim();
  const sexo = document.querySelector(".sexo").value;

  if (!nombre || !apellido || !correo || !telefono || !ciudad || !sexo) {
    alert("Debe completar todos los campos del Paso 1 para continuar.");
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(correo)) {
    alert("Ingrese un correo electrónico válido.");
    return false;
  }

  return true;
}

function validarPaso2() {
  const carrera = document.querySelector(".carrera").value.trim();
  const universidad = document.querySelector(".universidad").value.trim();
  const semestre = document.querySelector(".semestre").value;
  const fecha = document.querySelector(".fecha").value;

  if (!carrera || !universidad || !semestre || !fecha) {
    alert("Debe completar todos los campos del Paso 2 para continuar.");
    return false;
  }

  return true;
}

function validarPaso3() {
  const linkedin = document.querySelector(".linkedin").value.trim();
  const ingles = document.querySelector(".ingles").value;

  const areasInteres = document.querySelectorAll('input[name="areas_interes"]:checked');
  const oportunidades = document.querySelectorAll('input[name="tipo_oportunidad"]:checked');

  const cv = document.getElementById("cv-upload").files[0];
  const aceptaDatos = document.getElementById("acepta-datos").checked;

  if (!linkedin || !ingles || areasInteres.length === 0 || oportunidades.length === 0 || !cv || !aceptaDatos) {
    alert("Debe completar todos los campos obligatorios del Paso 3.");
    return false;
  }

  return true;
}

function goNext() {
  if (currentStep === 1 && !validarPaso1()) return;
  if (currentStep === 2 && !validarPaso2()) return;

  if (currentStep === 3) {
    enviarFormulario();
    return;
  }

  updateSteps(1);
}

function goBack() {
  if (currentStep > 1) {
    updateSteps(-1);
  }
}


async function enviarFormulario() {
  if (!validarPaso3()) return;

  const salida = document.querySelector(".textoSalida");
  salida.textContent = "Procesando registro, por favor espere...";
  salida.style.color = "#3B82F6";

  // Capturar el token de seguridad CSRF de Django incrustado en el HTML
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  // Empaquetar los datos nativos utilizando FormData (Ideal para archivos adjuntos)
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);

  try {
    // Apuntar a la URL que definieron en urls.py
    const response = await fetch("/registro/", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": csrftoken,
        "X-Requested-With": "XMLHttpRequest" // Activa la vista AJAX en el backend
      }
    });

    const resultado = await response.json();

    if (resultado.success) {
      salida.textContent = resultado.message;
      salida.style.color = "#10B981";
      limpiarFormulario();
      
      // Opcional: Redirigir a la página de éxito tras 2 segundos
      setTimeout(() => {
        window.location.href = `/registro/exito/`;
      }, 2000);

    } else {
      salida.textContent = "Error: " + resultado.message;
      salida.style.color = "#EF4444";
    }

  } catch (error) {
    console.error("Error en la petición:", error);
    salida.textContent = "Ocurrió un error inesperado al conectar con el servidor.";
    salida.style.color = "#EF4444";
  }
}

function limpiarFormulario() {
  document.querySelectorAll(".form-input").forEach(el => {
    if (el.tagName === "SELECT") {
      el.selectedIndex = 0;
    } else {
      el.value = "";
    }
  });

  document.querySelectorAll(".chip-input").forEach(el => {
    el.checked = false;
  });

  document.getElementById("acepta-datos").checked = false;
  document.getElementById("otro-input-wrapper").classList.remove("visible");
  document.getElementById("cv-name").textContent = "";
  currentStep = 1;
}

function toggleOtroInput(checkbox) {
  const wrapper = document.getElementById("otro-input-wrapper");
  const input = document.getElementById("area-otro-texto");

  if (checkbox.checked) {
    wrapper.classList.add("visible");
    input.focus();
  } else {
    wrapper.classList.remove("visible");
    input.value = "";
  }
}