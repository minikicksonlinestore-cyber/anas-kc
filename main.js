// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar background blur on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(8, 11, 18, 0.9)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(8, 11, 18, 0.7)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load

// Elegant Space Canvas Background
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        
        // Premium tech colors
        const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.opacity = Math.random() * 0.5 + 0.1;
        this.opacityChange = Math.random() * 0.005 - 0.0025;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Subtle Mouse Parallax Effect
        this.x -= mouse.x * 0.0002 * this.size;
        this.y -= mouse.y * 0.0002 * this.size;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.opacity += this.opacityChange;
        if (this.opacity < 0.1 || this.opacity > 0.6) {
            this.opacityChange *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

const initParticles = () => {
    particles = [];
    const particleCount = Math.floor(width * height / 20000); // Less particles for cleaner look
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
};

// Mouse interaction
let mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x - width / 2;
    mouse.y = e.y - height / 2;
});

const animate = () => {
    ctx.clearRect(0, 0, width, height);
    
    // Draw deep slate background gradient
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    gradient.addColorStop(0, '#111827');
    gradient.addColorStop(1, '#080b12');
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, width, height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
};

initParticles();
animate();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});
