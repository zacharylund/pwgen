// @see https://stackoverflow.com/questions/18230217/javascript-generate-a-random-number-within-a-range-using-crypto-getrandomvalues

function getRandomInt(min, max) {
  const range = max - min + 1;
  const maxRange = 65536;
  const numbers = new Uint16Array(1);

  window.crypto.getRandomValues(numbers);

  if (numbers[0] >= Math.floor(maxRange / range) * range) {
    return getRandomInt(min, max);
  }

  return min + (numbers[0] % range);
}

// eslint-disable-next-line no-unused-vars
function testGetRandomInt() {
  const results = [];

  for (let i = 0; i < 5000000; i += 1) {
    results.push(getRandomInt(1, 49));
  }

  const average = results.reduce((a, b) => a + b, 0) / results.length;

  // eslint-disable-next-line no-console
  console.log(`Average should be close to 25. Actual average: ${average}`);

  return true;
}

const wordLists = [];

function refreshList(list) {
  const length = document.getElementById('password-length').value;
  const count = document.getElementById('password-count').value;
  const numbers = document.getElementById('password-numbers').checked;
  let symbols = [];

  if (document.getElementById('password-symbols').checked) {
    symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
  }

  const words = wordLists[list.dataset.path];

  list.innerHTML = ''; // eslint-disable-line no-param-reassign

  for (let c = 0; c < count; c += 1) {
    const i = getRandomInt(0, words.length - 1);
    let password = words[i];

    for (let l = 1; l < length; l += 1) {
      let separator = '';

      if (numbers) {
        separator += getRandomInt(2, 9);
      }

      if (symbols.length) {
        separator += symbols[getRandomInt(0, symbols.length - 1)];
      }

      const word = words[getRandomInt(0, words.length - 1)];

      password += separator + word.charAt(0).toUpperCase() + word.slice(1);
    }

    list.insertAdjacentHTML('beforeend', `<li class="list-group-item" title="${password.length} characters">${password}</li>`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#password-lists .password-list').forEach((list) => {
    fetch(list.dataset.path).then((response) => response.text()).then((text) => {
      const words = [];

      text.trim().split('\n').forEach((line) => {
        const parts = line.split('\t');

        words.push(parts[1]);
      });

      wordLists[list.dataset.path] = words;

      refreshList(list);
    });
  });

  document.getElementById('password-form').onsubmit = (event) => {
    event.preventDefault();

    document.querySelectorAll('#password-lists .password-list').forEach((list) => {
      refreshList(list);
    });
  };
});
