// Dark mode toggle with persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme){ root.classList.toggle('light', savedTheme === 'light'); }
themeToggle?.addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Back to top
document.getElementById('toTop')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({top:0, behavior:'smooth'});
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection fade-in for project cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('[data-animate]').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});
// Add the 'in' class when visible
const style = document.createElement('style');
style.textContent = `[data-animate].in{opacity:1 !important; transform: none !important}`;
document.head.appendChild(style);

// Simple client-side contact validation (non-functional submit)
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const errors = {
    name: name.value.trim() ? '' : 'Please enter your name',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Enter a valid email address',
    message: message.value.trim().length >= 10 ? '' : 'Please write at least 10 characters'
  };
  document.getElementById('nameError').textContent = errors.name;
  document.getElementById('emailError').textContent = errors.email;
  document.getElementById('messageError').textContent = errors.message;
  const ok = !errors.name && !errors.email && !errors.message;
  if(ok){
    alert('Thanks! This demo form is client-side only. Replace with your backend or Formspree.');
    form.reset();
  }
});
