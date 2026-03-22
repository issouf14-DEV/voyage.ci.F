// --- Mobile Menu ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
let overlay = null;

function createOverlay() {
    overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMenu);
}

function openMenu() {
    hamburger.classList.add('open');
    navMenu.classList.add('open');
    if (!overlay) createOverlay();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

// Close menu when clicking a nav link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// --- Gallery Scroll (Prev/Next buttons) ---
const gallery = document.getElementById('gallerie');
const prevBtn = document.getElementById('gallery-prev');
const nextBtn = document.getElementById('gallery-next');

if (gallery && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: -320, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: 320, behavior: 'smooth' });
    });
}

// --- Video Modal ---
const videoBtn = document.getElementById('see-video-btn');
const videoModal = document.getElementById('video-modal');
const videoClose = document.getElementById('video-modal-close');
const modalVideo = document.getElementById('modal-video');

if (videoBtn && videoModal) {
    videoBtn.addEventListener('click', () => {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalVideo.play();
    });

    videoClose.addEventListener('click', () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    });

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoClose.click();
        }
    });
}

// --- Newsletter Form ---
const form = document.getElementById('newsletter-form');
const formSuccess = document.getElementById('form-success');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input.value) {
            formSuccess.classList.add('show');
            input.value = '';
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 3000);
        }
    });
}

// --- Scroll Reveal Animations ---
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add('visible');
        }
    });
}

// Add fade-up class to animatable elements
document.querySelectorAll('.image, .box, .email-trip .container, .title').forEach(el => {
    el.classList.add('fade-up');
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// --- Close menu on Escape ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
        if (videoModal && videoModal.classList.contains('active')) {
            videoClose.click();
        }
    }
});
