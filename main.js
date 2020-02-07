const turn = document.querySelector("#turn");
const totalMoves = document.querySelector("#totalmoves");
let moveCounter = 1;
let debug = 0;
let full = 0;
let numX = parseInt(localStorage.getItem("value"));
let numY = numX;
localStorage.removeItem("value");

document.querySelector(
  "#boardSize"
).textContent = `Chosen board size: ${numX} x ${numY}`;

function createBoard() {
  //skapar spelplan enligt användarinput
  let rowCount = 0;
  while (numY > rowCount) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("divRow");
    board.appendChild(newDiv);
    let btnCountX = 0;
    total = numY * numX;
    while (btnCountX < numX) {
      const newBtn = document.createElement("button");
      if (numX >= 13 || numY >= 13) {
        newBtn.classList.add("btnClassEmptySmall");
      } else {
        newBtn.classList.add("btnClassEmpty");
      }
      newDiv.appendChild(newBtn);
      newBtn.id = "btn" + btnCountX;
      btnCountX += 1;
    }
    rowCount += 1;
  }
}
createBoard();
const allBtns = document.querySelectorAll("button");

function winCode(winImage) {
  document.querySelector("#winner").classList.remove("hidden");
  document.querySelector("img").src = winImage;
  document.querySelector("#restartButton").classList.remove("hidden");
  turn.classList.add("hidden");

  for (let x = 0; x < document.querySelectorAll(".btnClassEmpty").length; x++) {
    document.querySelectorAll(".btnClassEmpty")[x].classList.add("VisHide");
  }

  for (
    let x = 0;
    x < document.querySelectorAll(".btnClassEmptySmall").length;
    x++
  ) {
    document
      .querySelectorAll(".btnClassEmptySmall")
      [x].classList.add("VisHide");
  }
}

function winCalc(num, btnclass, winImage) {
  //win conditions

  for (let x = 0; x < allBtns.length; x++) {
    if (x + 4 < allBtns.length) {
      if (
        allBtns[x].classList.contains(btnclass) && //vågrätt win
        allBtns[x + 1].classList.contains(btnclass) &&
        allBtns[x + 1].id == `btn${(x % numX) + 1}` &&
        allBtns[x + 2].classList.contains(btnclass) &&
        allBtns[x + 2].id == `btn${(x % numX) + 2}` &&
        allBtns[x + 3].classList.contains(btnclass) &&
        allBtns[x + 3].id == `btn${(x % numX) + 3}` &&
        allBtns[x + 4].classList.contains(btnclass) &&
        allBtns[x + 4].id == `btn${(x % numX) + 4}`
      ) {
        winCode(winImage);
      }
    }
    if (x + num * 4 < allBtns.length) {
      if (
        allBtns[x].classList.contains(btnclass) && //lodrätt win
        allBtns[x + num].classList.contains(btnclass) &&
        allBtns[x + num * 2].classList.contains(btnclass) &&
        allBtns[x + num * 3].classList.contains(btnclass) &&
        allBtns[x + num * 4].classList.contains(btnclass)
      ) {
        winCode(winImage);
      }
    }
    if (x + num * 4 + 4 < allBtns.length) {
      if (
        allBtns[x].classList.contains(btnclass) && //diagonal win
        allBtns[x + num + 1].classList.contains(btnclass) &&
        allBtns[x + num + 1].id === `btn${(x % numX) + 1}` &&
        allBtns[x + num * 2 + 2].classList.contains(btnclass) &&
        allBtns[x + num * 2 + 2].id === `btn${(x % numX) + 2}` &&
        allBtns[x + num * 3 + 3].classList.contains(btnclass) &&
        allBtns[x + num * 3 + 3].id === `btn${(x % numX) + 3}` &&
        allBtns[x + num * 4 + 4].classList.contains(btnclass) &&
        allBtns[x + num * 4 + 4].id === `btn${(x % numX) + 4}`
      ) {
        winCode(winImage);
      }
    }
    if (x + num * 4 - 4 < allBtns.length) {
      if (
        allBtns[x].classList.contains(btnclass) && //diagonal win
        allBtns[x + num - 1].classList.contains(btnclass) &&
        allBtns[x + num - 1].id === `btn${(x % numX) - 1}` &&
        allBtns[x + num * 2 - 2].classList.contains(btnclass) &&
        allBtns[x + num * 2 - 2].id === `btn${(x % numX) - 2}` &&
        allBtns[x + num * 3 - 3].classList.contains(btnclass) &&
        allBtns[x + num * 3 - 3].id === `btn${(x % numX) - 3}` &&
        allBtns[x + num * 4 - 4].classList.contains(btnclass) &&
        allBtns[x + num * 4 - 4].id === `btn${(x % numX) - 4}`
      ) {
        winCode(winImage);
      }
    }
  }
}

function clickFunction(event) {
  //function för click event

  if (event.target.classList.contains("btnClassEmptySmall")) {
    if (turn.textContent === "Yellow players turn!") {
      turn.textContent = "Purple players turn!";
      event.target.classList.replace("btnClassEmptySmall", "btncontentXSmall");
      totalMoves.textContent = "Total moves: " + moveCounter++;
    } else {
      turn.textContent = "Yellow players turn!";
      event.target.classList.replace("btnClassEmptySmall", "btncontentOSmall");
      totalMoves.textContent = "Total moves: " + moveCounter++;
    }

    winCalc(numX, "btncontentOSmall", "pics/cirpup.png");
    winCalc(numX, "btncontentXSmall", "pics/ciryellow.png");
    drawFunc("btnClassEmptySmall");
  }

  //för stora knappar
  if (event.target.classList.contains("btnClassEmpty")) {
    if (turn.textContent === "Yellow players turn!") {
      turn.textContent = "Purple players turn!";
      event.target.classList.replace("btnClassEmpty", "btncontentX");
      totalMoves.textContent = "Total moves: " + moveCounter++;
    } else {
      turn.textContent = "Yellow players turn!";
      event.target.classList.replace("btnClassEmpty", "btncontentO");
      totalMoves.textContent = "Total moves: " + moveCounter++;
    }

    winCalc(numX, "btncontentO", "pics/cirpup.png");
    winCalc(numX, "btncontentX", "pics/ciryellow.png");
    drawFunc("btnClassEmpty");
  }
  drawFunc;
}

document.addEventListener("click", clickFunction);

function drawFunc(emptyClass) {
  if (event.target.classList.contains(emptyClass) == false) {
    full++;
    console.log(full);
    if (full == allBtns.length) {
      document.querySelector("#restartButton").classList.remove("hidden");
      turn.classList.add("hidden");
      document.querySelector("#winner").textContent = "Draw!";
      document.querySelector("#winner").classList.remove("hide");
    }
  }
}
