

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






        // ========== ПАРАЛЛАКС ЭФФЕКТ ==========
    const layer1 = document.getElementById('layer1');
    // const layer2 = document.getElementById('layer2');
    // const layer3 = document.getElementById('layer3');

    function updateParallax() {
        let scrollY = window.scrollY;
        // Скорости: чем меньше множитель, тем медленнее (эффект глубины)
        // слой1 (дальний) скорость 0.2, слой2 0.4, слой3 0.6
        // let y1 = scrollY * 0.15;
        // let y2 = scrollY * 0.75;
        // let y3 = scrollY * 0.55;

        // if(layer1) layer1.style.transform = `translateY(${y1}px) scale(1.05)`;
        // if(layer2) layer2.style.transform = `translateY(${y2}px) scale(1.02)`;
        // if(layer3) layer3.style.transform = `translateY(${y3}px) scale(1)`;
    }

    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    updateParallax();
});