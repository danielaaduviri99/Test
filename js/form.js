/**
 * Validación y envío del formulario de contacto.
 * Sin dependencias: JavaScript moderno de navegador.
 */
(function () {
  'use strict';

  const form = document.getElementById('formulario-contacto');
  if (!form) return;

  const aviso = document.getElementById('form-aviso');
  const boton = form.querySelector('button[type="submit"]');

  /** Reglas de validación: nombre del campo -> función que devuelve true/false. */
  const reglas = {
    nombre: (valor) => valor.trim().length > 0,
    email: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim()),
    asunto: (valor) => valor !== '',
    mensaje: (valor) => valor.trim().length >= 10,
    privacidad: (valor, el) => el.checked
  };

  function validarCampo(nombre) {
    const el = form.elements[nombre];
    const error = document.getElementById('error-' + nombre);
    const esValido = reglas[nombre](el.value, el);

    el.setAttribute('aria-invalid', String(!esValido));
    if (error) error.classList.toggle('is-visible', !esValido);

    return esValido;
  }

  function limpiarErrores() {
    Object.keys(reglas).forEach((nombre) => {
      form.elements[nombre].removeAttribute('aria-invalid');
      const error = document.getElementById('error-' + nombre);
      if (error) error.classList.remove('is-visible');
    });
    aviso.classList.remove('is-visible', 'aviso--error');
  }

  // Validación en vivo: al salir del campo y, si ya falló, al escribir.
  Object.keys(reglas).forEach((nombre) => {
    const el = form.elements[nombre];
    const eventoInicial = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'blur';

    el.addEventListener(eventoInicial, () => validarCampo(nombre));
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') validarCampo(nombre);
    });
  });

  /**
   * Envío de los datos.
   * Sustituye la simulación por tu API real:
   *
   *   const respuesta = await fetch('/api/contacto', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify(datos)
   *   });
   *   if (!respuesta.ok) throw new Error('No se pudo enviar');
   */
  async function enviar(datos) {
    await new Promise((resolver) => setTimeout(resolver, 600));
    console.log('Datos listos para enviar:', datos);
  }

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    aviso.classList.remove('is-visible', 'aviso--error');

    const invalidos = Object.keys(reglas).filter((nombre) => !validarCampo(nombre));

    if (invalidos.length > 0) {
      form.elements[invalidos[0]].focus();
      return;
    }

    const datos = Object.fromEntries(new FormData(form).entries());

    boton.disabled = true;
    const textoOriginal = boton.textContent;
    boton.textContent = 'Enviando…';

    try {
      await enviar(datos);
      aviso.textContent = '¡Gracias' + (datos.nombre ? ', ' + datos.nombre : '') +
        '! Tu mensaje fue enviado.';
      aviso.classList.add('is-visible');
      form.reset();
      limpiarErrores();
    } catch (error) {
      console.error(error);
      aviso.textContent = 'No pudimos enviar tu mensaje. Intenta de nuevo.';
      aviso.classList.add('is-visible', 'aviso--error');
    } finally {
      boton.disabled = false;
      boton.textContent = textoOriginal;
    }
  });
})();
