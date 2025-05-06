
document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll (nav links)
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))
              ?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 2. Active-on-scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - section.clientHeight / 3;
      if (pageYOffset >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  });

  // 3. Resume PDF (guard with a null-check)
  const resumeForm = document.getElementById('resumeForm');
  if (resumeForm) {
    const pdfContainer = document.getElementById('pdfContainer');
    const resumeIframe = document.getElementById('resumeIframe');
    const resumeUrl = 'Images/My Cv .pdf';
    resumeForm.addEventListener('submit', e => {
      e.preventDefault();
      if (resumeIframe && pdfContainer) {
        resumeIframe.src = resumeUrl;
        pdfContainer.style.display = 'block';
      }
    });
  }

  // 4. Timeline animations (guard)
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
      });
    }, { threshold: 0.3 });
    timelineItems.forEach(item => observer.observe(item));
  }

  // 5. Expanding timeline content
  document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const desc = item.querySelector('.description');
      if (desc) {
        desc.style.maxHeight =
          desc.style.maxHeight === '0px'
            ? `${desc.scrollHeight}px`
            : '0px';
      }
    });
  });

  // 6. Progress bars
  document.getElementById('html-progress')?.style
  setTimeout(() => {
    document.getElementById('html-progress')?.style.setProperty('width','90%');
    document.getElementById('css-progress')?.style.setProperty('width','95%');
    document.getElementById('js-progress')?.style.setProperty('width','80%');
  }, 2000);

  // 7. Slider
  const slider = document.getElementById('experienceRange');
  if (slider) {
    const sliderValue = document.getElementById('slider-value');
    const expDesc = document.getElementById('experience-description');
    const experienceData = {
      1: 'Started my journey…',
      2: 'Graduated…',
      3: 'Worked full-time…',
      4: 'Specialized…',
      5: 'Building complex…'
    };
    slider.addEventListener('input', () => {
      sliderValue.textContent = 2020 + +slider.value;
      expDesc.textContent = experienceData[slider.value];
    });
  }

  // 8. Finally, init AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
});
