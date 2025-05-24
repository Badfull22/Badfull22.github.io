// Configuración de la webhook
const WEBHOOK_URL = "https://tu-webhook-url.com/endpoint" // Cambia esta URL por tu webhook real

// Generar ID único y persistente
function generateUniqueId() {
  // Verificar si ya existe un ID en localStorage
  const existingId = localStorage.getItem("badfull_user_id")

  if (existingId) {
    return existingId
  }

  // Generar nuevo ID único
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

  // Agregar timestamp para mayor unicidad
  const timestamp = Date.now().toString().slice(-3)
  numberPart = numberPart.slice(0, 2) + timestamp

  const newId = letterPart + "-" + numberPart

  // Guardar en localStorage
  localStorage.setItem("badfull_user_id", newId)

  return newId
}

// Obtener IP del usuario
async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.log("Error obteniendo IP:", error)
    try {
      // Backup API
      const response = await fetch("https://ipapi.co/json/")
      const data = await response.json()
      return data.ip
    } catch (backupError) {
      console.log("Error con backup IP:", backupError)
      return "No disponible"
    }
  }
}

// Obtener información adicional del usuario
async function getUserInfo() {
  try {
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      timezone: data.timezone,
      isp: data.org,
    }
  } catch (error) {
    console.log("Error obteniendo info del usuario:", error)
    const ip = await getUserIP()
    return {
      ip: ip,
      city: "No disponible",
      region: "No disponible",
      country: "No disponible",
      timezone: "No disponible",
      isp: "No disponible",
    }
  }
}

// Enviar datos a webhook
async function sendToWebhook(formData, userId, userInfo) {
  const payload = {
    timestamp: new Date().toISOString(),
    user_id: userId,
    form_data: {
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono"),
      habilidad: formData.get("habilidad"),
    },
    user_info: userInfo,
    source: "Badfull Website - LPDF Crew Registration",
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      return { success: true, message: "Datos enviados correctamente" }
    } else {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error("Error enviando a webhook:", error)
    return { success: false, message: "Error al enviar los datos" }
  }
}

// Navegación móvil
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

if (hamburger && navMenu) {
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
}

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
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }
})

// Formulario de crew
function toggleForm() {
  const formOverlay = document.getElementById("form-overlay")
  if (formOverlay) {
    formOverlay.classList.toggle("active")

    if (formOverlay.classList.contains("active")) {
      document.body.style.overflow = "hidden"
      // Actualizar ID en el formulario
      const formUserId = document.getElementById("form-user-id")
      const userId = document.getElementById("user-id").textContent
      if (formUserId && userId) {
        formUserId.textContent = userId
      }
    } else {
      document.body.style.overflow = "auto"
    }
  }
}

// Cerrar formulario con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const formOverlay = document.getElementById("form-overlay")
    if (formOverlay && formOverlay.classList.contains("active")) {
      toggleForm()
    }
  }
})

// Manejar envío del formulario
document.getElementById("crew-form")?.addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = document.getElementById("submit-btn")
  const originalText = submitBtn.textContent

  // Deshabilitar botón y mostrar loading
  submitBtn.disabled = true
  submitBtn.textContent = "ENVIANDO..."
  submitBtn.classList.add("loading")

  try {
    const formData = new FormData(e.target)
    const userId = document.getElementById("user-id").textContent

    // Obtener información del usuario
    const userInfo = await getUserInfo()

    // Agregar ID al formulario
    formData.set("user_id", userId)

    // Enviar a webhook
    const result = await sendToWebhook(formData, userId, userInfo)

    if (result.success) {
      alert("¡Solicitud enviada exitosamente! Te contactaremos pronto para unirte a L.P.D.F")
      toggleForm()
      e.target.reset()
    } else {
      alert("Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.")
    }
  } catch (error) {
    console.error("Error en el envío:", error)
    alert("Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.")
  } finally {
    // Restaurar botón
    submitBtn.disabled = false
    submitBtn.textContent = originalText
    submitBtn.classList.remove("loading")
  }
})

// Crear partículas animadas
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  if (!particlesContainer) return

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

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", async () => {
  // Generar y mostrar ID único
  const userId = generateUniqueId()
  const userIdElement = document.getElementById("user-id")
  const userIdHidden = document.getElementById("user-id-hidden")

  if (userIdElement) {
    userIdElement.textContent = userId
  }

  if (userIdHidden) {
    userIdHidden.value = userId
  }

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

  // Precargar información del usuario para mejorar la experiencia
  try {
    await getUserInfo()
    console.log("Información del usuario precargada")
  } catch (error) {
    console.log("Error precargando información del usuario:", error)
  }
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

// Efectos de hover mejorados
document.querySelectorAll(".tag-card, .product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Función global para el botón de unirse (llamada desde HTML)
window.toggleForm = toggleForm
