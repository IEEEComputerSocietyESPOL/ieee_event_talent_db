# 🚀 Proyecto: Portal de Registro de Talentos - WIE Week

Este proyecto consiste en el desarrollo de una plataforma web construida en **Django** para el registro de talentos. El objetivo principal es recopilar perfiles profesionales (datos personales, LinkedIn, CV, etc.) para ofrecerlos a los sponsors de la WIE Week. Además, incluye un panel de administración intuitivo y preconfigurado para que las organizadoras del evento puedan gestionar la base de datos de forma sencilla y sin necesidad de conocimientos técnicos.

---

## 👥 División de Equipos y Roles

Para avanzar en paralelo y garantizar que las 8 personas del equipo aporten significativamente, nos dividiremos en los siguientes micro-equipos de trabajo:

### 🎨 Equipo Frontend: Interfaz y Maquetación (3 Personas)
*   **Integrantes:** Diseñador del Mockup + 2 Desarrolladores Frontend.
*   **Misión:** Traducir el diseño visual a plantillas de Django (`templates/`).
*   **Responsabilidades:**
    *   **Líder de UI (Creador del Mockup):** Guiar al equipo explicando la estructura visual, asegurar fidelidad con el diseño original y garantizar que la interfaz sea 100% responsivo (adaptable a celulares y computadoras).
    *   **Desarrolladores Frontend (2):** Apoyar en la maquetación HTML/CSS (usando Bootstrap o Tailwind) de la página de registro, la pantalla de "Éxito al registrarse" y la integración de estilos globales.

### 🗄️ Equipo Backend A: Base de Datos y Panel Admin (2 Personas)
*   **Misión:** Crear los cimientos de la plataforma en Django y preparar la gestión de datos.
*   **Responsabilidades:**
    *   Escribir el modelo de la base de datos en `models.py` con todos los campos necesarios (Nombres, Correo, LinkedIn, CV en PDF, Carrera, etc.).
    *   Configurar y personalizar el **Panel de Administración** de Django en `admin.py` incluyendo barras de búsqueda, vistas de tablas legibles y filtros por carrera para facilitar el uso a las organizadoras de la WIE Week.
    *   Gestionar las migraciones de la base de datos (`makemigrations` y `migrate`) y dar de alta el primer *superuser*.

### 🔌 Equipo Backend B: Lógica, Formularios y Despliegue (2 Personas)
*   **Misión:** Conectar la interfaz con el servidor, validar datos y subir la aplicación a internet.
*   **Responsabilidades:**
    *   Crear el formulario de Django en `forms.py` y conectarlo con las vistas (`views.py`) para procesar el envío de datos y gestionar la subida de archivos (guardar los PDFs de los CVs).
    *   Implementar validaciones de seguridad y formato (por ejemplo, asegurar que el enlace de LinkedIn sea una URL válida que empiece por `https://linkedin.com/`).
    *   Configurar el entorno inicial del proyecto (Git, `.gitignore`, `requirements.txt`) y, en la fase final, encargarse del despliegue a producción (en plataformas como Render o Railway) para que el sitio sea público.

---

## 💡 Flujo de Trabajo para el Desarrollo

Para evitar conflictos en Git y trabajar de manera eficiente, seguiremos este orden:

1.  **Paso 1 (Configuración Inicial - Backend B):** Se creará el repositorio de GitHub con un proyecto de Django limpio, el entorno virtual base y el archivo `.gitignore`. Una vez subido, todos los integrantes clonarán el proyecto.
2.  **Paso 2 (Desarrollo en Paralelo - Backend A y Frontend):** 
    *   Mientras el **Equipo Backend A** define los modelos y activa el panel de administración.
    *   El **Equipo Frontend** maquetará las vistas en HTML puro basándose estrictamente en el Mockup aprobado.
3.  **Paso 3 (Integración - Backend B y Frontend):** El **Equipo Backend B** tomará los archivos HTML del equipo de Frontend, los transformará en plantillas de Django, los conectará a la lógica de las vistas y habilitará el guardado de datos en la BD.
4.  **Paso 4 (Pruebas y Despliegue):** Se testeará el flujo completo junto a las organizadoras de la WIE Week en el panel de administración y se realizará el despliegue final a producción.
