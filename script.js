// Custom Cursor Logic
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Hover effect for links and buttons
const hoverElements = document.querySelectorAll('a, button, .trend-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.background = 'var(--primary)';
        cursor.style.mixBlendMode = 'normal';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.background = 'transparent';
        cursor.style.mixBlendMode = 'difference';
    });
});

// Scroll Reveal Logic
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add revealing classes to elements
document.querySelectorAll('.trend-card, .text-block, .visual-block, .hero-content').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Parallax effect for hero image
document.addEventListener('mousemove', (e) => {
    const heroImg = document.querySelector('.hero-img');
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    
    if (heroImg) {
        heroImg.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamically update bar heights in the visual block for effect
setInterval(() => {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 80) + 20;
        bar.style.height = randomHeight + '%';
        bar.style.transition = 'height 1s ease';
    });
}, 2000);

// Modal Logic
const modal = document.getElementById('trend-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.trend-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const detail = card.getAttribute('data-detail');
        
        modalTitle.textContent = title;
        modalDesc.textContent = detail;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
});

// Join Form Logic
const joinForm = document.getElementById('join-form');
const feedback = document.getElementById('form-feedback');
const greetingScreen = document.getElementById('greeting-screen');
const returnBtn = document.querySelector('.return-btn');

if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('user-name-input').value;
        const personalGreeting = document.getElementById('personal-greeting');
        
        feedback.textContent = "Initializing connection...";
        
        setTimeout(() => {
            feedback.textContent = "";
            personalGreeting.textContent = `Welcome to the Nexus, ${userName}`;
            greetingScreen.classList.add('active');
            joinForm.reset();
        }, 1500);
    });
}

if (returnBtn) {
    returnBtn.addEventListener('click', () => {
        greetingScreen.classList.remove('active');
    });
}
