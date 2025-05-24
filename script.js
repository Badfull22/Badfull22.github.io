// Generador de ID personalizado
function generateNewId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"

  let letterPart = ""
  let numberPart = ""

  // Generar 5 letras aleatorias
  for (let i = 0; i < 5; i++) {
    letterPart += letters.charAt(Math.floor(Math.random() * letters.length))
  }

  // Generar 5 números aleatorios
  for (let i = 0; i < 5; i++) {
    numberPart += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }

  const newId = letterPart + "-" + numberPart
  document.getElementById("user-id").textContent = newId

  // Animación de cambio
  const idDisplay = document.getElementById("user-id")
  idDisplay.style.transform = "scale(1.2)"
  setTimeout(() => {
    idDisplay.style.transform = "scale(1)"
  }, 200)
}

// Navegación móvil
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Efecto navbar al hacer scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Formulario de crew
function toggleForm() {
  const formOverlay = document.getElementById("form-overlay")
  formOverlay.classList.toggle("active")

  if (formOverlay.classList.contains("active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
}

// Cerrar formulario con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const formOverlay = document.getElementById("form-overlay")
    if (formOverlay.classList.contains("active")) {
      toggleForm()
    }
  }
})

// Manejar envío del formulario
document.getElementById("crew-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = {
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono"),
    habilidad: formData.get("habilidad"),
  }

  // Simular envío
  alert("¡Solicitud enviada! Te contactaremos pronto para unirte a L.P.D.F")
  toggleForm()
  e.target.reset()
})

// Crear partículas animadas
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 6 + "s"
    particle.style.animationDuration = Math.random() * 3 + 3 + "s"

    // Colores aleatorios
    const colors = ["#ff6b35", "#00d4ff", "#ff0080"]
    particle.style.background = colors[Math.floor(Math.random() * colors.length)]

    particlesContainer.appendChild(particle)
  }
}

// Animaciones de entrada al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observar elementos para animaciones
document.addEventListener("DOMContentLoaded", () => {
  // Generar ID inicial
  generateNewId()

  // Crear partículas
  createParticles()

  // Configurar animaciones de scroll
  const animatedElements = document.querySelectorAll(".tag-card, .product-card, .crew-content")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(50px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Efecto parallax sutil
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero-background")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Efecto de typing para el título (opcional)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Efectos de hover mejorados
document.querySelectorAll(".tag-card, .product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})
