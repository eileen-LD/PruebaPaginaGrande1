/* ===== JAVASCRIPT ESPECÍFICO - FORMACIÓN SECUNDARIA ===== */
/* Archivo: script.js - Funcionalidades para la sección de Formación Secundaria */

// ===== INICIALIZACIÓN ===== 
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Formación Secundaria - Módulo iniciado');
    
    // Inicializar funcionalidades específicas
    initModalidadCards();
    initEstadisticas();
    initInscripcionButtons();
    initModalidadComparison();
    
    console.log('✅ Funcionalidades de Formación Secundaria inicializadas');
});

// ===== FUNCIONALIDADES DE TARJETAS DE MODALIDAD =====
function initModalidadCards() {
    const modalidadCards = document.querySelectorAll('.modalidad-card');
    
    modalidadCards.forEach(card => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('destacada')) {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            } else {
                this.style.transform = 'scale(1.05) translateY(-12px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('destacada')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'scale(1.05) translateY(0)';
            }
        });
        
        // Click en la tarjeta para expandir información
        card.addEventListener('click', function(e) {
            // Evitar que se active si se hace click en el botón
            if (!e.target.closest('.modalidad-inscripcion')) {
                expandModalidadInfo(this);
            }
        });
    });
}

// ===== EXPANDIR INFORMACIÓN DE MODALIDAD =====
function expandModalidadInfo(card) {
    const modalidadNombre = card.querySelector('h3').textContent;
    const modalidadDescripcion = card.querySelector('.modalidad-descripcion p').textContent;
    const modalidadDetalles = Array.from(card.querySelectorAll('.modalidad-detalles li')).map(li => li.textContent);
    
    // Crear modal con información expandida
    const modal = document.createElement('div');
    modal.className = 'modalidad-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Modalidad ${modalidadNombre}</h3>
                <button class="modal-close" onclick="closeModalidadModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p class="modal-descripcion">${modalidadDescripcion}</p>
                <div class="modal-detalles">
                    <h4>¿Por qué elegir esta modalidad?</h4>
                    <ul>
                        ${modalidadDetalles.map(detalle => `<li>${detalle}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-beneficios">
                    <h4>Beneficios adicionales:</h4>
                    <ul>
                        <li>Certificado oficial del Ministerio de Educación</li>
                        <li>Posibilidad de continuar estudios superiores</li>
                        <li>Mejores oportunidades laborales</li>
                        <li>Acompañamiento pedagógico personalizado</li>
                        <li>Biblioteca y recursos digitales</li>
                    </ul>
                </div>
                <button class="btn btn-primary modal-inscripcion">
                    <i class="fas fa-edit"></i>
                    Inscribirse en ${modalidadNombre}
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
        max-width: 600px;
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
            closeModalidadModal();
        }
    });
}

// ===== CERRAR MODAL =====
function closeModalidadModal() {
    const modal = document.querySelector('.modalidad-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// ===== ANIMACIÓN DE ESTADÍSTICAS =====
function initEstadisticas() {
    const estadisticas = document.querySelectorAll('.estadistica-numero');
    
    const estadisticasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    estadisticas.forEach(stat => {
        estadisticasObserver.observe(stat);
    });
}

// ===== ANIMAR NÚMEROS =====
function animateNumber(element) {
    const finalNumber = element.textContent;
    const isPercentage = finalNumber.includes('%');
    const isPlus = finalNumber.includes('+');
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    
    let currentNumber = 0;
    const increment = Math.ceil(numericValue / 50);
    const duration = 2000; // 2 segundos
    const stepTime = duration / (numericValue / increment);
    
    element.textContent = '0' + (isPercentage ? '%' : '');
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        
        let displayText = currentNumber.toString();
        if (isPlus) displayText = '+' + displayText;
        if (isPercentage) displayText += '%';
        
        element.textContent = displayText;
    }, stepTime);
}

// ===== COMPARADOR DE MODALIDADES =====
function initModalidadComparison() {
    // Crear botón de comparación
    const modalidadesSection = document.getElementById('modalidades');
    if (modalidadesSection) {
        const compareContainer = document.createElement('div');
        compareContainer.className = 'modalidad-compare';
        compareContainer.innerHTML = `
            <div class="compare-button-container">
                <button class="btn btn-outline compare-btn">
                    <i class="fas fa-balance-scale"></i>
                    Comparar Modalidades
                </button>
            </div>
        `;
        
        // Insertar después del grid de modalidades
        const modalidadesGrid = modalidadesSection.querySelector('.modalidades-grid');
        modalidadesGrid.insertAdjacentElement('afterend', compareContainer);
        
        // Funcionalidad del botón
        const compareBtn = compareContainer.querySelector('.compare-btn');
        compareBtn.addEventListener('click', showModalidadComparison);
    }
}

// ===== MOSTRAR COMPARACIÓN =====
function showModalidadComparison() {
    const modal = document.createElement('div');
    modal.className = 'comparison-modal';
    modal.innerHTML = `
        <div class="modal-content comparison-content">
            <div class="modal-header">
                <h3>Comparación de Modalidades</h3>
                <button class="modal-close" onclick="closeComparisonModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="comparison-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Característica</th>
                                <th>Presencial</th>
                                <th>Semipresencial</th>
                                <th>Acelerada</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Duración</strong></td>
                                <td>3 años</td>
                                <td>3 años</td>
                                <td>2 años</td>
                            </tr>
                            <tr>
                                <td><strong>Días de clase</strong></td>
                                <td>Lunes a Viernes</td>
                                <td>2 días por semana</td>
                                <td>Lunes a Sábado</td>
                            </tr>
                            <tr>
                                <td><strong>Horarios</strong></td>
                                <td>Mañana, Tarde o Noche</td>
                                <td>Noche o Sábados</td>
                                <td>Noche y Sábados</td>
                            </tr>
                            <tr>
                                <td><strong>Ideal para</strong></td>
                                <td>Tiempo completo</td>
                                <td>Trabajadores</td>
                                <td>Rápida finalización</td>
                            </tr>
                            <tr>
                                <td><strong>Modalidad virtual</strong></td>
                                <td>No</td>
                                <td>Sí</td>
                                <td>Parcial</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="comparison-recommendation">
                    <h4>¿Cuál elegir?</h4>
                    <p><strong>Presencial:</strong> Si tenés tiempo disponible y preferís el contacto directo con docentes.</p>
                    <p><strong>Semipresencial:</strong> Si trabajás y necesitás flexibilidad horaria.</p>
                    <p><strong>Acelerada:</strong> Si querés obtener tu título lo antes posible y podés dedicar más tiempo.</p>
                </div>
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
        max-width: 800px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    // Estilos de la tabla
    const table = modal.querySelector('table');
    table.style.cssText = `
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 2rem;
    `;
    
    const thTd = modal.querySelectorAll('th, td');
    thTd.forEach(cell => {
        cell.style.cssText = `
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        `;
    });
    
    const th = modal.querySelectorAll('th');
    th.forEach(header => {
        header.style.backgroundColor = '#f59e0b';
        header.style.color = 'white';
        header.style.fontWeight = 'bold';
    });
    
    document.body.appendChild(modal);
    
    // Animación de entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Cerrar modal al hacer click fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeComparisonModal();
        }
    });
}

// ===== CERRAR MODAL DE COMPARACIÓN =====
function closeComparisonModal() {
    const modal = document.querySelector('.comparison-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// ===== BOTONES DE INSCRIPCIÓN =====
function initInscripcionButtons() {
    const inscripcionButtons = document.querySelectorAll('.modalidad-inscripcion, .inscripcion-card .btn');
    
    inscripcionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el nombre de la modalidad si está disponible
            const modalidadCard = this.closest('.modalidad-card');
            let modalidadNombre = 'Formación Secundaria';
            
            if (modalidadCard) {
                modalidadNombre = modalidadCard.querySelector('h3').textContent;
            }
            
            // Mostrar mensaje de confirmación
            showInscripcionConfirmation(modalidadNombre);
            
            // Aquí se puede agregar la lógica para redirigir al formulario
            console.log(`Inscripción iniciada para: ${modalidadNombre}`);
        });
    });
}

// ===== CONFIRMACIÓN DE INSCRIPCIÓN =====
function showInscripcionConfirmation(modalidadNombre) {
    const notification = document.createElement('div');
    notification.className = 'inscripcion-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-graduation-cap"></i>
            <h4>¡Tu Futuro Comienza Ahora!</h4>
            <p>Te estás inscribiendo en: <strong>${modalidadNombre}</strong></p>
            <p>Serás redirigido al formulario de inscripción...</p>
            <div class="motivation-text">
                <em>"Nunca es tarde para completar tu educación"</em>
            </div>
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
        min-width: 350px;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
        transition: all 0.3s ease;
        border-left: 4px solid #f59e0b;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        color: #f59e0b;
    `;
    
    const icon = notification.querySelector('i');
    icon.style.cssText = `
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #f59e0b;
    `;
    
    const motivationText = notification.querySelector('.motivation-text');
    motivationText.style.cssText = `
        margin-top: 1rem;
        font-style: italic;
        color: #6b7280;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== FUNCIONES EXPORTADAS =====
window.SecundariaModule = {
    expandModalidadInfo,
    closeModalidadModal,
    showModalidadComparison,
    closeComparisonModal,
    showInscripcionConfirmation,
    animateNumber
};

console.log('🎓 Módulo Formación Secundaria cargado correctamente');

