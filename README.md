# 🚀 Sistema de Registro de Talentos - WIE Week ESPOL

¡Bienvenido al repositorio oficial del **Sistema de Registro de Talentos** desarrollado para la **WIE Week** en colaboración con el **IEEE Computer Society ESPOL Student Chapter**!

Este sistema web interactivo por pasos (Multi-step Form) permite a los estudiantes registrar sus perfiles profesionales, áreas de interés técnico, enlaces de LinkedIn/GitHub y adjuntar su CV en formato PDF. El backend está construido sobre **Django**, procesando las solicitudes de forma asíncrona mediante **AJAX (Fetch API)** para garantizar una experiencia de usuario rápida, fluida y segura.
# 🚀 Sistema de Registro de Talentos - WIE Week ESPOL

¡Bienvenido al repositorio oficial del **Sistema de Registro de Talentos** desarrollado para la **WIE Week** en colaboración con el **IEEE Computer Society ESPOL Student Chapter**!

Este sistema web interactivo por pasos (Multi-step Form) permite a los estudiantes registrar sus perfiles profesionales, áreas de interés técnico, enlaces de LinkedIn/GitHub y adjuntar su CV en formato PDF. El backend está construido sobre **Django**, procesando las solicitudes de forma asíncrona mediante **AJAX (Fetch API)** para garantizar una experiencia de usuario rápida, fluida y segura.

---

## 📋 Requisitos Previos

Antes de levantar el proyecto, asegúrate de tener instalado lo siguiente en tu máquina local:

- **Python 3.10 o superior**
- **Git**
- Un editor de código (recomendado **VS Code**)

---

## 🛠️ Instrucciones de Instalación y Configuración Local

Sigue estos pasos en orden exacto desde tu terminal para clonar, configurar y ejecutar el proyecto en tu entorno de desarrollo.

### 1. Clonar el Repositorio

Descarga el proyecto desde GitHub y muévete al directorio raíz:

```bash
git clone https://github.com/[tu-usuario]/ieee_event_talent_db.git
cd ieee_event_talent_db
```

> **Nota:** Asegúrate de estar parado en la carpeta raíz donde se encuentra el archivo `manage.py`.

---

### 2. Crear y Activar el Entorno Virtual

Crea un entorno virtual de Python llamado `env` para mantener las dependencias aisladas:

**En Windows (PowerShell / CMD):**

```powershell
python -m venv env
.\env\Scripts\Activate.ps1
```

> Si PowerShell muestra un error de ejecución de scripts, usa: `.\env\Scripts\activate.bat`

**En macOS / Linux:**

```bash
python3 -m venv env
source env/bin/activate
```

Al activarlo, tu terminal mostrará el prefijo `(env)`.

---

### 3. Instalar las Dependencias

Con el entorno virtual activo, instala todas las librerías necesarias:

```bash
pip install -r requirements.txt
```

---

### 4. Construir la Base de Datos (Migraciones)

Genera el archivo local SQLite y construye la estructura de tablas del sistema:

```bash
python manage.py makemigrations talents
python manage.py migrate
```

---

### 5. Crear el Usuario Administrador (Superuser)

Para acceder al panel de control, gestionar registros y descargar datos:

```bash
python manage.py createsuperuser
```

La terminal te pedirá un nombre de usuario, correo electrónico y contraseña. Los caracteres de la contraseña no se mostrarán en pantalla; escríbela con confianza y presiona **Enter**.

---

## 🌟 Configuración Obligatoria del Panel Administrativo

> ⚠️ La base de datos se inicializa completamente vacía. Es **mandatorio** poblar los catálogos antes del primer registro de prueba para evitar errores de integridad de datos.

1. Inicia el servidor local:
   ```bash
   python manage.py runserver
   ```

2. Abre el panel de administración: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

3. Inicia sesión con las credenciales del Superuser creado anteriormente.

4. En la sección **Talents**, agrega los siguientes registros **en el orden exacto indicado**:

**Tabla "Áreas de Interés" (`AreaInteres`) — 6 opciones:**

| # | Nombre |
|---|--------|
| 1 | Inteligencia Artificial |
| 2 | Desarrollo Web |
| 3 | Desarrollo Mobile |
| 4 | Data Science |
| 5 | Ciberseguridad |
| 6 | Otro |

**Tabla "Tipos de Oportunidades" (`TipoOportunidad`) — 3 opciones:**

| # | Nombre |
|---|--------|
| 1 | Pasantías |
| 2 | Trabajo medio tiempo |
| 3 | Jornada completa |

---

## 🚀 Ejecutar el Proyecto en Desarrollo

Una vez completada la configuración de los catálogos, el sistema está **100% operativo**.

1. Inicia el servidor (si lo detuviste):
   ```bash
   python manage.py runserver
   ```

2. Abre el formulario en tu navegador:
   👉 [http://127.0.0.1:8000/registro/](http://127.0.0.1:8000/registro/)

3. Llena los datos, selecciona tus áreas de interés, adjunta un CV en PDF y presiona **"Enviar datos"**. Verás la barra de carga, el mensaje personalizado y la redirección automática a la pantalla de éxito.

---

## ⚙️ Estructura del Proyecto (Módulos Críticos)

| Archivo | Descripción |
|---------|-------------|
| `talents/models.py` | Define la estructura relacional de Talentos, Áreas de Interés y Oportunidades. Maneja la carga segura de archivos organizados por fecha (`upload_to='cvs/%Y/%m/%d/'`), compatible con Windows. |
| `talents/forms.py` | Contiene las reglas estrictas de validación de negocio en el backend (limpieza y verificación de URLs de LinkedIn y GitHub). |
| `talents/views.py` | Procesa el flujo asíncrono asimilando objetos `FormData` (textos + archivos binarios) y retorna respuestas estructuradas en `JsonResponse`. |
| `talents/static/talents/script.js` | Orquesta las validaciones del cliente, gestiona los estados de los pasos del formulario (Paso 1, 2 y 3), renderiza el nombre del PDF cargado y ejecuta la petición asíncrona al servidor. |

---

## 📊 Entrega de Datos a Sponsors

El proyecto integra nativamente el módulo de reportes ejecutivos mediante **`django-import-export`**.

Al ingresar al panel `/admin/` y seleccionar la tabla de **Talentos**, los organizadores dispondrán de un botón **"Exportar"** que permite descargar la nómina completa en formatos listos para consumo corporativo:

- **Excel (`.xlsx`)**
- **CSV**

La exportación incluye enlaces directos a los currículums y datos de contacto de forma automatizada.

---

*Desarrollado con dedicación por el equipo tecnológico de la FIEC - ESPOL. 2026.*
