/* ============================================
   Incolmotos Yamaha Pereira
   JavaScript Principal - Design System (variante)
   ============================================ */

(function () {
    'use strict';

    function buildWhatsAppURL(message) {
        var number = window.YamahaComponents ? window.YamahaComponents.config.whatsapp : '573012914481';
        return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
    }

    // ---- Sticky Header ----
    function initStickyHeader() {
        var header = document.getElementById('header');
        if (!header) return;

        function handleScroll() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // ---- Mobile Menu ----
    function initMobileMenu() {
        var hamburger = document.getElementById('hamburger');
        var nav = document.getElementById('nav');
        if (!hamburger || !nav) return;

        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        nav.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Catalog Filters (category + price + cc + year + sort + view) ----
    function initFilters() {
        var filterButtons = document.querySelectorAll('.filter-btn');
        var motoCards = Array.from(document.querySelectorAll('.moto-card'));
        var grid = document.getElementById('catalogGrid');
        if (filterButtons.length === 0 || !grid) {
            // Legacy fallback: filter by category only (for older pages)
            if (filterButtons.length === 0) return;
            filterButtons.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var f = this.getAttribute('data-filter');
                    filterButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
                    motoCards.forEach(function (c) {
                        c.classList.toggle('hidden', f !== 'todas' && c.getAttribute('data-category') !== f);
                    });
                });
            });
            return;
        }

        var priceInput = document.getElementById('filterPrice');
        var ccInput = document.getElementById('filterCc');
        var yearSelect = document.getElementById('filterYear');
        var sortSelect = document.getElementById('sortBy');
        var priceValue = document.getElementById('priceValue');
        var ccValue = document.getElementById('ccValue');
        var resultsCount = document.getElementById('resultsCount');
        var noResults = document.getElementById('noResults');
        var viewGrid = document.getElementById('viewGrid');
        var viewList = document.getElementById('viewList');
        var clearBtn = document.getElementById('clearFilters');

        var state = {
            category: 'todas',
            maxPrice: priceInput ? +priceInput.max : Infinity,
            maxCc: ccInput ? +ccInput.max : Infinity,
            year: 'todos',
            sort: 'default'
        };
        var originalOrder = motoCards.slice();

        function formatCOP(n) {
            return '$ ' + n.toLocaleString('es-CO');
        }

        function updateLabels() {
            if (priceValue && priceInput) {
                priceValue.textContent = (+priceInput.value >= +priceInput.max)
                    ? 'Sin límite'
                    : 'Hasta ' + formatCOP(+priceInput.value);
            }
            if (ccValue && ccInput) {
                ccValue.textContent = (+ccInput.value >= +ccInput.max)
                    ? 'Todos'
                    : 'Hasta ' + ccInput.value + ' CC';
            }
        }

        function applyAll() {
            var visible = 0;
            motoCards.forEach(function (card) {
                var cat = card.getAttribute('data-category');
                var price = +card.getAttribute('data-price') || 0;
                var cc = +card.getAttribute('data-cc') || 0;
                var year = card.getAttribute('data-year');
                var ok =
                    (state.category === 'todas' || cat === state.category) &&
                    price <= state.maxPrice &&
                    cc <= state.maxCc &&
                    (state.year === 'todos' || year === state.year);
                card.classList.toggle('hidden', !ok);
                if (ok) visible++;
            });

            // Sort
            var key = state.sort;
            var sorted = originalOrder.slice();
            if (key !== 'default') {
                sorted.sort(function (a, b) {
                    if (key === 'price-asc')  return +a.dataset.price - +b.dataset.price;
                    if (key === 'price-desc') return +b.dataset.price - +a.dataset.price;
                    if (key === 'cc-asc')     return +a.dataset.cc - +b.dataset.cc;
                    if (key === 'cc-desc')    return +b.dataset.cc - +a.dataset.cc;
                    if (key === 'name-asc')   return (a.dataset.name || '').localeCompare(b.dataset.name || '', 'es');
                    return 0;
                });
                sorted.forEach(function (c) { grid.appendChild(c); });
            } else {
                originalOrder.forEach(function (c) { grid.appendChild(c); });
            }

            if (resultsCount) {
                resultsCount.textContent = visible + (visible === 1 ? ' motocicleta' : ' motocicletas');
            }
            if (noResults) noResults.hidden = visible > 0;
        }

        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                state.category = this.getAttribute('data-filter');
                filterButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
                applyAll();
            });
        });

        if (priceInput) priceInput.addEventListener('input', function () {
            state.maxPrice = +this.value >= +this.max ? Infinity : +this.value;
            updateLabels(); applyAll();
        });
        if (ccInput) ccInput.addEventListener('input', function () {
            state.maxCc = +this.value >= +this.max ? Infinity : +this.value;
            updateLabels(); applyAll();
        });
        if (yearSelect) yearSelect.addEventListener('change', function () {
            state.year = this.value; applyAll();
        });
        if (sortSelect) sortSelect.addEventListener('change', function () {
            state.sort = this.value; applyAll();
        });

        if (viewGrid && viewList) {
            viewGrid.addEventListener('click', function () {
                grid.classList.remove('catalog__grid--list');
                viewGrid.classList.add('active'); viewList.classList.remove('active');
            });
            viewList.addEventListener('click', function () {
                grid.classList.add('catalog__grid--list');
                viewList.classList.add('active'); viewGrid.classList.remove('active');
            });
        }

        if (clearBtn) clearBtn.addEventListener('click', function () {
            state.category = 'todas';
            filterButtons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-filter') === 'todas'); });
            if (priceInput) { priceInput.value = priceInput.max; state.maxPrice = Infinity; }
            if (ccInput) { ccInput.value = ccInput.max; state.maxCc = Infinity; }
            if (yearSelect) { yearSelect.value = 'todos'; state.year = 'todos'; }
            if (sortSelect) { sortSelect.value = 'default'; state.sort = 'default'; }
            updateLabels(); applyAll();
        });

        // Initial state: support URL hash (#deportiva)
        var hash = window.location.hash.replace('#', '');
        if (hash) {
            var btn = document.querySelector('.filter-btn[data-filter="' + hash + '"]');
            if (btn) {
                state.category = hash;
                filterButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
            }
        }
        updateLabels();
        applyAll();
    }

    // ---- Color Selector ----
    function initColorSelector() {
        var colorDots = document.querySelectorAll('.color-dot');
        if (colorDots.length === 0) return;

        colorDots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                var targetId = this.getAttribute('data-target');
                var newImage = this.getAttribute('data-image');
                var newColor = this.getAttribute('data-color');
                var imgElement = document.getElementById(targetId);
                if (!imgElement) return;

                var container = this.closest('.moto-card__colors, .product-gallery__colors');
                if (!container) container = this.parentElement;
                if (container) {
                    container.querySelectorAll('.color-dot').forEach(function (d) {
                        d.classList.remove('active');
                    });
                }
                this.classList.add('active');

                imgElement.classList.add('changing');
                setTimeout(function () {
                    imgElement.src = newImage;
                    imgElement.alt = 'Yamaha ' + newColor;
                    imgElement.classList.remove('changing');
                }, 200);

                // Update CTA button color
                var card = this.closest('.moto-card');
                if (card) {
                    var ctaBtn = card.querySelector('.moto-card__cta');
                    if (ctaBtn) ctaBtn.setAttribute('data-color', newColor);
                }

                var productCta = document.getElementById('productCta');
                if (productCta) {
                    productCta.setAttribute('data-color', newColor);
                }
            });
        });
    }

    // ---- WhatsApp Links ----
    function initWhatsAppLinks() {
        // Moto card CTA buttons
        document.querySelectorAll('.moto-card__cta').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var model = this.getAttribute('data-model');
                var color = this.getAttribute('data-color');
                var message = 'Hola, estoy interesado en la Yamaha ' + model + ' color ' + color + '. ¿Me pueden dar más información?';
                window.open(buildWhatsAppURL(message), '_blank');
            });
        });

        // Service card CTA buttons
        document.querySelectorAll('.service-card__cta').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var service = this.getAttribute('data-service');
                var message = 'Hola, estoy interesado en el servicio de ' + service + '. ¿Me pueden dar más información?';
                window.open(buildWhatsAppURL(message), '_blank');
            });
        });

        // Hero CTA
        var heroCotizar = document.getElementById('heroCotizar');
        if (heroCotizar) {
            heroCotizar.addEventListener('click', function (e) {
                e.preventDefault();
                var message = 'Hola, visité su página web y me gustaría agendar un test ride.';
                window.open(buildWhatsAppURL(message), '_blank');
            });
        }

        // Floating WhatsApp
        var whatsappFloat = document.getElementById('whatsappFloat');
        if (whatsappFloat) {
            whatsappFloat.addEventListener('click', function (e) {
                e.preventDefault();
                var message = 'Hola, visité su página web y me gustaría recibir asesoría.';
                window.open(buildWhatsAppURL(message), '_blank');
            });
        }

        // Product page CTA
        var productCta = document.getElementById('productCta');
        if (productCta) {
            productCta.addEventListener('click', function () {
                var model = this.getAttribute('data-model');
                var color = this.getAttribute('data-color');
                var message = 'Hola, estoy interesado en la Yamaha ' + model + ' color ' + color + '. ¿Me pueden dar más información y disponibilidad?';
                window.open(buildWhatsAppURL(message), '_blank');
            });
        }
    }

    // ---- Contact Form → WhatsApp ----
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nombre = form.querySelector('[name="nombre"]');
            var email = form.querySelector('[name="email"]');
            var telefono = form.querySelector('[name="telefono"]');
            var asunto = form.querySelector('[name="asunto"]');
            var mensaje = form.querySelector('[name="mensaje"]');
            var consent = form.querySelector('[name="habeas"]');

            if (consent && !consent.checked) {
                alert('Debes aceptar la política de tratamiento de datos personales para continuar.');
                return;
            }

            var text = 'Hola, me contacto desde el formulario web.\n\n';
            if (nombre) text += '*Nombre:* ' + nombre.value + '\n';
            if (email) text += '*Email:* ' + email.value + '\n';
            if (telefono && telefono.value) text += '*Teléfono:* ' + telefono.value + '\n';
            if (asunto) text += '*Asunto:* ' + asunto.value + '\n';
            if (mensaje) text += '*Mensaje:* ' + mensaje.value;

            window.open(buildWhatsAppURL(text), '_blank');
        });
    }

    // ---- Newsletter Form ----
    function initNewsletter() {
        var form = document.getElementById('newsletterForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = form.querySelector('input[type="email"]');
            var consent = form.querySelector('input[type="checkbox"]');

            if (consent && !consent.checked) {
                alert('Debes aceptar la política de privacidad para suscribirte.');
                return;
            }

            var message = 'Hola, me gustaría suscribirme al newsletter. Mi correo es: ' + email.value;
            window.open(buildWhatsAppURL(message), '_blank');
        });
    }

    // ---- Smooth Scroll ----
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ---- Scroll Reveal (usa clase .reveal / .revealed para respetar prefers-reduced-motion) ----
    function initScrollReveal() {
        var elements = document.querySelectorAll('.moto-card, .service-card, .bento__card, .feature-card, .why-item, .contact-info-item, .category-card, .page-section__grid');
        if (elements.length === 0) return;
        if (!('IntersectionObserver' in window)) {
            elements.forEach(function (el) { el.classList.add('revealed'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        var vh = window.innerHeight || document.documentElement.clientHeight;
        elements.forEach(function (el, i) {
            var rect = el.getBoundingClientRect();
            // Above-the-fold: mostrar inmediato sin animar (evita banda blanca al cargar).
            if (rect.top < vh * 0.9) {
                el.classList.add('reveal', 'reveal--instant', 'revealed');
                return;
            }
            el.classList.add('reveal');
            el.style.transitionDelay = (Math.min(i, 6) * 40) + 'ms';
            observer.observe(el);
        });
    }

    // ---- Moto Card: compactar acciones (CTA principal + WhatsApp icónico) ----
    function initMotoCardActions() {
        document.querySelectorAll('.moto-card__info').forEach(function (info) {
            if (info.querySelector('.moto-card__actions')) return;
            var primary = info.querySelector('a.btn--primary');
            var cta = info.querySelector('.moto-card__cta');
            if (!primary || !cta) return;

            // Limpia margen inline del ficha button y hace el WhatsApp icono
            primary.style.marginBottom = '0';

            // Guarda aria-label con el texto original antes de ocultarlo
            var txt = cta.textContent.trim();
            if (!cta.getAttribute('aria-label')) cta.setAttribute('aria-label', txt || 'Cotizar por WhatsApp');

            var wrap = document.createElement('div');
            wrap.className = 'moto-card__actions';
            primary.parentNode.insertBefore(wrap, primary);
            wrap.appendChild(primary);
            wrap.appendChild(cta);
        });
    }

    // ---- Hero Slider (home) ----
    function initHeroSlider() {
        var bg = document.getElementById('heroBg');
        if (!bg) return;
        var slides = bg.querySelectorAll('.hero-slide');
        var dots = bg.querySelectorAll('.hero__dot');
        if (slides.length < 2) return;

        var idx = 0;
        var timer;
        function go(n) {
            idx = (n + slides.length) % slides.length;
            slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
            dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
        }
        function start() { timer = setInterval(function () { go(idx + 1); }, 6000); }
        function stop() { clearInterval(timer); }

        dots.forEach(function (d, i) {
            d.addEventListener('click', function () { go(i); stop(); start(); });
        });

        // Pausa con reduced motion
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        start();

        // Pausar al salir de pestaña
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stop(); else start();
        });
    }

    // ---- Initialize ----
    function initAll() {
        setTimeout(function () {
            initStickyHeader();
            initMobileMenu();
            initFilters();
            initColorSelector();
            initWhatsAppLinks();
            initContactForm();
            initNewsletter();
            initSmoothScroll();
            initScrollReveal();
            initHeroSlider();
            initMotoCardActions();
        }, 10);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

})();
