window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 1000);
});

const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dot');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      const sectionIndex = Array.from(sections).indexOf(entry.target);
      navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === sectionIndex + 1);
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

navDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    if (index === 0) {
      document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    } else {
      sections[index - 1].scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    navDots[0].classList.toggle('active', entry.isIntersecting);
  });
}, { threshold: 0.5 });

heroObserver.observe(document.getElementById('hero'));

let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  // This part needs to be handled via CSS pseudo-element for the body::before
  // The original HTML had inline style for background and animation, and the JS attempted to modify transform directly.
  // For a clean separation, parallax can be a CSS property or handled more robustly if elements are present in HTML.
  // As 'body::before' is a pseudo-element, direct JS manipulation like this is not standard.
  // For now, this function remains but might need adjustment if the parallax effect isn't working as expected.
  
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);

const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;

function typewriterEffect() {
  heroTitle.textContent = '';
  let i = 0;
  
  const typeInterval = setInterval(() => {
    if (i < titleText.length) {
      heroTitle.textContent += titleText.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 150);
}

setTimeout(typewriterEffect, 1500);

const cards = document.querySelectorAll('.section-card');
cards.forEach(card => {
  card.addEventListener('click', (e) => {
    
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    card.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// The @keyframes ripple is now in style.css

let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      
    }, 16); // ~60fps
  }
});

console.log('🚀 Apresentação Serpro carregada com sucesso!');
