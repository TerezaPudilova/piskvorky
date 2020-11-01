'use strict';

let player = 'circle';
let played = ''
const playerdiv = document.querySelector('.player');
const boardSize = 10;
const board = document.querySelectorAll('.button');

board.forEach((item) => {
  item.addEventListener('click', (event) => {
    played = player
    if (item.className === 'button') {
      if (player === 'circle') {
        item.className = 'button--circle';
        player = 'cross';
        playerdiv.innerHTML = ` HRAJE:  <svg width="24" height="24" version="1.1" viewBox="0 0 6.35 6.35" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0,-290.65)">
         <path d="m6.0854 296.03-2.2274-2.2059 2.2051-2.225-0.68686-0.68079-2.2046 2.2262-2.2255-2.2042-0.68152 0.68151 2.2279 2.2083-2.2059 2.2274 0.68152 0.68152 2.21-2.2294 2.2265 2.2071z" stroke-width=".24253"/>
        </g>
       </svg>`;
      } else {
        item.className = 'button--cross';
        player = 'circle';
        playerdiv.innerHTML = ` HRAJE:  <svg width="24" height="24" version="1.1" viewBox="0 0 6.35 6.35" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0,-290.65)">
       <path d="m3.175 290.65c-1.7526 0-3.175 1.4224-3.175 3.175s1.4224 3.175 3.175 3.175 3.175-1.4224 3.175-3.175-1.4224-3.175-3.175-3.175zm0 0.74706c1.3402 0 2.4279 1.0877 2.4279 2.4279s-1.0877 2.4279-2.4279 2.4279-2.4279-1.0877-2.4279-2.4279 1.0877-2.4279 2.4279-2.4279z" stroke-width="10"/>
      </g>
     </svg>`;
      }
    }
    if(isWinningMove(item)) {
      let r = confirm("Vyhrál" + " " + played)
      if (r === true) location.reload();
    }
  });
});

function getPosition(field) {
  let convertedField = 0;
  for (let i = 0; i < board.length; i++) {
    if (field === board[i]) {
      convertedField = i
      break
    }
  }
  convertedField = String(convertedField)
  if (convertedField.length === 1) {
    return {
      row: 0,
      column: Number(convertedField),
    };
  } else {
    return {
      row: Number(convertedField[0]),
      column: Number(convertedField[1]),
    };
  }
}

function getField(row, column) {
  if (row === 0) {
    return board[column]
  } else {
    return board[Number(`${row}${column}`)]
  }
}

function getSymbol(field) {
  if (field.className.includes('button--cross')) {
    return 'cross';
  } else if (field.className.includes('button--circle')) {
    return 'circle';
  } else {
    return undefined;
  }
}

function isWinningMove(field) {
  const position = getPosition(field);
  let counter = 0;
  for (let i = 0; i < boardSize; i++) {
    const policko = getField(position.row,i);
    const symbol = getSymbol(policko);
    if (symbol !== undefined) {
      if (symbol === played) counter++;
    }
    if (counter === 5) {
     return true
    } 
  }
  return false
  
  /* const position = getPosition(field);
  let counterCross = 0;
  let counterCircle = 0;
  for (let i = 0; i < boardSize; i++) {
    const policko = getField(position.row,i);
    const symbol = getSymbol(policko);
    if (symbol !== undefined) {
      if (symbol === "cross") counterCross++;
      else if (symbol === "circle") counterCircle++;
    }
    if (counterCircle === 5) {
      alert("Vyhrál kroužek")
      break
    } else if (counterCross === 5) {
      alert("Vyhrál křížek")
      break
    }
  } */
}
