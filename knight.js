const BordaDesenhada = side => {
  for(let r = 0; r < 8; ++r)
    for (let c = 0; c < 8; ++c) {
      const quadrado = document.createElement('div');
      const even = (r + c) % 2 == 0;
      quadrado.className = `${r}-${c}`;
      quadrado.style.backgroundColor = even ? 'white' : 'black';
      quadrado.style.color = even ? 'black' : 'white'; 
      quadrado.style.height = side;
      quadrado.style.left = side * c;
      quadrado.style.position = 'absolute';
      quadrado.style.textAlign = 'center';
      quadrado.style.lineHeight = `${side}px`; 
      quadrado.style.top = side * r;
      quadrado.style.width = side;
      quadrado.style.zIndex = 0;
      document.body.appendChild(quadrado);
    }
  
  const dim = 32;
  const chess = document.createElement('img');
  chess.src = 'chess.png';
  chess.style.height = dim;
  chess.style.left = 8;
  chess.style.position = 'absolute';
  chess.style.top = 8;
  chess.style.width = dim;
  chess.style.zIndex = 1;
  document.body.appendChild(chess); 
}

// -------------tabuleiro-----------------------------------//

let paramX = prompt("selecione o eixo X");
paramX 
let paramY = prompt("selecione o eixo Y");
paramY

console.log(paramX, paramY)

const limite = i => i > -1 && i < 8;

const movimentosForaLimite = (board, r, c, moves) => {
  board[r][c] = 0;
  for(let move of moves)
    if(limite(move.r + r) && limite(move.c + c))
      board[r][c] += 1;
}

const estadoInicial = moves => {
  
  const board = new Array(8);
  for(let r = 0; r < 8; ++r)
    board[r] = new Array(8);
  
  for(let r = 0; r < 8; ++r)
    for (let c = 0; c < 8; ++c)
      movimentosForaLimite(board, r, c, moves);
  
  return board;
}

const tour = (r, c, moves, moveNumber, board, side) => {
  if (moveNumber > 64)
    return;

  let nextR = 0, nextC = 0, minimoForaSaida = 9;

  for(let move of moves) {
    const candidateR = move.r + r;
    const candidateC = move.c + c;
    if(limite(candidateR) && limite(candidateC) && board[candidateR][candidateC] < minimoForaSaida) {
      minimoForaSaida = board[candidateR][candidateC];
      nextR = candidateR;
      nextC = candidateC;
      
    }
  }
  
  board[r][c] = 100;

  for(let move of moves) {
    const neighborR = move.r + r;
    const neighborC = move.c + c;
    if(limite(neighborR) && limite(neighborC)) {
      board[neighborR][neighborC]--;
    }
  }

  document.getElementsByClassName(`${r}-${c}`)[0].textContent = moveNumber;
  const chess = document.getElementsByTagName('img')[0];
  chess.style.top = r * side + 8;
  chess.style.left = c * side + 8;


  setTimeout(() => {
      
    tour(nextR, nextC, moves, moveNumber + 1, board, side);
    console.log(r + 1, c +1)

    let amzR = []
    let amzC = [] 
    
    amzR [amzR.length] = r
    amzC [amzC.length] = c

    if(amzR && amzC == (nextR,nextC)){
      alert('DUPLICADO, POR FAVOR, SELECIONE OUTRO PARAMETRO')
    }    

  }, 500);

} 


document.addEventListener('DOMContentLoaded', () => {
  const moves = [
    {r: -2, c: -1},
    {r: -2, c:  1},
    {r:  2, c: -1},
    {r:  2, c:  1},
    {r: -1, c: -2},
    {r: -1, c:  2},
    {r:  1, c: -2},
    {r:  1, c:  2},
  ];
  const side = 50;

  BordaDesenhada(side);
  const board = estadoInicial(moves);

  tour(paramX, paramY, moves, 1, board, side);  
  
  
});
