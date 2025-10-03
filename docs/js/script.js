// Código JavaScript para el carrusel de imágenes y donadores

// ========== CARRUSEL DE IMÁGENES DESDE GOOGLE DRIVE ==========
const DRIVE_API_URL = "https://script.google.com/macros/s/AKfycbxilY7G-BlORGiJH1gxmQ_vRmMZ6Ul9-2Z8cns-_pw0L1DvPR5D18Oa_sSQyqva_wI8/exec";

let currentIndex = 0;

// Cargar imágenes desde Google Drive cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    cargarImagenesDrive();
});

function cargarImagenesDrive() {
    fetch(DRIVE_API_URL)
        .then(res => res.json())
        .then(imageUrls => {
            const carousel = document.getElementById("carousel");
            
            if (!carousel) {
                console.error('No se encontró el elemento carousel');
                return;
            }
            
            carousel.innerHTML = "";
            
            if (imageUrls.length === 0) {
                carousel.innerHTML = "<p style='text-align: center; padding: 50px; color: #666;'>No hay imágenes disponibles</p>";
                return;
            }
            
            // Crear todas las imágenes
            imageUrls.forEach((url, i) => {
                const img = document.createElement("img");
                img.src = url;
                img.alt = `Alcanzados ${i + 1}`;
                img.loading = "lazy";
                img.onerror = function() {
                    console.error('Error cargando imagen:', url);
                    this.style.display = 'none';
                };
                carousel.appendChild(img);
            });
            
            console.log(`✅ ${imageUrls.length} imágenes cargadas correctamente`);
        })
        .catch(error => {
            console.error('❌ Error al cargar imágenes:', error);
            const carousel = document.getElementById("carousel");
            if (carousel) {
                carousel.innerHTML = 
                    "<p style='text-align: center; padding: 50px; color: #e74c3c;'>Error al cargar las imágenes. Por favor, intenta más tarde.</p>";
            }
        });
}

// Función para mover el carrusel de imágenes
function moveSlide(direction) {
    const carousel = document.getElementById('carousel');
    
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('img');
    
    if (images.length === 0) return;
    
    const imageWidth = images[0].offsetWidth + 10; // ancho + margen
    const container = document.querySelector('.carousel-container');
    
    if (!container) return;
    
    const visibleWidth = container.offsetWidth;
    const visibleCount = Math.floor(visibleWidth / imageWidth);

    currentIndex += direction;

    // Límites del carrusel
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    if (currentIndex > images.length - visibleCount) {
        currentIndex = Math.max(0, images.length - visibleCount);
    }

    // Aplicar transformación
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// ========== CARRUSEL DE DONADORES ==========
let donadorIndex = 0;

function moveDonadorSlide(direction) {
    const carousel = document.getElementById('donadores-carousel');
    
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.donador-card');
    
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 20; // Incluye gap
    const container = document.querySelector('.donadores-container');
    
    if (!container) return;
    
    const visibleWidth = container.offsetWidth;
    const visibleCards = Math.floor(visibleWidth / cardWidth);
    
    donadorIndex += direction;

    const maxIndex = cards.length - visibleCards;
    if (donadorIndex < 0) donadorIndex = 0;
    if (donadorIndex > maxIndex) donadorIndex = maxIndex;

    carousel.style.transform = `translateX(-${donadorIndex * cardWidth}px)`;
}

// ========== MENÚ DE NAVEGACIÓN RESPONSIVE ==========
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }
});