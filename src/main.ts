import './style.css';

/* 
  - - を識別する
  - 余白を識別する
  - 階層1つ目 []
  - 階層2つ目　/
  - 階層3つ目 ,
  - 行で区切る
  - そこから形成する
*/

const inputElement = document.getElementById('input') as HTMLTextAreaElement;
const outputElement = document.getElementById('output') as HTMLTextAreaElement;
const convertBtn = document.getElementById('btn-convert') as HTMLButtonElement;

convertBtn.addEventListener('click', () => {
  const trimedText = inputElement.value.trim();
  const splitedTextByLine = trimedText.split(/\n/);

  console.log(splitedTextByLine);

  const editedLines = splitedTextByLine.map((string, index, array) => {
    const spaceLength = getSpaceLength(string);
    const trimedText = string.trimStart();

    // もし `-` が先頭にこばない場合はスルーする
    
    const removeHyphenText = trimedText.replace('- ', '');
    console.log(removeHyphenText);

    let symbolStart: string = '';
    let symbolEnd: string = '';
    if (spaceLength === 0) {
      symbolStart = '【 ';
      symbolEnd = ' 】';
    } else if (spaceLength === 2) {
      symbolStart = '';
      symbolEnd = ', ';
    } else if (spaceLength === 4) {
      symbolStart = '';
      symbolEnd = ', ';
    }

    // 前のスペースと比べて、大きくなっていれば、 / で区切りを入れる

    return symbolStart + removeHyphenText + symbolEnd;
  });

  function getSpaceLength(string: string) {
    return string.length - string.trimStart().length;
  }

  console.log(editedLines);

  outputElement.value = editedLines.join('');
});
