 const board = document.querySelector('.game-container') as HTMLElement;
 const button = document.querySelector('.button') as HTMLElement;
 const winMessage = document.querySelector('.winner') as HTMLElement;
 const score = document.querySelector('.score') as HTMLElement;
 const btn = document.querySelector('.btn') as HTMLElement;
 btn.addEventListener("click", resetGame);
 let X = 0;
 let O = 0;
 type Turn = "X" | "O" | "";
 let turn: Turn = "X";
 let moves: { [key in Turn]: string[] } = { X: [], O: [] }; // track moves
 function listenBoard(): void {
     board.addEventListener('click', runGame);
 }
 function main(): void {
     createBoxes();
     listenBoard();
 };
 function runGame(e: Event): void {
     const boxId: string = (<HTMLElement>e.target).id;
     if (boxId === null) return;
     const box: HTMLElement | null = document.getElementById(boxId);
     if (box === null || box.textContent !== "") return;
     box.textContent = turn;
     // Register the move
     moves[turn].push(boxId);
     // Check if there are more than 3 moves for the current player
     if (moves[turn].length > 3) {
         const oldestBoxId = moves[turn].shift(); // remove the oldest move
         const oldestBox = document.getElementById(oldestBoxId!);
         if (oldestBox) {
             oldestBox.textContent = ""; // clear the oldest move
         }
     }
     const winner: boolean = checkWinner();
     if (!winner) switchPlayer();
     else {
         endGame();
     }
 }
 function endGame() {
     board.removeEventListener('click', runGame)
     button.addEventListener('click', resetGame);
     if (winMessage === null) return
     winMessage.textContent = "Winner is " + turn;
     if (turn == "X") {
         X = X + 1;
         score.textContent = `O: ${O} __ X: ${X}`;
     } else {
        O = O + 1;
         score.textContent = `O: ${O} __ X: ${X}`;
     }
     winMessage.style.display = "block";
     button.style.display = "block"
     board.style.opacity = "50%"
 }
 function resetGame(): void {
     board.innerHTML = "";
     createBoxes();
     listenBoard();
     winMessage.style.display = "none";
     button.style.display = "none"
     board.style.opacity = "100%"
     moves = { X: [], O: [] }; // Reset moves tracking
 }
 function checkWinner(): boolean {
     const boxes: Array<string> = getBoxes();
     return (
         (boxes[0] === boxes[1] && boxes[1] === boxes[2] && boxes[0] !== "") ||
         (boxes[3] === boxes[4] && boxes[4] === boxes[5] && boxes[3] !== "") ||
         (boxes[6] === boxes[7] && boxes[7] === boxes[8] && boxes[6] !== "") ||
         (boxes[0] === boxes[4] && boxes[4] === boxes[8] && boxes[0] !== "") ||
         (boxes[2] === boxes[4] && boxes[4] === boxes[6] && boxes[2] !== "") ||
         (boxes[1] === boxes[4] && boxes[4] === boxes[7] && boxes[1] !== "") ||
         (boxes[0] === boxes[3] && boxes[3] === boxes[6] && boxes[0] !== "") ||
         (boxes[2] === boxes[5] && boxes[5] === boxes[8] && boxes[2] !== "")
     );
 }
 function getBoxes(): Array<string> {
     const boxesContent: Array<string> = [];
     for (let i = 0; i <= 8; i++) {
         const box = document.getElementById(`box-${i}`) as HTMLElement;
         const boxContent: string | null = box.textContent;
         if (boxContent === null) boxesContent.push("");
         else {
             boxesContent.push(boxContent);
         }
     }
     return boxesContent;
 }
 function switchPlayer(): void {
     if (turn === "X") {
         turn = "O";
     } else {
         turn = "X";
     }
 }
 function createBoxes(): void {
     for (let i = 0; i < 9; i++) {
         makebox(i);
     }
 }
 function makebox(i: number) {
     const box: HTMLDivElement = document.createElement('div');
     box.className = "box";
     box.textContent = "";
     box.id = `box-${i}`;
     board.appendChild(box);
 };
 main();
