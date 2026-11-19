document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. MOBILE MENU TOGGLE & ACCESSIBLE DROPDOWN
    // ============================================
    const mobileToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Toggle dropdown en pantallas táctiles / móviles
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-link');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    // Si el dropdown no está abierto, prevenir navegación y abrirlo
                    if (!dropdown.classList.contains('open')) {
                        e.preventDefault();
                        dropdown.classList.add('open');
                    } else if (e.target.closest('i')) {
                        // Si hace clic en el icono de flecha, alternar
                        e.preventDefault();
                        dropdown.classList.toggle('open');
                    }
                }
            });
        }
    });

    // Cerrar menú móvil al hacer clic en enlaces normales (excepto dropdown padre)
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const isDropdownParent = link.parentElement.classList.contains('dropdown');
                if (window.innerWidth <= 768 && (!isDropdownParent || link.closest('.dropdown-content'))) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) {
                        const icon = mobileToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && mobileToggle &&
            !navLinks.contains(e.target) &&
            !mobileToggle.contains(e.target) &&
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ============================================
    // 2. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // 3. COUNTER ANIMATION (Quiénes Somos page)
    // ============================================
    const counters = document.querySelectorAll('.number');

    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(el) {
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)(.*)$/);
        if (!match) return;

        const target = parseInt(match[1]);
        const suffix = match[2]; // e.g., "+"
        const duration = 2000;
        const startTime = performance.now();

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.round(target * easedProgress);

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        el.textContent = '0' + suffix;
        requestAnimationFrame(update);
    }

    // ============================================
    // 4. SMOOTH REVEAL ON SCROLL
    // ============================================
    const revealElements = document.querySelectorAll('.service-card, .service-item-card');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            revealObserver.observe(el);
        });
    }

    // ============================================
    // 5. INITIALIZE AOS
    // ============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            offset: 50
        });
    }

    // ============================================
    // 6. ACTIVE NAV LINK BASED ON CURRENT PAGE
    // ============================================
    const rawPage = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    const currentPageClean = rawPage.replace(/\.html$/, '').toLowerCase();
    const servicePages = new Set(['inventarios', 'valuaciones', 'saneamiento']);

    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        const rawHref = link.getAttribute('href') || '';
        const hrefClean = rawHref.split('#')[0].split('/').filter(Boolean).pop()?.replace(/\.html$/, '').toLowerCase() || '';

        const isCurrent = (currentPageClean === '' || currentPageClean === 'index')
            ? (hrefClean === '' || hrefClean === 'index')
            : (hrefClean === currentPageClean);

        const isServiceParent = servicePages.has(currentPageClean) && rawHref.includes('#servicios');

        if (isCurrent || isServiceParent) {
            link.classList.add('active');
        }
    });
    // ============================================
    // 7. DYNAMIC COPYRIGHT YEAR
    // ============================================
    const yearElements = document.querySelectorAll('.current-year');
    const thisYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = thisYear;
    });

    // ============================================
    // 8. B2B CONTACT FORM & WHATSAPP INTEGRATION
    // ============================================
    const contactForm = document.getElementById('contact-form');
    const btnWhatsapp = document.getElementById('btn-whatsapp-quote');
    const feedbackBox = document.getElementById('form-feedback');

    function buildMessagePayload() {
        const nombre = document.getElementById('nombre')?.value.trim() || '';
        const empresa = document.getElementById('empresa')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const telefono = document.getElementById('telefono')?.value.trim() || '';
        const checkedBoxes = document.querySelectorAll('input[name="servicios"]:checked');
        const servicios = Array.from(checkedBoxes).map(cb => cb.value);
        const volumen = document.getElementById('volumen')?.value || '';
        const mensaje = document.getElementById('mensaje')?.value.trim() || '';

        return { nombre, empresa, email, telefono, servicios, volumen, mensaje };
    }

    function formatTextForShare(data) {
        const serviciosList = data.servicios.length > 0 
            ? data.servicios.map(s => `  • ${s}`).join('\n')
            : '  • Por determinar';

        const rawText = 
            `*SOLICITUD DE COTIZACIÓN - VEGA Y SÁNCHEZ*\n` +
            `-----------------------------------\n` +
            `*Cliente:* ${data.nombre}\n` +
            `*Empresa / RUC:* ${data.empresa}\n` +
            `*Email:* ${data.email}\n` +
            `*Teléfono:* ${data.telefono}\n` +
            `*Servicios Requeridos:*\n${serviciosList}\n` +
            `*Volumen Estimado:* ${data.volumen}\n` +
            `*Detalles:* ${data.mensaje}\n` +
            `-----------------------------------\n` +
            `Enviado desde el portal web vegaysanchez.com`;

        return encodeURIComponent(rawText);
    }

    // Toggle interactivo visual para tarjetas de servicios
    document.querySelectorAll('.service-checkbox-card').forEach(card => {
        const cb = card.querySelector('input[type="checkbox"]');
        if (cb) {
            if (cb.checked) card.classList.add('selected');
            cb.addEventListener('change', () => {
                card.classList.toggle('selected', cb.checked);
                const errorBox = document.getElementById('servicio-error');
                if (errorBox && document.querySelectorAll('input[name="servicios"]:checked').length > 0) {
                    errorBox.style.display = 'none';
                }
            });
        }
    });

    function validateServices(data) {
        if (!data.servicios || data.servicios.length === 0) {
            const errorBox = document.getElementById('servicio-error');
            if (errorBox) {
                errorBox.style.display = 'block';
                errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert('Por favor, seleccione al menos un servicio de interés.');
            }
            return false;
        }
        return true;
    }

    if (btnWhatsapp && contactForm) {
        btnWhatsapp.addEventListener('click', () => {
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }
            const data = buildMessagePayload();
            if (!validateServices(data)) return;

            const text = formatTextForShare(data);
            const waUrl = `https://wa.me/51997754542?text=${text}`;
            window.open(waUrl, '_blank');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = buildMessagePayload();
            if (!validateServices(data)) return;

            const serviciosSubject = data.servicios.length === 1 
                ? data.servicios[0] 
                : `${data.servicios.length} Servicios Integrales`;
            const mailSubject = encodeURIComponent(`Cotización: ${serviciosSubject} - ${data.empresa}`);
            const serviciosMailList = data.servicios.map(s => `  • ${s}`).join('\n');
            const mailBody = encodeURIComponent(
                `SOLICITUD DE COTIZACIÓN FORMAL\n\n` +
                `Nombre: ${data.nombre}\n` +
                `Empresa/RUC: ${data.empresa}\n` +
                `Correo: ${data.email}\n` +
                `Teléfono: ${data.telefono}\n\n` +
                `Servicios Requeridos:\n${serviciosMailList}\n\n` +
                `Volumen: ${data.volumen}\n\n` +
                `Detalles:\n${data.mensaje}\n`
            );

            const mailtoUrl = `mailto:gvega@vegaysanchez.com?subject=${mailSubject}&body=${mailBody}`;

            if (feedbackBox) {
                feedbackBox.style.display = 'block';
                feedbackBox.style.background = '#e8f5e9';
                feedbackBox.style.color = '#2e7d32';
                feedbackBox.style.border = '1px solid #a5d6a7';
                feedbackBox.innerHTML = `
                    <strong><i class="fas fa-check-circle"></i> ¡Información preparada con éxito!</strong><br>
                    Se está abriendo su gestor de correo para enviar la solicitud formal a <em>gvega@vegaysanchez.com</em>.<br>
                    Si prefiere atención inmediata por chat, presione el botón <strong>"Cotizar por WhatsApp"</strong>.
                `;
            }

            window.location.href = mailtoUrl;
        });
    }
});
