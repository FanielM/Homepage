// Header Effekt beim Scrollen
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// Kontaktformular Logik
const contactForm = document.querySelector('form');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Verhindert das Neuladen der Seite
        
        // Hier könnte man später eine E-Mail-API anbinden
        const name = contactForm.querySelector('input[type="text"]').value;
        
        alert(`Vielen Dank, ${name}! Deine Nachricht wurde (simuliert) gesendet. Im Webverse ist alles möglich!`);
        
        contactForm.reset(); // Leert das Formular
    });
}

// Kleines Extra: Aktive Links beim Scrollen hervorheben
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};
