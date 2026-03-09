// 1. Navbar Blur Effect on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. High-Performance Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Nur einmal auslösen für Performance
        }
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

// 3. Pricing Toggle (Monatlich / Jährlich)
const priceSwitch = document.getElementById('price-switch');
const monthlyLabel = document.getElementById('monthly-label');
const yearlyLabel = document.getElementById('yearly-label');
const priceDisplays = document.querySelectorAll('.price span');

priceSwitch.addEventListener('change', () => {
    if(priceSwitch.checked) {
        // Jährlich
        yearlyLabel.classList.add('active');
        monthlyLabel.classList.remove('active');
        priceDisplays.forEach(display => {
            const yearlyPrice = display.parentElement.getAttribute('data-yearly');
            animateValue(display, parseInt(display.innerText), parseInt(yearlyPrice), 300);
        });
    } else {
        // Monatlich
        monthlyLabel.classList.add('active');
        yearlyLabel.classList.remove('active');
        priceDisplays.forEach(display => {
            const monthlyPrice = display.parentElement.getAttribute('data-monthly');
            animateValue(display, parseInt(display.innerText), parseInt(monthlyPrice), 300);
        });
    }
});

// Kleine Nummern-Animation für den Preiswechsel
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 4. FAQ Accordion Logic
const accItems = document.querySelectorAll('.acc-item');
accItems.forEach(item => {
    const head = item.querySelector('.acc-head');
    head.addEventListener('click', () => {
        // Schließe alle anderen
        accItems.forEach(otherItem => {
            if(otherItem !== item) {
                otherItem.classList.remove('open');
            }
        });
        // Toggle aktuelles Item
        item.classList.toggle('open');
    });
});

// 5. Smooth Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Anfrage wird gesendet...";
    btn.style.opacity = "0.8";
    
    // Simulierter Versand
    setTimeout(() => {
        btn.innerHTML = "<i class='bx bx-check'></i> Erfolgreich gesendet!";
        btn.style.background = "#00c853"; // Grün bei Erfolg
        btn.style.boxShadow = "0 0 20px rgba(0, 200, 83, 0.4)";
        this.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = ""; // Zurück zur Originalfarbe
            btn.style.boxShadow = "";
            btn.style.opacity = "1";
        }, 3000);
    }, 1500);
});

// 6. Smooth Scrolling for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
