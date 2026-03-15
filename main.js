

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
    });

    // Для телефона - вызов
    phoneLink.addEventListener('click', function (e) {
        // В реальном проекте на мобильных устройствах это вызовет набор номера
    });

        // Бургер-меню
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    function closeMenu() {
        burgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Закрытие меню при клике на ссылку
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие меню при изменении размера окна (на десктопе)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

        // Инициализация Яндекс карты
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(initMap);
    }

    function initMap() {
        // Координаты автосервиса
        const center = [53.199417, 50.152565];

        // Создание карты
        const map = new ymaps.Map('yandex-map', {
            center: center,
            zoom: 17,
            controls: ['zoomControl', 'fullscreenControl']
        });

        // Создание метки
        const placemark = new ymaps.Placemark(center, {
            hintContent: 'НиссПро - автосервис',
            balloonContent: `
                <div class="map-balloon">
                    <strong>НиссПро</strong><br>
                    Профессиональный автосервис<br>
                    пр. Карла Маркса, 30А<br>
                    Телефон: +7 (927) 295-30-30
                </div>
            `
        }, {
            iconLayout: 'default#image',
            // iconImageHref: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
            iconImageHref: './images/nissPro-logo-svg.svg',
            iconImageSize: [30, 40],
            iconImageOffset: [-20, -60],

        });

        // Добавление метки на карту
        map.geoObjects.add(placemark);

        // Добавление кнопки "Построить маршрут"
        const routeButton = document.createElement('a');
        routeButton.href = `https://yandex.ru/maps/?rtext=~${center[0]},${center[1]}&rtp=auto`;
        routeButton.target = '_blank';
        routeButton.className = 'map-route-button';
        routeButton.innerHTML = '<i class="fas fa-route"></i> Построить маршрут';

        document.querySelector('.map-container').appendChild(routeButton);
    }
});