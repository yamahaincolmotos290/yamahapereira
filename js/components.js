/* ============================================
   Incolmotos Yamaha Pereira
   Componentes Reutilizables - Design System (variante)
   ============================================ */

(function () {
    'use strict';

    /* --------------------------------------------------
       CONFIGURACIÓN DEL SITIO
       Todos los datos del negocio en un solo lugar.
    -------------------------------------------------- */
    var SiteConfig = {
        name: 'Incolmotos Yamaha Pereira',
        whatsapp: '573012914481',
        phone: '301 291 4481',
        address: 'Calle 19 Sur #10-23, Pereira, Risaralda',
        city: 'Pereira, Risaralda, Colombia',
        email: '',
        nit: '',
        mapsUrl: 'https://www.google.com/maps?q=Calle+19+Sur+%2310-23+Pereira+Risaralda&output=embed',
        schedule: [
            'Lunes a Sábado: 8:00 AM - 7:00 PM',
            'Domingos: Cerrado'
        ],
        social: {
            facebook: 'https://www.facebook.com/yamahamotorpereira/',
            instagram: 'https://www.instagram.com/yamahamotorpereira/',
            tiktok: null
        }
    };

    // Detectar si estamos en raíz o en pages/
    var isSubpage = window.location.pathname.indexOf('/pages/') !== -1;
    var basePath = isSubpage ? '../' : '';
    var pagesPath = isSubpage ? '' : 'pages/';

    // ---- HELPERS ----
    function buildWhatsAppURL(message) {
        return 'https://wa.me/' + SiteConfig.whatsapp + '?text=' + encodeURIComponent(message);
    }

    function socialLink(url, label, svgContent) {
        if (!url) return '';
        return '<a href="' + url + '" target="_blank" rel="noopener" aria-label="' + label + '" class="social-icon">' + svgContent + '</a>';
    }

    // ---- HEADER (Glassmorphism HUD) ----
    function renderHeader(currentPage) {
        var headerContainer = document.getElementById('site-header');
        if (!headerContainer) return;

        var navLinks = [
            { label: 'Inicio', href: basePath + 'index.html', id: 'inicio' },
            { label: 'Motocicletas', href: pagesPath + 'motocicletas.html', id: 'motocicletas' },
            { label: 'Servicios', href: pagesPath + 'servicios.html', id: 'servicios' },
            { label: 'Contacto', href: pagesPath + 'contacto.html', id: 'contacto' }
        ];

        var navHTML = navLinks.map(function (link) {
            var activeClass = (currentPage === link.id) ? ' nav__link--active' : '';
            return '<li><a href="' + link.href + '" class="nav__link' + activeClass + '">' + link.label + '</a></li>';
        }).join('');

        headerContainer.innerHTML =
            '<header class="header" id="header">' +
                '<div class="container header__inner">' +
                    '<a href="' + basePath + 'index.html" class="header__logo">' +
                        '<img src="' + basePath + 'img/yamaha-logo.jpg" alt="Yamaha" class="header__logo-yamaha" width="36" height="36">' +
                        '<span class="header__logo-text">' +
                            '<span class="header__logo-brand">YAMAHA</span>' +
                            '<span class="header__logo-accent">Incolmotos Yamaha</span>' +
                        '</span>' +
                    '</a>' +
                    '<nav class="nav" id="nav">' +
                        '<ul class="nav__list">' + navHTML + '</ul>' +
                    '</nav>' +
                    '<div style="display:flex;align-items:center;gap:0.75rem;">' +
                        '<a href="' + buildWhatsAppURL('Hola, visité su página web y me gustaría recibir asesoría.') + '" target="_blank" rel="noopener" class="header__cta header__cta-desktop header__cta--whatsapp">Asesoría por WhatsApp</a>' +
                        '<button class="hamburger" id="hamburger" aria-label="Abrir menú de navegación">' +
                            '<span class="hamburger__line"></span>' +
                            '<span class="hamburger__line"></span>' +
                            '<span class="hamburger__line"></span>' +
                        '</button>' +
                        '<button class="theme-toggle" id="themeToggle" aria-label="Cambiar tema claro/oscuro" title="Cambiar tema">' +
                            '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
                            '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</header>';
    }

    // ---- FOOTER (Simplified) ----
    function renderFooter() {
        var footerContainer = document.getElementById('site-footer');
        if (!footerContainer) return;

        var socialHTML =
            socialLink(SiteConfig.social.facebook, 'Facebook',
                '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>') +
            socialLink(SiteConfig.social.instagram, 'Instagram',
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>') +
            socialLink(SiteConfig.social.tiktok, 'TikTok',
                '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.22V9.4a8.16 8.16 0 0 0 3.84.96V7.16a4.85 4.85 0 0 1-0-.47z"/></svg>');

        footerContainer.innerHTML =
            '<footer class="footer">' +
                '<div class="container">' +
                    '<div class="footer__grid">' +
                        // Brand
                        '<div class="footer__brand">' +
                            '<div class="footer__brand-name">INCOLMOTOS YAMAHA PEREIRA</div>' +
                            '<p class="footer__brand-desc">Distribuidor autorizado Yamaha en el corazón del Eje Cafetero. Motocicletas nuevas, servicio técnico certificado y repuestos originales con respaldo de fábrica.</p>' +
                            '<div class="footer__badges">' +
                                '<span class="footer__badge"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>Distribuidor Autorizado</span>' +
                                '<span class="footer__badge"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v6c0 5 3.8 9.3 9 11 5.2-1.7 9-6 9-11V7l-9-5z"/></svg>Garantía Oficial</span>' +
                                '<span class="footer__badge"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Lun-Sáb 8AM-7PM</span>' +
                            '</div>' +
                            '<div class="footer__social">' + socialHTML + '</div>' +
                        '</div>' +
                        // Explora
                        '<div class="footer__links">' +
                            '<h4>Catálogo</h4>' +
                            '<ul>' +
                                '<li><a href="' + pagesPath + 'motocicletas.html">Motocicletas</a></li>' +
                                '<li><a href="' + pagesPath + 'servicios.html">Servicios</a></li>' +
                                '<li><a href="' + pagesPath + 'financiacion.html">Financiación</a></li>' +
                            '</ul>' +
                        '</div>' +
                        // Síguenos
                        '<div class="footer__links">' +
                            '<h4>Conéctate</h4>' +
                            '<ul>' +
                                (SiteConfig.social.facebook ? '<li><a href="' + SiteConfig.social.facebook + '" target="_blank" rel="noopener">Facebook</a></li>' : '') +
                                (SiteConfig.social.instagram ? '<li><a href="' + SiteConfig.social.instagram + '" target="_blank" rel="noopener">Instagram</a></li>' : '') +
                                (SiteConfig.social.tiktok ? '<li><a href="' + SiteConfig.social.tiktok + '" target="_blank" rel="noopener">TikTok</a></li>' : '') +
                            '</ul>' +
                        '</div>' +
                        // Pereira
                        '<div class="footer__links">' +
                            '<h4>Pereira</h4>' +
                            '<ul>' +
                                '<li>' + SiteConfig.address + '</li>' +
                                '<li>' + SiteConfig.schedule[0] + '</li>' +
                                '<li>' + SiteConfig.schedule[1] + '</li>' +
                                '<li><a href="tel:+57' + SiteConfig.whatsapp.replace('57', '') + '">Tel: ' + SiteConfig.phone + '</a></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                    '<div class="footer__bottom">' +
                        '<p>&copy; ' + new Date().getFullYear() + ' ' + SiteConfig.name + '. Pereira, Colombia.</p>' +
                        '<div class="footer__bottom-links">' +
                            '<a href="' + pagesPath + 'terminos-y-condiciones.html">Términos</a>' +
                            '<a href="' + pagesPath + 'politica-privacidad.html">Privacidad</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</footer>';
    }

    // ---- COOKIE BANNER (configurable por categorías) ----
    var COOKIE_KEY = 'yamaha_cookies_consent_v2';

    function getCookieConsent() {
        try {
            var raw = localStorage.getItem(COOKIE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    function setCookieConsent(obj) {
        localStorage.setItem(COOKIE_KEY, JSON.stringify(obj));
        window.dispatchEvent(new CustomEvent('yamahaConsentChange', { detail: obj }));
    }

    function renderCookieBanner() {
        if (getCookieConsent()) return;

        var banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.innerHTML =
            '<div class="cookie-banner__content">' +
                '<div class="cookie-banner__short">' +
                    '<p>Usamos cookies para mejorar tu experiencia, analizar tráfico y personalizar contenido. ' +
                    '<a href="' + pagesPath + 'politica-cookies.html">Saber más</a>.</p>' +
                '</div>' +
                '<div class="cookie-banner__details">' +
                    '<div class="cookie-banner__categories">' +
                        '<label class="cookie-cat">' +
                            '<input type="checkbox" checked disabled>' +
                            '<span><span class="cookie-cat__name">Necesarias</span>' +
                            '<span class="cookie-cat__desc">Imprescindibles para que el sitio funcione. Siempre activas.</span></span>' +
                        '</label>' +
                        '<label class="cookie-cat">' +
                            '<input type="checkbox" id="cookieAnalytics">' +
                            '<span><span class="cookie-cat__name">Analíticas</span>' +
                            '<span class="cookie-cat__desc">Nos ayudan a entender cómo se usa el sitio (Google Analytics).</span></span>' +
                        '</label>' +
                        '<label class="cookie-cat">' +
                            '<input type="checkbox" id="cookieMarketing">' +
                            '<span><span class="cookie-cat__name">Marketing</span>' +
                            '<span class="cookie-cat__desc">Personalizan anuncios y miden campañas (Meta, TikTok).</span></span>' +
                        '</label>' +
                    '</div>' +
                '</div>' +
                '<div class="cookie-banner__actions">' +
                    '<button class="cookie-banner__config-btn" id="cookieConfigBtn">Personalizar</button>' +
                    '<button class="btn btn--secondary btn--sm" id="cookieAcceptNecessary">Solo necesarias</button>' +
                    '<button class="btn btn--primary btn--sm" id="cookieSave" hidden>Guardar preferencias</button>' +
                    '<button class="btn btn--primary btn--sm" id="cookieAcceptAll">Aceptar todas</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(banner);

        function close() {
            banner.classList.add('cookie-banner--hidden');
            setTimeout(function () { banner.remove(); }, 400);
        }

        document.getElementById('cookieConfigBtn').addEventListener('click', function () {
            banner.classList.add('cookie-banner--expanded');
            document.getElementById('cookieSave').hidden = false;
            document.getElementById('cookieAcceptAll').hidden = true;
            this.hidden = true;
        });

        document.getElementById('cookieAcceptAll').addEventListener('click', function () {
            setCookieConsent({ necessary: true, analytics: true, marketing: true, ts: Date.now() });
            close();
        });

        document.getElementById('cookieAcceptNecessary').addEventListener('click', function () {
            setCookieConsent({ necessary: true, analytics: false, marketing: false, ts: Date.now() });
            close();
        });

        document.getElementById('cookieSave').addEventListener('click', function () {
            setCookieConsent({
                necessary: true,
                analytics: document.getElementById('cookieAnalytics').checked,
                marketing: document.getElementById('cookieMarketing').checked,
                ts: Date.now()
            });
            close();
        });
    }

    // ---- BREADCRUMB (+ BreadcrumbList Schema.org) ----
    function renderBreadcrumb(items) {
        var breadcrumbContainer = document.getElementById('breadcrumb');
        if (!breadcrumbContainer) return;

        var html = '<nav class="breadcrumb" aria-label="Navegación de ruta">' +
            '<ol class="breadcrumb__list">';

        items.forEach(function (item, index) {
            if (index === items.length - 1) {
                html += '<li class="breadcrumb__item breadcrumb__item--active" aria-current="page">' + item.label + '</li>';
            } else {
                html += '<li class="breadcrumb__item"><a href="' + item.url + '" class="breadcrumb__link">' + item.label + '</a></li>';
            }
        });

        html += '</ol></nav>';
        breadcrumbContainer.innerHTML = html;

        // Inject BreadcrumbList JSON-LD (SEO)
        var base = window.location.origin + window.location.pathname.replace(/[^/]+$/, '');
        var ld = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': items.map(function (it, i) {
                var entry = { '@type': 'ListItem', 'position': i + 1, 'name': it.label };
                if (it.url) {
                    entry.item = it.url.indexOf('http') === 0 ? it.url : (base + it.url.replace(/^\.\.?\//, ''));
                }
                return entry;
            })
        };
        var old = document.getElementById('breadcrumbSchema');
        if (old) old.remove();
        var s = document.createElement('script');
        s.type = 'application/ld+json';
        s.id = 'breadcrumbSchema';
        s.textContent = JSON.stringify(ld);
        document.head.appendChild(s);
    }

    // ---- THEME TOGGLE ----
    // Default = preferencia del sistema. Solo si el usuario cambia manualmente, se guarda su elección.
    function initThemeToggle() {
        var mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

        function currentTheme() {
            var stored = localStorage.getItem('yamaha_theme');
            if (stored) return stored;
            return (mql && mql.matches) ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', currentTheme());

        // Seguir cambios del sistema SOLO si el usuario no ha elegido manualmente
        if (mql && mql.addEventListener) {
            mql.addEventListener('change', function (e) {
                if (!localStorage.getItem('yamaha_theme')) {
                    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                }
            });
        }

        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('yamaha_theme', next);
        });
    }

    // ---- WHATSAPP FLOATING BUTTON ----
    function renderWhatsAppFloat() {
        var existing = document.getElementById('whatsappFloat');
        if (existing) return;

        var float = document.createElement('a');
        float.href = buildWhatsAppURL('Hola, visité su página web y me gustaría recibir asesoría.');
        float.target = '_blank';
        float.rel = 'noopener';
        float.className = 'whatsapp-float';
        float.id = 'whatsappFloat';
        float.setAttribute('aria-label', 'Contactar por WhatsApp');
        float.innerHTML =
            '<svg class="whatsapp-float__icon" viewBox="0 0 24 24" fill="white" width="24" height="24">' +
                '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
            '</svg>' +
            '<span class="whatsapp-float__text">WhatsApp</span>';
        document.body.appendChild(float);
    }

    // ---- CONTACT INFO (for contact page sidebar) ----
    function renderContactInfo(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var scheduleHTML = SiteConfig.schedule.map(function (line) {
            return '<div>' + line + '</div>';
        }).join('');

        container.innerHTML =
            '<div class="contact-info-item">' +
                '<div class="contact-info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>' +
                '<div><div class="contact-info-item__title">Ubicación</div><div class="contact-info-item__text">' + SiteConfig.address + '</div></div>' +
            '</div>' +
            '<div class="contact-info-item">' +
                '<div class="contact-info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>' +
                '<div><div class="contact-info-item__title">Horarios de Atención</div><div class="contact-info-item__text">' + scheduleHTML + '</div></div>' +
            '</div>' +
            '<div class="contact-info-item">' +
                '<div class="contact-info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>' +
                '<div><div class="contact-info-item__title">Línea Directa</div><div class="contact-info-item__text">Tel: ' + SiteConfig.phone + '<br>WhatsApp: +57 ' + SiteConfig.phone + '</div></div>' +
            '</div>' +
            (SiteConfig.email ? '<div class="contact-info-item">' +
                '<div class="contact-info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>' +
                '<div><div class="contact-info-item__title">Correo Electrónico</div><div class="contact-info-item__text"><a href="mailto:' + SiteConfig.email + '">' + SiteConfig.email + '</a></div></div>' +
            '</div>' : '');
    }

    // Apply theme ASAP (before render) para evitar flash. Sin preferencia guardada = sistema.
    (function applyThemeEarly() {
        try {
            var stored = localStorage.getItem('yamaha_theme');
            var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));
        } catch (e) {}
    })();

    // Wrap renderHeader to auto-init theme toggle after render
    var _originalRenderHeader = renderHeader;
    renderHeader = function (currentPage) {
        _originalRenderHeader(currentPage);
        initThemeToggle();
    };

    // Expose globally
    window.YamahaComponents = {
        config: SiteConfig,
        renderHeader: renderHeader,
        renderFooter: renderFooter,
        renderCookieBanner: renderCookieBanner,
        renderBreadcrumb: renderBreadcrumb,
        renderWhatsAppFloat: renderWhatsAppFloat,
        renderContactInfo: renderContactInfo,
        buildWhatsAppURL: buildWhatsAppURL,
        getCookieConsent: getCookieConsent,
        basePath: basePath,
        pagesPath: pagesPath
    };

})();
