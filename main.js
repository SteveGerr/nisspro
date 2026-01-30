// Слайдер
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // Функция для показа текущего слайда
    function showSlide(index) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Показываем текущий слайд
        slides[index].classList.add('active');
        currentSlide = index;
    }

    // Функция для следующего слайда
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    // Функция для предыдущего слайда
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    }

    // Автопереключение слайдов
    let slideInterval = setInterval(nextSlide, 5000);

    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', function () {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    prevBtn.addEventListener('click', function () {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Инициализация первого слайда
    showSlide(0);

    // Обработка кликов по контактам
    const addressLink = document.querySelector('.contact-address');
    const phoneLink = document.querySelector('.contact-phone');

    // Для адреса - переход на Яндекс.Карты
    addressLink.addEventListener('click', function (e) {
        // В реальном проекте здесь будет ссылка на конкретный адрес
        console.log('Переход на Яндекс.Карты с адресом: Москва, ул. Автосервисная, д. 15');
    });

    // Для телефона - вызов
    phoneLink.addEventListener('click', function (e) {
        // В реальном проекте на мобильных устройствах это вызовет набор номера
        console.log('Инициирован вызов по номеру: +7 (495) 123-45-67');
    });
});