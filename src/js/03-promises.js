const refs = {
  form: document.querySelector('form'),
  inputFields: document.querySelectorAll('input'),
  labels: document.querySelectorAll('label'),
  createButton: document.querySelector('button'),
  delay: document.getElementsByName('delay'),
  step: document.getElementsByName('step'),
  amount: document.getElementsByName('amount'),
};

refs.labels.forEach(element => {
  element.style.marginRight = '100px';
  element.style.display = 'inline-block';
  element.style.maxWidth = '200px';
  element.style.fontSize = '25px';
  element.style.fontWeight = '500';
});

refs.inputFields.forEach(input => {
  input.style.height = '40px';
  input.style.padding = '10px';
  input.style.fontSize = '20px';
  input.style.fontWeight = 'bold';
});

refs.createButton.style.height = '40px';
refs.createButton.style.fontSize = '20px';
refs.createButton.style.fontWeight = 'bold';

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  let firstDelay = Number(formElements.delay.value);
  const delayStep = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += delayStep;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
