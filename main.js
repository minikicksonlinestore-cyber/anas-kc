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
        navbar.style.background = 'rgba(5, 5, 16, 0.8)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(5, 5, 16, 0.6)';
        navbar.style.boxShadow = 'none';
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

// Space Canvas Background (Stars and Particles)
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
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Randomly pick color (blue, purple, cyan, or white)
        const colors = ['#00f3ff', '#bc13fe', '#0ff0fc', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.opacity = Math.random();
        this.opacityChange = Math.random() * 0.02 - 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse Parallax Effect
        this.x -= mouse.x * 0.0005 * this.size;
        this.y -= mouse.y * 0.0005 * this.size;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.opacity += this.opacityChange;
        if (this.opacity < 0.1 || this.opacity > 1) {
            this.opacityChange *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

const initParticles = () => {
    particles = [];
    const particleCount = Math.floor(width * height / 15000); // Responsive amount
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
    
    // Draw deep space background gradient
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(1, '#020205');
    
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
