<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recaptchaSecret = "6LcWbpMrAAAAAOzRfCYPQj0fQdpCBFZn6MeoF_Fl";
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Validar reCAPTCHA con Google
    $verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    $data = [
        'secret' => $recaptchaSecret,
        'response' => $recaptchaResponse
    ];

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context  = stream_context_create($options);
    $verify = file_get_contents($verifyUrl, false, $context);
    $captchaSuccess = json_decode($verify);

    if ($captchaSuccess->success) {
        // Obtener y sanitizar los datos
        $nombre = htmlspecialchars(trim($_POST['nombre']));
        $correo = filter_var(trim($_POST['correo']), FILTER_SANITIZE_EMAIL);
        $mensaje = htmlspecialchars(trim($_POST['mensaje']));

        // Aquí podrías guardar los datos o enviar un correo
        echo "Mensaje verificado y recibido correctamente.";
    } else {
        echo "Falló la verificación del reCAPTCHA.";
    }
}
?>
