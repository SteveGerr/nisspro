

        // Cookie management
    const COOKIE_KEY = 'cookie_consent';
    const CONSENT_EXPIRY_DAYS = 180; // 6 months

    function setCookieConsent(consent) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
        localStorage.setItem(COOKIE_KEY, JSON.stringify({
            value: consent,
            expiry: expiryDate.toISOString()
        }));
    }

    function getCookieConsent() {
        const stored = localStorage.getItem(COOKIE_KEY);
        if (!stored) return null;

        try {
            const data = JSON.parse(stored);
            if (new Date(data.expiry) < new Date()) {
                localStorage.removeItem(COOKIE_KEY);
                return null;
            }
            return data.value;
        } catch(e) {
            return null;
        }
    }

    function hasConsent() {
        const consent = getCookieConsent();
        return consent === true;
    }

    // Load Yandex Map only after consent
    let mapInitialized = false;
    let ymapsReady = false;

    function loadYandexMap() {
        if (mapInitialized) return;

        const mapDiv = document.getElementById('yandex-map');
        const placeholder = document.getElementById('mapPlaceholder');

        if (!mapDiv) return;

        // Show loading state
        placeholder.style.display = 'flex';
        mapDiv.style.display = 'none';

        // Load Yandex Maps API dynamically
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=404390fd-d112-4870-adb0-8edde96edbb3&lang=ru_RU';
        script.type = 'text/javascript';
        script.onload = function() {
            ymaps.ready(function() {
                initMap();
                mapInitialized = true;
                placeholder.style.display = 'none';
                mapDiv.style.display = 'block';
            });
        };
        script.onerror = function() {
            placeholder.innerHTML = '<i class="fas fa-exclamation-triangle"></i><p>Ошибка загрузки карты. Пожалуйста, обновите страницу.</p>';
        };
        document.head.appendChild(script);
    }

    function initMap() {
        const DARK_MAP = 'custom#dark';
        ymaps.layer.storage.add(DARK_MAP, function DarkLayer() {
            return new ymaps.Layer(
            'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&theme=dark&%c&%l&scale={{ scale }}'
            );
        });

        // 2. Регистрируем новый тип карты
        ymaps.mapType.storage.add(DARK_MAP, new ymaps.MapType('Dark Map', [DARK_MAP]));
        // Координаты автосервиса
        const center = [53.199417, 50.152565];

        // Создание карты
        const map = new ymaps.Map('yandex-map', {
            center: center,
            zoom: 17,
            controls: ['zoomControl', 'fullscreenControl'],
            type: 'custom#dark'
        });

        // Создание метки
        const placemark = new ymaps.Placemark(center, {
            hintContent: 'NissPro - автосервис',
            balloonContent: `
                <div class="map-balloon">
                    <strong>NissPro</strong><br>
                    Профессиональный автосервис<br>
                    пр. Карла Маркса, 30А<br>
                    Телефон: +7 (927) 295-30-30
                </div>
                <div class="map-balloon-img">
                    <img src="images/facade.jpg" alt="NissPro">
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

    function showCookieBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.add('show');
        }
    }

    function hideCookieBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    function acceptCookies() {
        setCookieConsent(true);
        hideCookieBanner();
        loadYandexMap();
    }

    function declineCookies() {
        setCookieConsent(false);
        hideCookieBanner();
        // Map stays as placeholder
    }

    function showPrivacyModal() {
        const modal = document.getElementById('privacyModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    function hidePrivacyModal() {
        const modal = document.getElementById('privacyModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    function showSettingsModal() {
        // Simple settings dialog
        const currentConsent = hasConsent();
        const message = currentConsent
            ? 'Вы уже приняли использование cookie. Хотите отозвать согласие?\n\nНажмите "ОК", чтобы отозвать согласие, или "Отмена" для отмены.'
            : 'Вы еще не приняли использование cookie. Хотите принять?\n\nНажмите "ОК", чтобы принять, или "Отмена" для отмены.';

        if (confirm(message)) {
            if (currentConsent) {
                // Revoke consent
                localStorage.removeItem(COOKIE_KEY);
                alert('Согласие отозвано. Карта будет скрыта при следующем посещении страницы. Обновите страницу.');
                location.reload();
            } else {
                // Accept consent
                acceptCookies();
                alert('Cookie приняты. Карта загрузится.');
            }
        }
    }

    // Initialize on page load
    const consent = getCookieConsent();

    if (consent === true) {
        // User already accepted
        hideCookieBanner();
        loadYandexMap();
    } else if (consent === false) {
        // User declined
        hideCookieBanner();
        // Map stays as placeholder
    } else {
        // First visit - show banner
        showCookieBanner();
    }

    // Event listeners
    document.getElementById('cookieAccept')?.addEventListener('click', acceptCookies);
    document.getElementById('cookieDecline')?.addEventListener('click', declineCookies);
    document.getElementById('cookieSettings')?.addEventListener('click', showSettingsModal);
    document.getElementById('cookieSettingsFooter')?.addEventListener('click', showSettingsModal);
    document.getElementById('acceptForMapBtn')?.addEventListener('click', acceptCookies);
    document.getElementById('privacyLink')?.addEventListener('click', function(e) {
        e.preventDefault();
        showPrivacyModal();
    });

    // Modal close
    document.querySelector('.privacy-modal-close')?.addEventListener('click', hidePrivacyModal);
    document.getElementById('privacyModal')?.addEventListener('click', function(e) {
        if (e.target === this) hidePrivacyModal();
    });
