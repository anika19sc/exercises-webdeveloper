 // Formulario de contacto
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

function goToSection(section){
	const scroll = section.id+"-section";
	document.getElementById(scroll).scrollIntoView(true);
}

function openMenu() {
  const menu = document.getElementById('menu-options')
  menu.classList.toggle('is-active')
}

function goToSection(element) {
    const sectionId = element.id.replace('-nav', '-section'); // Añade esta línea para adaptar los IDs
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Cierra el menú en móvil si está abierto
        const menuOptions = document.getElementById('menu-options');
        if (menuOptions.classList.contains('is-active')) {
            menuOptions.classList.remove('is-active');
        }
    }
}

function openMenu() {
    const menuOptions = document.getElementById('menu-options');
    menuOptions.classList.toggle('is-active');
}

AOS.init();