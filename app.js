const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.code == 'Space') {
    setRandomColors();
  }
});

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;

  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClipBoard(event.target.innerHTML);
  } else if (type === 'random-button') {
    setRandomColors();
  }
});

function generateRandomColor() {
  const hexCodes = '0123456789ABCDEF';

  let color = '';

  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }

  return '#' + color;
}

function copyToClipBoard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');

    const text = col.querySelector('h2');
    const lock = col.querySelector('button');

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const randomColor = isInitial
      ? colors[index]
        ? colors[index]
        : generateRandomColor()
      : generateRandomColor();

    if (!isInitial) {
      colors.push(randomColor);
    }

    text.innerHTML = randomColor;

    col.style.background = randomColor;

    setTextColor(text, randomColor);
    setTextColor(lock, randomColor);
  });

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map((col) => col.substring(1)).join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color);
  }
  return [];
}

setRandomColors(true);
