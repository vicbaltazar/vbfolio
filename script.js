const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    ring.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
});
document.querySelectorAll('a, button, .stat-card, .project-card, .skill-group').forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '50px';
        ring.style.height = '50px';

        const t = ring.style.transform || 'translate(0px, 0px)';
        const parts = t.match(/translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/);
        if (parts) {
            const x = parseFloat(parts[1]) - 7;
            const y = parseFloat(parts[2]) - 7;
            ring.style.transform = `translate(${x}px, ${y}px)`;
        }
        ring.style.borderColor = 'rgba(230, 57, 70, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(230, 57, 70, 0.5)';
    });
});

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop -120) cur = s.id; });
    document.querySelectorAll('nav a').forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--cream)' : '';
    });

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-bar').style.width = progress + '%';
});

function handSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const nome = form.querySelector('input[type=text]').value;
    const email = form.querySelector('input[type=email]').value;
    const msg = form.querySelector('textarea').value;
    const subject = encodeURIComponent(`Portfólio - Mensagem de ${nome}`);
    const body = encodeURIComponent(`De: ${nome}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:vicbaltazar287@icloud.com?subject=${subject}&body=${body}`;
    const btn = document.getElementById('submit-btn');
    btn.style.background = 'var(--dark3)';
    document.getElementById('btn-text').textContent = 'Abrindo e-mail...';
    setTimeout(() => {
        btn.style.background = 'var(--red)';
        document.getElementById('btn-text').textContent = 'Enviar mensagem';
    }, 3000);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function animateCounter(el) {
    const target = el.dataset.target;
    const isInfinity = target === '∞';

    if (isInfinity) {
        el.textContent = '∞';
        return;
    }

    const num = parseFloat(target);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
            clearInterval(timer);
            el.innerHTML = `${num}<span>${suffix}</span>`;
        } else {
            el.innerHTML = `${Math.floor(current)}<span>${suffix}</span>`;
        }
    }, duration / steps);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numEl = entry.target.querySelector('.stat-num');
            if (numEl && !numEl.dataset.animated) {
                numEl.dataset.animated = 'true';
                animateCounter(numEl);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    counterObserver.observe(card);
});

const phrases = [
    'Desenvolvedor FullStack',
    'Apaixonada por código e música',
    'Javascript · Python · React',
    'transformando ideias em realidade'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex- 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;    
    }

    setTimeout(type, speed);
}

if (typingEl) type();

const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', e => {
    if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
            konamiIndex = 0;
            showEasterEgg();
        }
    } else {
        konamiIndex = 0;
    }
});

function showEasterEgg() {
    const overlay = document.createElement('div');
    overlay.id = 'easter-egg';
    overlay.innerHTML = `
        <div class="egg-inner">
            <div class="egg-ball">
                <div class="egg-top"></div>
                <div class="egg-mid"></div>
                <div class="egg-bot"></div>
                <div class="egg-center"></div>
            </div>
            <div class="egg-text">
                <div class="egg-label">// easter egg encontrado</div>
                <div class="egg-title">Você é incrível!</div>
                <div class="egg-msg">Sabia que eu sou fã de Pokémon? 👾<br>Obrigada por explorar meu portfólio até aqui.</div>
                <button class="egg-close" onclick="document.getElementById('easter-egg').remove()">Fechar → </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('visible'), 10);
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

document.querySelectorAll('#nav-menu a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    }); 
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeIcon.classList.replace('fa-bolt', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');

    if (isLight) {
        themeIcon.classList.replace('fa-bolt', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-bolt');
    }

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let mouse = { x: null, y: null };
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouse.x && mouse.y) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - dist) / 100;
                this.x += Math.cos(angle) * force * 2;
                this.y += Math.sin(angle) * force * 2;
            }
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 70, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(230, 57, 70, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 2000);
});

document.querySelectorAll('.project-card').forEach(card => {
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    card.appendChild(shine);

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotateX = ((y - cy) / cy) * -8;
        const rotateY = ((x - cx) / cx) * 8;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

        const pct_x = (x / rect.width) * 100;
        const pct_y = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${pct_x}% ${pct_y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
        shine.style.background = 'none';
    });
});