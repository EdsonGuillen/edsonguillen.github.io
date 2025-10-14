<?php
// Primero, verificamos que los datos se hayan enviado por el método POST.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Recoger y limpiar los datos del formulario.
    // Usamos htmlspecialchars para prevenir ataques XSS (Cross-Site Scripting).
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $correo = htmlspecialchars(trim($_POST['correo']));
    $fecha = htmlspecialchars(trim($_POST['fecha']));

    // 2. Validar los datos (validación del lado del servidor).
    // Es una buena práctica validar también en el servidor, aunque ya lo hagas con JS.
    if (empty($nombre) || !filter_var($correo, FILTER_VALIDATE_EMAIL) || empty($fecha)) {
        // Si algún dato es inválido, se detiene el script.
        http_response_code(400); // Bad Request
        echo "Hubo un error con los datos enviados. Por favor, verifica el formulario.";
        exit;
    }

    // 3. Preparar el correo electrónico.
    $destinatario = "tu-correo@ejemplo.com"; // <-- ¡CAMBIA ESTO A TU CORREO REAL!
    $asunto = "Nueva Reserva de Visita de: " . $nombre;

    $cuerpo_mensaje = "Has recibido una nueva solicitud de reserva:\n\n";
    $cuerpo_mensaje .= "Nombre: " . $nombre . "\n";
    $cuerpo_mensaje .= "Correo Electrónico: " . $correo . "\n";
    $cuerpo_mensaje .= "Fecha solicitada: " . $fecha . "\n\n";
    $cuerpo_mensaje .= "Por favor, contacta a esta persona para confirmar la disponibilidad.";

    // 4. Configurar las cabeceras del correo.
    // Esto ayuda a que el correo no sea marcado como spam.
    $headers = "From: no-reply@tu-sitio-web.com" . "\r\n" .
               "Reply-To: " . $correo . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // 5. Enviar el correo.
    if (mail($destinatario, $asunto, $cuerpo_mensaje, $headers)) {
        // Si el correo se envió con éxito.
        http_response_code(200); // OK
        echo "¡Reserva enviada! Gracias, te contactaremos pronto.";
    } else {
        // Si hubo un error al enviar el correo.
        http_response_code(500); // Internal Server Error
        echo "Lo sentimos, hubo un problema al enviar tu reserva. Inténtalo más tarde.";
    }

} else {
    // Si alguien intenta acceder al script directamente sin enviar datos.
    http_response_code(403); // Forbidden
    echo "Acceso no permitido.";
}
?>