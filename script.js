const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
const serviceSelect = document.querySelector("#service-select");
const form = document.querySelector("#consultation-form");
const brandIntro = document.querySelector("#brand-intro");
const skipIntro = document.querySelector(".intro-skip");

document.body.classList.add("intro-active");

function finishIntro() {
  if (!brandIntro || brandIntro.classList.contains("is-leaving")) return;
  brandIntro.classList.add("is-leaving");
  document.body.classList.remove("intro-active");
  window.setTimeout(() => brandIntro.remove(), 850);
}

const introTimer = window.setTimeout(finishIntro, 3400);

skipIntro?.addEventListener("click", () => {
  window.clearTimeout(introTimer);
  finishIntro();
});

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-package]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.package;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  form.querySelector(".form-success").classList.add("show");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
