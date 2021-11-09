const faq = document.querySelector('.faq');
faq.addEventListener('click', function(e) {
  if (e.target.nodeName === 'BUTTON') {
    if (e.target.getAttribute('aria-expanded') === 'false') {
      const answerId = e.target.getAttribute('aria-controls');
      const targetAnswer = document.getElementById(answerId);
      targetAnswer.style.visibility = 'visible';
      targetAnswer.style.height = targetAnswer.scrollHeight + 'px';

      e.target.setAttribute('aria-expanded', 'true');

      e.target.classList.add('close-icon');
      return;
    }
    if (e.target.getAttribute('aria-expanded') === 'true') {
      const answerId = e.target.getAttribute('aria-controls');
      const targetAnswer = document.getElementById(answerId);
      targetAnswer.style.visibility = 'hidden';
      targetAnswer.style.height = '0px';

      e.target.setAttribute('aria-expanded', 'false');

      e.target.classList.remove('close-icon');
      return;
    }
  }
});

let setAnswerHeight;
window.addEventListener('resize', function(e) {
  const answers = document.querySelectorAll('dd p');
  answers.forEach(function(answer) {
    if (answer.style.height !== '0px' && answer.style.height !== '') {
      answer.style.height = 'auto';
    }
  });

  clearTimeout(setAnswerHeight);
  setAnswerHeight = setTimeout(function() {
    answers.forEach(function(answer) {
      if (answer.style.height !== '0px' && answer.style.height !== '') {
        answer.style.height = answer.scrollHeight + 'px';
      }
    });
  }, 0);
});
