// Código JavaScript para el carrusel de imágenes y donadores
// Carrusel de imágenes
let currentIndex = 0;
    
function moveSlide(direction) {
    const carousel = document.getElementById('carousel');
    const images = carousel.querySelectorAll('img');
    const imageWidth = images[0].offsetWidth + 10; // 250px + 10px margen derecho
    const visibleWidth = document.querySelector('.carousel-container').offsetWidth;
    const totalWidth = imageWidth * images.length;

    // Número de imágenes visibles a la vez
    const visibleCount = Math.floor(visibleWidth / imageWidth);

    // Mover el índice en esa cantidad
    currentIndex += direction;

    // Límite inferior y superior
    if (currentIndex < 0) currentIndex = 0;
    if ((currentIndex + visibleCount) * imageWidth > totalWidth) {
        currentIndex = images.length - visibleCount;
    }

    // Aplicar transformación
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Donadores

let donadorIndex = 0;

function moveDonadorSlide(direction) {
    const carousel = document.getElementById('donadores-carousel');
    const cards = carousel.querySelectorAll('.donador-card');
    const cardWidth = cards[0].offsetWidth + 20; // Incluye gap
    const visibleWidth = document.querySelector('.donadores-container').offsetWidth;

    const visibleCards = Math.floor(visibleWidth / cardWidth);
    donadorIndex += direction;

    const maxIndex = cards.length - visibleCards;
    if (donadorIndex < 0) donadorIndex = 0;
    if (donadorIndex > maxIndex) donadorIndex = maxIndex;

    carousel.style.transform = `translateX(-${donadorIndex * cardWidth}px)`;
}

// Código JavaScript para el menú de navegación
