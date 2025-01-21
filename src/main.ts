import './style.css';

const inputElement = document.getElementById('input') as HTMLTextAreaElement;
const outputElement = document.getElementById('output') as HTMLTextAreaElement;
const convertBtn = document.getElementById('btn-convert') as HTMLButtonElement;
const copyBtn = document.getElementById('btn-copy') as HTMLButtonElement;

convertBtn.addEventListener('click', () => {
  const trimedText = inputElement.value.trim();
  const splitedTextByLine = trimedText.split(/\n/);

  const editedLines = splitedTextByLine.map((string, index, array) => {
    const spaceLength = getSpaceLength(string);
    const trimedText = string.trimStart();

    if (!trimedText.startsWith('-')) {
      return string;
    }

    const removeHyphenText = trimedText.replace('- ', '').trim();

    const removedEndColonText = removeHyphenText.endsWith(':') ? removeHyphenText.slice(0, -1) : removeHyphenText;

    let symbolStart: string = '';
    let symbolEnd: string = '';

    if (spaceLength === 0) {
      symbolStart = '[ ';
      symbolEnd = ' ]';

      if (array[index - 1]) {
        symbolStart = '\n[ ';
      }
    }

    if (spaceLength === 2) {
      if (array[index - 1]) {
        const prevSpaceLength = getSpaceLength(array[index - 1]);
        symbolStart = ' ';

        if (prevSpaceLength > spaceLength || prevSpaceLength === spaceLength) {
          symbolStart = ' / ';
        }
      }

      if (array[index + 1]) {
        const nextSpaceLength = getSpaceLength(array[index + 1]);
        if (spaceLength !== nextSpaceLength && nextSpaceLength > spaceLength) {
          symbolEnd = ' - ';
        }
      }
    }

    if (spaceLength === 4) {
      symbolStart = ', ';

      if (array[index - 1]) {
        const prevSpaceLength = getSpaceLength(array[index - 1]);

        if (prevSpaceLength < spaceLength) {
          symbolStart = '';
        }
      }
    }

    if (spaceLength >= 6) {
      symbolStart = ', ';
    }

    return symbolStart + removedEndColonText.trim() + symbolEnd;
  });

  function getSpaceLength(string: string) {
    return string.length - string.trimStart().length;
  }

  outputElement.value = editedLines.join('');
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputElement.value).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1000);
  });
});
