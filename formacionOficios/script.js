/* ===== JAVASCRIPT ESPECÍFICO - APRENDE OFICIOS ===== */
/* Archivo: script.js - Funcionalidades para la sección de Formación en Oficios */

// ===== INICIALIZACIÓN ===== 
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Aprende Oficios - Módulo iniciado');
    
    // Inicializar funcionalidades específicas
    initCursoCards();
    initEscuelaFilters();
    initInscripcionButtons();
    
    console.log('✅ Funcionalidades de Oficios inicializadas');
});

// ===== FUNCIONALIDADES DE TARJETAS DE CURSOS =====
function initCursoCards() {
    const cursoCards = document.querySelectorAll('.curso-card');
    
    cursoCards.forEach(card => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click en la tarjeta para expandir información
        card.addEventListener('click', function(e) {
            // Evitar que se active si se hace click en el botón
            if (!e.target.closest('.curso-inscripcion')) {
                expandCursoInfo(this);
            }
        });
    });
}

// ===== EXPANDIR INFORMACIÓN DEL CURSO =====
function expandCursoInfo(card) {
    const cursoNombre = card.querySelector('h4').textContent;
    const cursoDescripcion = card.querySelector('.curso-descripcion').textContent;
    const cursoDuracion = card.querySelector('.curso-duracion').textContent;
    
    // Crear modal con información expandida
    const modal = document.createElement('div');
    modal.className = 'curso-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${cursoNombre}</h3>
                <button class="modal-close" onclick="closeCursoModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p class="modal-duracion">${cursoDuracion}</p>
                <p class="modal-descripcion">${cursoDescripcion}</p>
                <div class="modal-detalles">
                    <h4>Detalles del Curso:</h4>
                    <ul>
                        <li>Clases teóricas y prácticas</li>
                        <li>Uso de herramientas profesionales</li>
                        <li>Certificación oficial al finalizar</li>
                        <li>Seguimiento personalizado</li>
                        <li>Bolsa de trabajo disponible</li>
                    </ul>
                </div>
                <button class="btn btn-primary modal-inscripcion">
                    <i class="fas fa-edit"></i>
                    Inscribirse Ahora
                </button>
            </div>
        </div>
    `;
    
    // Estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: white;
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animación de entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Cerrar modal al hacer click fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCursoModal();
        }
    });
}

// ===== CERRAR MODAL =====
function closeCursoModal() {
    const modal = document.querySelector('.curso-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// ===== FILTROS DE ESCUELA =====
function initEscuelaFilters() {
    // Crear botones de filtro
    const escuelasSection = document.getElementById('escuelas');
    if (escuelasSection) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'escuela-filters';
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">
                    <i class="fas fa-th"></i>
                    Todas las Escuelas
                </button>
                <button class="filter-btn" data-filter="escuela-230">
                    <i class="fas fa-school"></i>
                    Escuela 230
                </button>
                <button class="filter-btn" data-filter="escuela-231">
                    <i class="fas fa-school"></i>
                    Escuela 231
                </button>
            </div>
        `;
        
        // Insertar antes del contenido de escuelas
        const container = escuelasSection.querySelector('.container');
        const descripcion = container.querySelector('.seccion-descripcion').parentElement;
        descripcion.insertAdjacentElement('afterend', filterContainer);
        
        // Estilos para los filtros
        filterContainer.style.cssText = `
            margin: 2rem 0;
            text-align: center;
        `;
        
        const filterButtons = filterContainer.querySelector('.filter-buttons');
        filterButtons.style.cssText = `
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        `;
        
        // Funcionalidad de filtros
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.style.cssText = `
                padding: 0.75rem 1.5rem;
                border: 2px solid #10b981;
                background-color: transparent;
                color: #10b981;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            `;
            
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.backgroundColor = 'transparent';
                    b.style.color = '#10b981';
                });
                
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                this.style.backgroundColor = '#10b981';
                this.style.color = 'white';
                
                // Filtrar escuelas
                filterEscuelas(this.dataset.filter);
            });
        });
        
        // Estilo para botón activo
        const activeBtn = filterContainer.querySelector('.filter-btn.active');
        activeBtn.style.backgroundColor = '#10b981';
        activeBtn.style.color = 'white';
    }
}

// ===== FILTRAR ESCUELAS =====
function filterEscuelas(filter) {
    const escuelaSections = document.querySelectorAll('.escuela-section');
    
    escuelaSections.forEach(section => {
        if (filter === 'all') {
            section.style.display = 'block';
            section.style.opacity = '0';
            setTimeout(() => {
                section.style.opacity = '1';
            }, 100);
        } else {
            const escuelaClass = section.querySelector('.escuela-badge').classList.contains(filter);
            
            if (escuelaClass) {
                section.style.display = 'block';
                section.style.opacity = '0';
                setTimeout(() => {
                    section.style.opacity = '1';
                }, 100);
            } else {
                section.style.opacity = '0';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            }
        }
    });
}

// ===== BOTONES DE INSCRIPCIÓN =====
function initInscripcionButtons() {
    const inscripcionButtons = document.querySelectorAll('.curso-inscripcion, .inscripcion-card .btn');
    
    inscripcionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el nombre del curso si está disponible
            const cursoCard = this.closest('.curso-card');
            let cursoNombre = 'Aprende Oficios';
            
            if (cursoCard) {
                cursoNombre = cursoCard.querySelector('h4').textContent;
            }
            
            // Mostrar mensaje de confirmación
            showInscripcionConfirmation(cursoNombre);
            
            // Aquí se puede agregar la lógica para redirigir al formulario
            console.log(`Inscripción iniciada para: ${cursoNombre}`);
        });
    });
}

// ===== CONFIRMACIÓN DE INSCRIPCIÓN =====
function showInscripcionConfirmation(cursoNombre) {
    const notification = document.createElement('div');
    notification.className = 'inscripcion-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <h4>¡Inscripción Iniciada!</h4>
            <p>Te estás inscribiendo en: <strong>${cursoNombre}</strong></p>
            <p>Serás redirigido al formulario de inscripción...</p>
        </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        text-align: center;
        min-width: 300px;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
        transition: all 0.3s ease;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        color: #10b981;
    `;
    
    const icon = notification.querySelector('i');
    icon.style.cssText = `
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #10b981;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== ANIMACIONES DE SCROLL ESPECÍFICAS =====
function initOficiosAnimations() {
    // Animación para las etiquetas de escuela
    const escuelaTags = document.querySelectorAll('.escuela-tag');
    
    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInRight 0.6s ease-out';
            }
        });
    }, { threshold: 0.5 });
    
    escuelaTags.forEach(tag => {
        tagObserver.observe(tag);
    });
}

// ===== FUNCIONES EXPORTADAS =====
window.OficiosModule = {
    expandCursoInfo,
    closeCursoModal,
    filterEscuelas,
    showInscripcionConfirmation
};

// Inicializar animaciones específicas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initOficiosAnimations);

console.log('🔧 Módulo Aprende Oficios cargado correctamente');

