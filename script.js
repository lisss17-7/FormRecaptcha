const form = document.getElementById("secureForm");
const responseDiv = document.getElementById("responseMessage");

function escapeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = escapeHTML(form.nombre.value.trim());
  const correo = escapeHTML(form.correo.value.trim());
  const mensaje = escapeHTML(form.mensaje.value.trim());
  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    responseDiv.textContent = "Por favor verifica el reCAPTCHA.";
    responseDiv.style.color = "red";
    return;
  }

  if (nombre.length < 2 || mensaje.length < 10 || !correo.includes("@")) {
    responseDiv.textContent = "Por favor, completa todos los campos correctamente.";
    responseDiv.style.color = "red";
    return;
  }

  // Aquí deberías enviar los datos al servidor para validar el reCAPTCHA (ver abajo)
  responseDiv.textContent = "Mensaje enviado con éxito. ¡Gracias!";
  responseDiv.style.color = "green";
  form.reset();
  grecaptcha.reset(); // reinicia el widget de reCAPTCHA
});
