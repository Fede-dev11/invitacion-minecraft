const envoltura = document.querySelector(".envoltura");
const carta = document.querySelector(".carta");

document.addEventListener("click", (e) => {
  if (e.target.matches(".envoltura") ||
      e.target.matches(".solder") ||
      e.target.matches(".solizq")){
      envoltura.classList.toggle("abierto");
      envoltura.classList.add("desactivar-envoltura");

    if(!carta.classList.contains("abierta")){
      setTimeout(() => {
        carta.classList.add("mostrar-carta");

          setTimeout(() => {
            carta.classList.remove("mostrar-carta");
            carta.classList.add("abierta");
          }, 500);
        }, 1000);
      }
    } else if (e.target.matches(".envoltura * ") && !e.target.closest(".carta")){
      envoltura.classList.remove("abierto");
      envoltura.classList.remove("desactivar-envoltura");

      if(carta.classList.contains("abierta")){
        carta.classList.add("cerrando-carta");

        setTimeout (() => {
          carta.classList.remove("cerrando-carta");
          carta.classList.remove("abierta")
        }, 500)
      }
    }
})

const btnSi = document.querySelector(".btn-si");
const btnNo = document.querySelector(".btn-no");
const confirmacion = document.querySelector(".confirmacion");
const btnAceptar = document.querySelector(".btn-aceptar");
const rechazo = document.querySelector(".rechazo");
const btnConfirmarNo = document.querySelector(".btn-confirmar-no");
const invitacionDiscord = "https://discord.gg/jvFtMcezP";
const proxyDiscord = "https://invitacion-poxy.fernandoprogra.workers.dev";

function enviarMensajeDiscord(mensaje) {
  return fetch(proxyDiscord, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: mensaje })
  }).catch((error) => {
    console.error("No se pudo enviar el mensaje a Discord", error);
  });
}

btnSi.addEventListener("click", (e) => {
  e.stopPropagation();
  btnSi.style.display = "none";
  btnNo.style.display = "none";
  carta.classList.add("formulario-abierto");
  confirmacion.style.display = "flex";
});

confirmacion.addEventListener("click", (e) => {
  e.stopPropagation();
});

rechazo.addEventListener("click", (e) => {
  e.stopPropagation();
});

const inputNombre = document.querySelector(".input-nombre");
const inputUsername = document.querySelector(".input-username");
const inputNombreNo = document.querySelector(".input-nombre-no");

btnAceptar.addEventListener("click", async (e) => {
  e.stopPropagation();

  const nombre = inputNombre.value.trim();
  const username = inputUsername.value.trim();

  if (!nombre || !username) {
    alert("Por favor escribe tu nombre y tu usuario de Minecraft antes de aceptar.");
    return;
  }

  await enviarMensajeDiscord(`✅ ¡Acepté la invitación! Soy **${nombre}** y mi Usuario de Minecraft: **${username}**. Nos vemos el martes o miercoles agosto a las 7:00 o 8:00 PM 🎉`);
  window.location.href = invitacionDiscord;
});

btnNo.addEventListener("click", (e) => {
  e.stopPropagation();
  btnSi.style.display = "none";
  btnNo.style.display = "none";
  carta.classList.add("formulario-abierto");
  rechazo.style.display = "flex";
});

btnConfirmarNo.addEventListener("click", async (e) => {
  e.stopPropagation();

  const nombreNo = inputNombreNo.value.trim();
  if (!nombreNo) {
    alert("Por favor escribe tu nombre antes de enviar.");
    return;
  }

  alert("¡No hay problema! De igual forma nos encantaría tenerte en el server 💜");
  await enviarMensajeDiscord(`❌ Soy **${nombreNo}** y no puede unirme por ahora, ¡pero gracias por la invitación! 💜`);
  window.location.href = invitacionDiscord;
});
