// Esperar a que el contenido de la página esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar el formulario y sus campos por sus IDs
    const reservaForm = document.getElementById('reservaForm');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const fechaInput = document.getElementById('fecha');
    const formMessage = document.getElementById('formMessage');

    // Detener la ejecución si el formulario no se encuentra en la página
    if (!reservaForm) {
        return;
    }

    // Escuchar el evento 'submit' del formulario
    reservaForm.addEventListener('submit', (event) => {
        // Evitar que el formulario se envíe de la manera tradicional
        event.preventDefault();

        // Limpiar mensajes de éxito anteriores
        formMessage.innerHTML = '';

        // Realizar la validación de cada campo
        const esNombreValido = validarCampoRequerido(nombreInput, 'El nombre es obligatorio.');
        const esCorreoValido = validarCorreo(correoInput);
        const esFechaValida = validarCampoRequerido(fechaInput, 'Por favor, selecciona una fecha.');

        // Si todos los campos son válidos, mostrar éxito
        if (esNombreValido && esCorreoValido && esFechaValida) {
            formMessage.innerHTML = `<div class="alert alert-success">¡Reserva enviada! Gracias por tu interés, te contactaremos pronto.</div>`;
            reservaForm.reset(); // Limpiar el formulario
            // Quitar las clases de validación para un nuevo envío
            reservaForm.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid');
            });
        }
    });

    // --- FUNCIONES DE VALIDACIÓN ---

    // Valida que un campo no esté vacío
    function validarCampoRequerido(input, mensajeError) {
        if (input.value.trim() === '') {
            mostrarError(input, mensajeError);
            return false;
        }
        mostrarExito(input);
        return true;
    }

    // Valida el formato del correo electrónico
    function validarCorreo(input) {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value.trim() === '') {
            mostrarError(input, 'El correo electrónico es obligatorio.');
            return false;
        } else if (!regexCorreo.test(input.value.trim())) {
            mostrarError(input, 'El formato del correo no es válido.');
            return false;
        }
        mostrarExito(input);
        return true;
    }

    // --- FUNCIONES AUXILIARES PARA MOSTRAR ESTILOS ---

    // Función para mostrar el estado de error
    function mostrarError(input, mensaje) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        const divError = input.nextElementSibling;
        divError.innerText = mensaje;
    }

    // Función para mostrar el estado de éxito
    function mostrarExito(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        const divError = input.nextElementSibling;
        divError.innerText = '';
    }
});