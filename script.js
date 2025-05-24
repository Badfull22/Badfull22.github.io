// Generate random ID with format aaaaa-xxxxx
function generateRandomId() {
  const letters = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"

  let letterPart = ""
  let numberPart = ""

  // Generate 5 random letters
  for (let i = 0; i < 5; i++) {
    letterPart += letters.charAt(Math.floor(Math.random() * letters.length))
  }

  // Generate 5 random numbers
  for (let i = 0; i < 5; i++) {
    numberPart += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }

  return `${letterPart}-${numberPart}`
}

// Update ID display
function updateIdDisplay() {
  const idDisplay = document.getElementById("userIdDisplay")
  const newId = generateRandomId()

  // Add animation effect
  idDisplay.style.transform = "scale(0.8)"
  idDisplay.style.opacity = "0.5"

  setTimeout(() => {
    idDisplay.textContent = newId
    idDisplay.style.transform = "scale(1)"
    idDisplay.style.opacity = "1"
  }, 150)
}

// Initialize with random ID on page load
document.addEventListener("DOMContentLoaded", () => {
  updateIdDisplay()

  // Add click event to generate button
  document.getElementById("generateIdBtn").addEventListener("click", updateIdDisplay)
})

// Smooth scrolling for navigation links
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

// Form submission handler
document.querySelector(".join-form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simple validation
  if (!data.nombre || !data.telefono || !data.habilidad || !data.descripcion) {
    showNotification("Por favor, completa todos los campos.", "error")
    return
  }

  // Simulate form submission
  showNotification("¡Formulario enviado exitosamente! Te contactaremos pronto.", "success")
  this.reset()
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "100px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  })

  // Set background color based on type
  if (type === "success") {
    notification.style.background = "linear-gradient(135deg, #10b981, #059669)"
  } else if (type === "error") {
    notification.style.background = "linear-gradient(135deg, #ef4444, #dc2626)"
  } else {
    notification.style.background = "linear-gradient(135deg, #6366f1, #4f46e5)"
  }

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 4000)
}

// Active navigation link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".form-container, .id-card, .coming-soon, .hero-image-placeholder")
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll")
    observer.observe(el)
  })
})

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add hover effects to form inputs
document.querySelectorAll(".form-group input, .form-group textarea").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)"
  })

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)"
  })
})
