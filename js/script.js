document.addEventListener('DOMContentLoaded', () => {
  const phaseThreeStyles = document.createElement('link'); phaseThreeStyles.rel = 'stylesheet'; phaseThreeStyles.href = 'css/phase3.css'; document.head.appendChild(phaseThreeStyles);
  const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link'); favicon.rel = 'icon'; favicon.type = 'image/png'; favicon.href = 'assets/favicon-logo.png'; if (!favicon.parentNode) document.head.appendChild(favicon);
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu');
    }));
  }
  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
  document.querySelectorAll('.brand-footer').forEach(brand => { const logo = document.createElement('img'); logo.className = 'brand-logo'; logo.src = 'assets/logo.png'; logo.alt = 'Nexovision Group'; logo.onerror = () => logo.remove(); brand.prepend(logo); });
  const icons = { strategy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17 10 11l4 4 6-8M16 7h4v4"/></svg>', gst: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM15 3v5h4M9 13h6M9 17h6"/></svg>', process: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5zM10 7.5h4M7.5 10v4M16.5 10v4"/></svg>', phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h3l2 5-2 1.5a14 14 0 0 0 4.5 4.5L16 12l5 2v3c0 1.1-.9 2-2 2C10.2 19 5 13.8 5 5c0-1.1.9-2 2-2Z"/></svg>', whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.6.1-2.8-.9-5.2-3.3-6.1-6.1-.2-.6-.1-1.2.1-1.6Z"/></svg>', email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg>', hours: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>' };
  document.querySelectorAll('.detail-card .service-icon').forEach(icon => { const heading = icon.parentElement.querySelector('h3')?.textContent || ''; icon.innerHTML = heading.includes('Process') ? icons.process : heading.includes('GST') ? icons.gst : icons.strategy; });
  document.querySelectorAll('.contact-list > *').forEach(item => { const label = item.querySelector('small')?.textContent || ''; const icon = item.querySelector(':scope > span'); if (icon) icon.innerHTML = label.includes('WhatsApp') ? icons.whatsapp : label.includes('Call') ? icons.phone : label.includes('Email') ? icons.email : icons.hours; });
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) testimonialSlider.insertAdjacentHTML('beforeend', '<article class="testimonial"><div class="quote">“</div><blockquote>We received clear guidance on the documents and the funding process. The support was prompt, professional and easy to understand.</blockquote><footer><strong>Wholesale Business Owner</strong><span>Aurangabad, Maharashtra</span></footer></article><article class="testimonial"><div class="quote">“</div><blockquote>The team took time to understand our requirements before advising us. It gave us the confidence to plan our next stage of growth.</blockquote><footer><strong>Services Business Founder</strong><span>Mumbai, Maharashtra</span></footer></article><article class="testimonial"><div class="quote">“</div><blockquote>From the first eligibility discussion to the final follow-up, Nexovision kept the process transparent and well organised.</blockquote><footer><strong>Retail Business Owner</strong><span>Nagpur, Maharashtra</span></footer></article>');

  const eligibilityForm = document.getElementById('eligibility-form');
  if (eligibilityForm) eligibilityForm.addEventListener('submit', event => {
    event.preventDefault(); if (!eligibilityForm.checkValidity()) { eligibilityForm.reportValidity(); return; }
    const data = new FormData(eligibilityForm);
    const amount = Math.round(Number(data.get('turnover')) * 8 * Number(data.get('vintage')) * Number(data.get('gst')) / 100000) * 100000;
    const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.max(amount, 500000));
    document.getElementById('form-result').textContent = `Thank you, ${data.get('name')}. Based on these broad details, your indicative funding discussion could begin around ${formatted}. A Nexovision advisor will confirm the appropriate route.`;
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', event => {
    event.preventDefault(); if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
    document.getElementById('contact-result').textContent = `Thank you, ${new FormData(contactForm).get('name')}. Your enquiry is ready for our team. Please call or WhatsApp us for an immediate response.`;
    contactForm.reset();
  });

  const slides = [...document.querySelectorAll('.testimonial')]; const dots = document.querySelector('.slider-dots');
  if (slides.length && dots) {
    let active = 0;
    const showSlide = index => { active = (index + slides.length) % slides.length; slides.forEach((slide, i) => slide.classList.toggle('is-active', i === active)); dots.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('active', i === active)); };
    slides.forEach((_, index) => { const dot = document.createElement('button'); dot.type = 'button'; dot.setAttribute('aria-label', `Show testimonial ${index + 1}`); dot.addEventListener('click', () => showSlide(index)); dots.appendChild(dot); });
    showSlide(0); document.querySelector('.previous').addEventListener('click', () => showSlide(active - 1)); document.querySelector('.next').addEventListener('click', () => showSlide(active + 1));
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
});
