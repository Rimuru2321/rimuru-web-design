/* 1️⃣ PRELOADER */

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity .6s ease";
    setTimeout(() => preloader.style.display = "none", 600);
  }, 800);
});


/* 2️⃣ ANIMACIONES SCROLL (Optimizado) */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".card, .box, .project")
  .forEach(el => observer.observe(el));


/* 3️⃣ MODAL PRO */

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-content">
    <span id="close">&times;</span>
    <img id="modal-img" src="">
    <p id="modal-text"></p>
  </div>
`;

document.body.appendChild(modal);

const modalImg = modal.querySelector("#modal-img");
const modalText = modal.querySelector("#modal-text");
const closeBtn = modal.querySelector("#close");

document.querySelectorAll(".project.card").forEach(project => {
  project.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = project.querySelector("img").src;
    modalText.textContent = project.querySelector("strong").textContent;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});


/* 4️⃣ TYPEWRITER PRO */

const headerP = document.querySelector("header p");
const text = headerP.textContent;
let index = 0;
headerP.textContent = "";

function typeWriter() {
  if (index < text.length) {
    headerP.textContent += text[index];
    index++;
    setTimeout(typeWriter, 55);
  }
}
window.addEventListener("load", typeWriter);


/* 5️⃣ BOTÓN VOLVER ARRIBA */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 300);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* 6️⃣ CURSOR PERSONALIZADO */

const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* INTRO REMOVE */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
  }, 2500);
});

/* TOAST NOTIFICATION */

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* EMAILJS */

(function(){
  emailjs.init("YSVM1c2U0tYbzYhaZ");
})();


const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const btn = form.querySelector("button");
  btn.disabled = true;
  btn.textContent = "Enviando...";

  emailjs.sendForm("service_8dg4hn8", "template_pqzilmo", this)
  .then(() => {
  showToast("Solicitud enviada correctamente 🔥", "success");
  this.reset();
})
.catch(() => {
  showToast("Error al enviar. Intenta nuevamente.", "error");
});
});
