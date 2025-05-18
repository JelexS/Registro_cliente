document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');    
            // Expresiones regulares para validaciones
            const patterns = {
                nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/,
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                cedula: /^[0-9]{10}$/,
                telefono: /^[0-9]{10}$/,
                direccion: /^.{5,100}$/
            };
            // Campos a validar
            const campos = {
                nombre: document.querySelector('input[type="text"]'),
                email: document.querySelector('input[type="email"]'),
                genero: document.querySelector('select[name="genero"]'),
                cedula: document.querySelector('input[name="cedula"]'),
                pais: document.querySelector('select[name="pais"]'),
                telefono: document.querySelector('input[type="tel"]'),
                direccion: document.querySelector('input[name="direccion"]'),
                fechaNacimiento: document.querySelector('input[type="date"]')
            };
            // Validar en tiempo real
            Object.keys(campos).forEach(key => {
                if (campos[key]) {
                    campos[key].addEventListener('input', function() {
                        validarCampo(this);
                    });
                }
            });
            // Validar al enviar
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                Object.keys(campos).forEach(key => {
                    if (!validarCampo(campos[key])) {
                        isValid = false;
                    }
                });
                if (isValid) {
                    alert('Formulario válido. Enviando datos...');
                    // form.submit(); // Descomentar para envío real
                } else {
                    alert('Por favor corrige los errores');
                }
            });
            function validarCampo(campo) {
                const valor = campo.value.trim();
                const container = campo.closest('.input-container');
                const errorElement = container.nextElementSibling;
                
                // Resetear estilos
                container.classList.remove('error', 'success');
                if (errorElement) errorElement.style.display = 'none';
                // Validar campo requerido
                if (campo.required && !valor) {
                    mostrarError(container, 'Este campo es obligatorio');
                    return false;
                }
                // Validaciones específicas
                switch (campo.name || campo.id) {
                    case 'nombre':
                        if (!patterns.nombre.test(valor)) {
                            mostrarError(container, 'Nombre inválido (3-50 caracteres, solo letras)');
                            return false;
                        }
                        break;
                        
                    case 'email':
                        if (!patterns.email.test(valor)) {
                            mostrarError(container, 'Email inválido (ejemplo: usuario@dominio.com)');
                            return false;
                        }
                        break;
                        
                    case 'cedula':
                        if (!patterns.cedula.test(valor)) {
                            mostrarError(container, 'Cédula inválida (10 dígitos numéricos)');
                            return false;
                        }
                        break;
                        
                    case 'telefono':
                        if (!patterns.telefono.test(valor)) {
                            mostrarError(container, 'Teléfono inválido (10 dígitos numéricos)');
                            return false;
                        }
                        break;
                        
                    case 'genero':
                    case 'pais':
                        if (valor === "") {
                            mostrarError(container, 'Debes seleccionar una opción');
                            return false;
                        }
                        break;
                        
                    case 'fechaNacimiento':
                        const fecha = new Date(valor);
                        const hoy = new Date();
                        if (fecha >= hoy) {
                            mostrarError(container, 'Fecha de nacimiento inválida');
                            return false;
                        }
                        break;
                }
                // Si pasa todas las validaciones
                container.classList.add('success');
                return true;
            }
            function mostrarError(container, mensaje) {
                container.classList.add('error');
                let errorElement = container.nextElementSibling;
                
                if (!errorElement || !errorElement.classList.contains('error-message')) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    container.parentNode.insertBefore(errorElement, container.nextSibling);
                }
                
                errorElement.textContent = mensaje;
                errorElement.style.display = 'block';
            }
        });