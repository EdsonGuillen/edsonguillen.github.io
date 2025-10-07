// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar los elementos del formulario
    const contactForm = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('mensaje');
    const formMessage = document.getElementById('formMessage');

    // Si el formulario no existe en la página, detener el script para evitar errores.
    if (!contactForm) {
        return;
    }

    // Añadir un "escuchador" para el evento 'submit' del formulario
    contactForm.addEventListener('submit', (event) => {
        // Prevenir el envío por defecto del formulario para validarlo primero
        event.preventDefault();
        
        // Ocultar mensajes previos de éxito/error
        formMessage.innerHTML = '';

        // Validar los campos y guardar el resultado (true si es válido, false si no)
        const isNombreValid = validateRequired(nombreInput);
        const isCorreoValid = validateEmail(correoInput);
        const isMensajeValid = validateRequired(mensajeInput);

        // Si todos los campos son válidos...
        if (isNombreValid && isCorreoValid && isMensajeValid) {
            // Mostrar mensaje de éxito
            formMessage.innerHTML = '<div class="alert alert-success mt-3">¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</div>';
            
            // Limpiar el formulario y los estilos de validación
            contactForm.reset();
            nombreInput.classList.remove('is-valid');
            correoInput.classList.remove('is-valid');
            mensajeInput.classList.remove('is-valid');
            
            // En un caso real, aquí se enviaría el formulario usando fetch()
        }
    });

    // --- FUNCIONES DE VALIDACIÓN ---

    // Función para validar campos obligatorios
    function validateRequired(input) {
        if (input.value.trim() === '') {
            setError(input, 'Este campo es obligatorio.');
            return false;
        }
        setSuccess(input);
        return true;
    }

    // Función para validar el formato del correo electrónico
    function validateEmail(input) {
        // Expresión regular para validar un email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (input.value.trim() === '') {
            setError(input, 'Este campo es obligatorio.');
            return false;
        } else if (!emailRegex.test(input.value.trim())) {
            setError(input, 'Por favor, introduce un correo electrónico válido.');
            return false;
        }
        setSuccess(input);
        return true;
    }

    // --- FUNCIONES AUXILIARES PARA MOSTRAR/QUITAR ERRORES ---

    function setError(input, message) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        const feedback = input.nextElementSibling;
        if (feedback.classList.contains('invalid-feedback')) {
            feedback.innerText = message;
        }
    }

    function setSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid'); // Bootstrap lo pinta de verde
        const feedback = input.nextElementSibling;
        if (feedback.classList.contains('invalid-feedback')) {
            feedback.innerText = '';
        }
    }
});