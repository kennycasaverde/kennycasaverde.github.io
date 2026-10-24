# Portafolio profesional — Kenny Casaverde (V1.0)

Sitio web **100 % estático** (HTML, CSS y JavaScript). No necesita servidor propio, base de datos, instalaciones de paquetes ni servicios pagos. Preparado para GitHub Pages.

## Archivos principales

- `index.html`: portada con trayectoria, formación y competencias.
- `experiencia.html`: ficha individual de cada experiencia laboral, con galería opcional.
- `styles.css`: diseño adaptable a computadoras y celulares.
- `app.js`: muestra los datos y permite abrir fotografías y videos.
- **`data.js`: ARCHIVO QUE EDITARÁS** para cambiar información, enlaces, certificados y evidencias.
- `assets/evidencias/`: fotografías, videos y documentos por empresa.
- `assets/certificados/`: certificados **comprobados**.
- `assets/CV_Kenny_Casaverde_Publico.pdf`: versión pública de tu CV, sin DNI ni teléfono.
- `.nojekyll`: evita que GitHub Pages omita archivos sin procesamiento Jekyll.

## Publicar en GitHub Pages sin pagar

1. Entra en https://github.com/ y crea una cuenta gratuita si todavía no tienes una.
2. En la esquina superior derecha, pulsa **+** → **New repository**.
3. Pon como nombre **TUUSUARIO.github.io**, sustituyendo TUUSUARIO por tu nombre de usuario exacto de GitHub. Por ejemplo, si tu nombre es `kennycasaverde`, será `kennycasaverde.github.io` (el nombre es solo un ejemplo; no damos por hecho que tengas ese usuario).
4. Selecciona **Public** y crea el repositorio con **Create repository**. No hace falta agregar archivos de ejemplo.
5. Descomprime el ZIP descargado. En el repositorio pulsa **Add file → Upload files**. Arrastra **el contenido que está dentro** de `Portafolio_Kenny_V1/` (no la carpeta contenedora). Debes ver `index.html` y `data.js` en la raíz del repositorio, junto con `assets/`.
6. Pulsa **Commit changes** (según la interfaz puede aparecer el cuadro de confirmación del commit).
7. Abre **Settings → Pages**. En **Build and deployment → Source** elige **Deploy from a branch**. En **Branch** selecciona **main**, carpeta **/(root)**, y pulsa **Save**.
8. Cuando se complete la publicación, entra en `https://TUUSUARIO.github.io/` o usa el botón **Visit site** de Pages. Los cambios pueden tardar unos minutos.

> Importante: no debes subir el archivo ZIP en sí. **Descomprímelo** y sube los archivos y subcarpetas que contiene. Conserva la estructura.

## Ver la web en tu computadora

Abre `index.html` con doble clic en un navegador. Es un sitio sin dependencias, así que no necesitas ejecutar comandos. La publicación oficial se hará desde GitHub Pages.

## Adjuntar fotografías o documentos a tus empleos (sin programar)

### Caso práctico: agregar una foto al empleo en Chancay

1. Verifica que la foto pueda publicarse: autorización del empleador y ausencia de pantallas, sistemas o datos internos confidenciales. Evita imágenes con identidades, credenciales, matrículas, IP y otros datos sensibles.
2. Nombra el archivo, por ejemplo `reunion-equipo.jpg`.
3. En GitHub, ve a **assets → evidencias → chancay** y pulsa **Add file → Upload files**. Sube la foto y confirma con **Commit changes**. Alternativamente, desde tu computadora, reemplaza el archivo correspondiente y vuelve a cargarlo.
4. Abre **data.js**, pulsa el icono del lápiz y localiza `id: "chancay"` → `evidence: []`.
5. Sustituye el contenido del array (que actualmente contiene comentarios) por un objeto como este:

```js
      evidence: [
        {
          type: "image",
          src: "assets/evidencias/chancay/reunion-equipo.jpg",
          title: "Actividad de coordinación",
          description: "Fotografía autorizada de una actividad profesional."
        }
      ]
```

6. Guarda con **Commit changes**. Al entrar en **Ver experiencia** aparecerá la sección de evidencias, la tarjeta con miniatura y un visor ampliable al hacer clic.

**Para añadir más fotografías**: sepáralas con comas dentro del mismo array `evidence`. Los proyectos se mostrarán siempre con el mismo diseño, sin cambiar HTML o CSS.

### Videos

**Opción recomendada — YouTube:** sube el video a tu canal de YouTube (público o no listado) y agrega al array del empleo:

```js
{ type: "youtube", url: "https://www.youtube.com/watch?v=ID_REAL_DEL_VIDEO", title: "Demostración autorizada", description: "Breve descripción del registro" }
```

**Video local liviano:** también se acepta `{ type: "video", src: "assets/evidencias/chancay/video.mp4", title: "Descripción del video" }` pero evita videos pesados: GitHub limita las cargas desde el navegador y GitHub Pages es para sitios estáticos.

> YouTube no listado no significa privado: cualquier persona con el enlace puede verlo. No subas material interno ni sin autorización.

### PDF o constancias

Sube el documento a la carpeta del puesto correspondiente y agrega:

```js
{ type: "pdf", src: "assets/evidencias/chancay/constancia.pdf", title: "Constancia laboral", description: "Constancia autorizada para publicación" }
```

Para **Geoingenieros** usa `assets/evidencias/geoingenieros/` y `id: "geoingenieros"`. Para **Artesco** usa `assets/evidencias/artesco/` y `id: "artesco"`.

Si `evidence` está vacío, **la página oculta por completo la galería** y el resultado sigue viéndose profesional, sin cuadros vacíos.

## Enlace «Empresas»

En `data.js`, busca:

```js
companiesUrl: "",
```

Y reemplázalo por:

```js
companiesUrl: "https://www.ejemplo.com/",
```

El botón **Empresas** pasará automáticamente de estar deshabilitado a abrir el enlace.

## Certificaciones

Agrega solamente certificados que efectivamente tengas y puedas compartir. En `data.js`, dentro de `certifications: []`, incluye por ejemplo:

```js
certifications: [
  { title: "Nombre real del certificado", issuer: "Institución que lo otorgó", year: "2026", url: "assets/certificados/certificado.pdf" }
]
```

Primero sube el PDF a `assets/certificados/`. La sección de certificaciones **aparecerá automáticamente** en la portada cuando exista al menos un registro.

Los cursos de tu CV están visibles como **formación complementaria**, pero no se etiquetan como certificados hasta que proporciones la acreditación.

## Actualizar información profesional

Edita `data.js` dentro del objeto correspondiente. El texto se mostrará automáticamente sin necesidad de cambiar `index.html` o `experiencia.html`.

## Privacidad y seguridad

- El PDF público incluido omite **DNI y teléfono**. Conserva el CV original exclusivamente de forma privada si contiene información personal sensible.
- GitHub Pages publica el contenido del repositorio. Nunca subas credenciales, información interna, fotos restringidas, manuales de empresa o datos de terceros sin autorización.
- Las imágenes de las evidencias **no están incluidas** en V1. Los repositorios de proyectos personales no aparecen porque todavía no quieres publicarlos.
- Los enlaces sociales proporcionados por el propietario están configurados; el botón Empresas queda pendiente.
- GitHub conserva historial de versiones. Si publicas datos privados por error, borrarlos del último commit no siempre elimina las copias del historial.

## Soporte técnico y cambios visuales

Este sitio no utiliza paquetes, frameworks, API keys, formularios ni bases de datos. Puedes compartir el ZIP o el repositorio para solicitar futuras versiones V1.1, V1.2, etc.
