document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar los elementos del formulario
    const contactForm = document.getElementById('contactForm');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const mensajeInput = document.getElementById('mensaje');
    const formMessage = document.getElementById('formMessage');
    
    // --- (NUEVO) Seleccionar el elemento del contador ---
    const contador = document.getElementById('contador');

    if (!contactForm) {
        return;
    }

    // --- (NUEVO) Lógica para el mensaje dinámico del contador ---
    // Este evento se dispara cada vez que el usuario escribe o borra en el campo de mensaje
    mensajeInput.addEventListener('input', () => {
        const longitudActual = mensajeInput.value.length;
        const longitudMaxima = mensajeInput.maxLength;

        // Actualiza el texto del contador en tiempo real
        contador.textContent = `${longitudActual}/${longitudMaxima}`;
    });


    // Lógica de validación al enviar el formulario (esto ya lo tenías)
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        formMessage.innerHTML = '';
        
        const isNombreValid = validateRequired(nombreInput);
        const isCorreoValid = validateEmail(correoInput);
        const isMensajeValid = validateRequired(mensajeInput);

        if (isNombreValid && isCorreoValid && isMensajeValid) {
            formMessage.innerHTML = '<div class="alert alert-success mt-3">¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</div>';
            contactForm.reset();
            
            // Reiniciar contador al enviar
            contador.textContent = `0/${mensajeInput.maxLength}`;
            
            nombreInput.classList.remove('is-valid');
            correoInput.classList.remove('is-valid');
            mensajeInput.classList.remove('is-valid');
        }
    });

    // --- Funciones de Validación (sin cambios) ---
    function validateRequired(input) {
        if (input.value.trim() === '') {
            setError(input, 'Este campo es obligatorio.');
            return false;
        }
        setSuccess(input);
        return true;
    }

    function validateEmail(input) {
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

    function setError(input, message) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.innerText = message;
        }
    }

    function setSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.innerText = '';
        }
    }
});
