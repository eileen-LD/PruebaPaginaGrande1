/* ===== JAVASCRIPT GLOBAL UPCNER ===== */
/* Archivo: script.js - Funcionalidades compartidas para toda la web */
/* Institución: UPCNER - Capacitaciones UPCN */

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let scrollPosition = 0;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 UPCNER - Sistema de Capacitaciones iniciado');
    
    // Inicializar funcionalidades
    initNavigation();
    initScrollAnimations();
    initWhatsAppButton();
    initChatbot();
    initResponsiveMenu();
    
    console.log('✅ Todas las funcionalidades inicializadas correctamente');
});

// ===== NAVEGACIÓN =====
function initNavigation() {
    // Smooth scroll para enlaces internos
    const enlaces = document.querySelectorAll('a[href^="#"]');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensar navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase 'animate-on-scroll'
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ===== BOTÓN FLOTANTE WHATSAPP =====
function initWhatsAppButton() {
    // Crear botón flotante de WhatsApp si no existe
    if (!document.querySelector('.whatsapp-float')) {
        const whatsappButton = document.createElement('a');
        whatsappButton.className = 'whatsapp-float';
        whatsappButton.href = '#'; // <!-- acá va el link de WhatsApp -->
        whatsappButton.target = '_blank';
        whatsappButton.rel = 'noopener noreferrer';
        whatsappButton.title = 'Contactar por WhatsApp';
        
        // Icono de WhatsApp (SVG)
        whatsappButton.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
        `;
        
        document.body.appendChild(whatsappButton);
        
        // Animación de entrada
        setTimeout(() => {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.transform = 'scale(1)';
        }, 1000);
    }
}

// ===== CHATBOT (FUNCIONALIDAD PREPARADA) =====
function initChatbot() {
    // Crear contenedor del chatbot si no existe
    if (!document.querySelector('#chatbot')) {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot';
        chatbotContainer.style.display = 'none';
        
        chatbotContainer.innerHTML = `
            <!-- chatbot oculto, activar cuando se integre con n8n u otra herramienta -->
            <div class="chatbot-header">
                <h4>Asistente UPCNER</h4>
                <button class="chatbot-close" onclick="closeChatbot()">×</button>
            </div>
            <div class="chatbot-body">
                <div class="chatbot-messages">
                    <div class="message bot-message">
                        ¡Hola! Soy el asistente virtual de UPCNER. ¿En qué puedo ayudarte?
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Escribe tu consulta..." disabled>
                    <button disabled>Enviar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatbotContainer);
    }
}

// Función para abrir chatbot (preparada para futuro uso)
function openChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.style.display = 'block';
        chatbot.classList.add('fade-in');
    }
}

// Función para cerrar chatbot
function closeChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.style.display = 'none';
        chatbot.classList.remove('fade-in');
    }
}

// ===== MENÚ RESPONSIVE =====
function initResponsiveMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.classList.add('menu-open');
                menuToggle.classList.add('menu-active');
                document.body.style.overflow = 'hidden';
            } else {
                navMenu.classList.remove('menu-open');
                menuToggle.classList.remove('menu-active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMenuOpen) {
                    navMenu.classList.remove('menu-open');
                    menuToggle.classList.remove('menu-active');
                    document.body.style.overflow = 'auto';
                    isMenuOpen = false;
                }
            });
        });
    }
}

// ===== FORMULARIOS =====
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se puede agregar validación de formularios
            console.log('Formulario enviado (funcionalidad pendiente de implementar)');
            
            // Mostrar mensaje de confirmación
            showNotification('Formulario enviado correctamente', 'success');
        });
    });
}

// ===== NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== UTILIDADES =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== LAZY LOADING DE IMÁGENES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error en UPCNER:', e.error);
});

// ===== FUNCIONES EXPORTADAS PARA USO GLOBAL =====
window.UPCNER = {
    showNotification,
    scrollToTop,
    scrollToElement,
    openChatbot,
    closeChatbot
};

console.log('📚 Script global UPCNER cargado correctamente');

