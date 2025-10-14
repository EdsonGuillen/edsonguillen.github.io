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
   

// Escuchar el evento 'submit' del formulario
reservaForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que se envíe de la manera tradicional
    formMessage.innerHTML = '';

    // Realizar la validación de cada campo
    const esNombreValido = validarCampoRequerido(nombreInput, 'El nombre es obligatorio.');
    const esCorreoValido = validarCorreo(correoInput);
    const esFechaValida = validarCampoRequerido(fechaInput, 'Por favor, selecciona una fecha.');

    // Si todos los campos son válidos en el lado del cliente...
    if (esNombreValido && esCorreoValido && esFechaValida) {
        
        // Crear un objeto con los datos del formulario
        const formData = new FormData(reservaForm);

        // Enviar los datos al script PHP usando fetch
        fetch('procesar_reserva.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Convertir la respuesta del PHP a texto
        .then(data => {
            // Mostrar la respuesta del PHP en el div de mensajes
            formMessage.innerHTML = `<div class="alert alert-success">${data}</div>`;
            reservaForm.reset(); // Limpiar el formulario
            reservaForm.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid');
            });
        })
        .catch(error => {
            // En caso de un error de red o del servidor
            formMessage.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor. Inténtalo más tarde.</div>`;
            console.error('Error:', error);
        });
    }
});


});

