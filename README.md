# Mi Proyecto — Plantilla básica

Sitio estático de una sola página con un formulario de contacto validado.
No usa dependencias ni requiere build: HTML, CSS y JavaScript puro.

## Estructura

```
open/
├── index.html          Página principal (cabecera + formulario + pie)
├── css/
│   └── styles.css      Tokens de diseño, layout y estilos del formulario
├── js/
│   └── form.js         Validación en vivo y envío del formulario
├── .gitignore
└── README.md
```

## Cómo verlo

Abre `index.html` con doble clic, o levanta un servidor local (recomendado):

```bash
# Opción 1: Python (ya viene en macOS/Linux; en Windows instala Python)
python -m http.server 8000

# Opción 2: Node.js
npx serve .
```

Luego visita <http://localhost:8000>.

## Cómo funciona el formulario

- **Campos validados**: nombre, correo (formato), asunto, mensaje (mínimo 10 caracteres) y aceptación de privacidad.
- **Momento de validación**: al salir del campo; si el campo ya muestra error, se revalida mientras escribes.
- **Errores accesibles**: `aria-invalid` en el control, mensaje asociado por `id="error-<campo>"` y foco automático en el primer campo inválido al enviar.
- **Estado de envío**: el botón se deshabilita y muestra «Enviando…»; el aviso usa `role="status"` para lectores de pantalla.

## Conectar un backend real

En `js/form.js`, dentro de la función `enviar(datos)`, reemplaza la simulación:

```js
const respuesta = await fetch('/api/contacto', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(datos)
});

if (!respuesta.ok) throw new Error('No se pudo enviar');
```

Los nombres de los campos enviados son: `nombre`, `apellido`, `email`, `asunto`, `mensaje`, `privacidad`.

## Personalizar

| Quiero cambiar… | Dónde |
| --- | --- |
| Colores, radios, sombras | Variables en `:root` de `css/styles.css` |
| Campos o textos de ayuda | `index.html` (bloque `<form>`) |
| Reglas de validación | Objeto `reglas` en `js/form.js` |
| Ancho máximo de la tarjeta | `.tarjeta { max-width }` en `css/styles.css` |

Si agregas un campo nuevo, añade también su `<p class="campo__error" id="error-<name>">` y su regla en `reglas`.

## Próximos pasos posibles

- Enlazar la política de privacidad a una página real.
- Añadir protección antispam (honeypot o captcha).
- Convertir en multi-página o montar un framework si el proyecto crece.
