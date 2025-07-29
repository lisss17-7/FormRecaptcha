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

  // Obtener y sanitizar los datos
  const nombre = escapeHTML(form.nombre.value.trim());
  const correo = escapeHTML(form.correo.value.trim());
  const mensaje = escapeHTML(form.mensaje.value.trim());

  // Validación extra (redundante por HTML5)
  if (nombre.length < 2 || mensaje.length < 10 || !correo.includes("@")) {
    responseDiv.textContent = "Por favor, completa todos los campos correctamente.";
    responseDiv.style.color = "red";
    return;
  }

  // Simulación de envío de datos
  responseDiv.textContent = "Mensaje enviado con éxito. ¡Gracias!";
  responseDiv.style.color = "green";
  form.reset();
});
