👥 División de Equipos Definitiva (8 Personas)
🎨 Equipo Frontend: Interfaz y Maquetación (3 Personas)
Integrantes: La persona que hizo el Mockup + 2 personas más.

Misión: Traducir el diseño visual a plantillas de Django (templates/).

La persona del Mockup: Lidera este equipo explicando la estructura visual, asegurando que el HTML/CSS (pueden usar Bootstrap o Tailwind) sea fiel a su diseño y que sea 100% responsivo para celulares y computadoras.

Las otras 2 personas: Apoyan en la maquetación de la página de registro, la pantalla de "Éxito al registrarse" y la integración de los estilos.

🗄️ Equipo Backend A: Base de Datos y Panel Admin (2 Personas)
Misión: Crear los cimientos de la plataforma en Django.

Escribir el modelo de la base de datos (models.py) con todos los campos (nombres, LinkedIn, CV en PDF, etc.).

Configurar y tunear el Panel de Administración de Django (admin.py) con buscadores y filtros por carrera para las chicas de la WIE Week.

Encargarse de las migraciones de la base de datos y dar de alta el primer "superusuario" para que puedan probar el panel.

🔌 Equipo Backend B: Lógica, Formularios y Despliegue (2 Personas)
Misión: Hacer que todo funcione por detrás y subirlo a internet.

Crear el formulario de Django (forms.py) y conectarlo con las vistas (views.py) para procesar los datos y guardar los archivos PDF en el servidor.

Validar que la información que ingresen los talentos sea correcta (por ejemplo, que el enlace de LinkedIn empiece por [https://linkedin.com/](https://linkedin.com/)...).

Configurar el entorno inicial del proyecto (Git, .gitignore, requirements.txt) y, al final, encargarse de subir el proyecto a producción (en plataformas como Render o Railway) para que el link quede público.

💡 El flujo de trabajo ideal para arrancar:
Paso 1 (Backend B): Configura el repositorio de Git con un proyecto de Django vacío y limpio, y todos lo clonan.

Paso 2 (Backend A y Frontend en paralelo): Mientras el equipo de Backend A escribe los modelos en código, el equipo de Frontend empieza a maquetar el HTML puro basándose en el mockup.

Paso 3 (Integración): El equipo de Backend B toma el HTML del Frontend, lo conecta con las vistas de Django y ¡listo! Proyecto caminado.
