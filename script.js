/* ═══ script.js ═══ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
});

/* ── Hamburger mobile menu ── */
const hamburger = document.getElementById('hamburger');
const navEl = document.querySelector('nav');
hamburger.addEventListener('click', () => {
    navEl.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navEl.classList.contains('open'));
});
navEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navEl.classList.remove('open'));
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (current && href === '#' + current) {
            link.classList.add('active');
        } else if (!current && href === '#') {
            link.classList.add('active');
        }
    });
}

/* ── Reveal on scroll (IntersectionObserver) ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Toast notification ── */
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── Commander button ── */
function order(item) {
    showToast('☕ "' + item + '" ajouté à votre commande !');
}

/* ── Contact form ── */
function handleForm(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-send');
    const success = document.getElementById('form-success');
    btn.textContent = '⏳ Envoi en cours…';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
        btn.disabled = false;
        success.classList.remove('hidden');
        document.getElementById('contact-form').reset();
        showToast('✅ Message envoyé avec succès !');
        setTimeout(() => success.classList.add('hidden'), 5000);
    }, 1400);
}

/* ── Newsletter ── */
function subscribeNewsletter() {
    const input = document.getElementById('newsletter-email');
    const val = input.value.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showToast('⚠️ Veuillez entrer un email valide.');
        return;
    }
    input.value = '';
    showToast('🎉 Inscription confirmée ! Bienvenue dans la famille Coffee House.');
}

/* ── Rating bars animate on visible ── */
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fill').forEach(bar => {
                const w = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => { bar.style.transition = 'width 1s ease'; bar.style.width = w; }, 100);
            });
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const ratingSummary = document.querySelector('.rating-summary');
if (ratingSummary) barObserver.observe(ratingSummary);
