(function() {
  const faq = document.querySelector('.faq');
  faq.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
      if (e.target.getAttribute('aria-expanded') === 'false') {
        const answerId = e.target.getAttribute('aria-controls');
        const targetAnswer = document.getElementById(answerId);
        targetAnswer.style.display = 'block';
        e.target.setAttribute('aria-expanded', 'true');
        return;
      }
      if (e.target.getAttribute('aria-expanded') === 'true') {
        const answerId = e.target.getAttribute('aria-controls');
        const targetAnswer = document.getElementById(answerId);
        targetAnswer.style.display = 'none';
        e.target.setAttribute('aria-expanded', 'false');
        return;
      }
    }
  });
})();