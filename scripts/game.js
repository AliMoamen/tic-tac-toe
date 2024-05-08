let playerMove = 1;
const p1Mark = localStorage.getItem("p1Mark") || "x";
const cpu = localStorage.getItem("cpu-xo") || "false";
const playerSign = { 0: "ties", 1: "x", 2: "o" };
const playerColor = { 0: "#1f3641", 1: "#65E9E4", 2: "#F2B137" };
let score = JSON.parse(localStorage.getItem("score-xo")) || {
  "x-score": 0,
  "ties-score": 0,
  "o-score": 0,
};
const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

if (cpu === "false") {
  var playerMark = p1Mark === "x" ? { 1: 1, 2: 2 } : { 1: 2, 2: 1 };
  $(".score-label-x").text(`X (P${playerMark[1]})`);
  $(".score-label-o").text(`O (P${playerMark[2]})`);
} else {
  var playerMark =
    p1Mark === "x" ? { 1: "YOU", 2: "CPU" } : { 1: "CPU", 2: "YOU" };
  var cpuMove = p1Mark === "x" ? 2 : 1;
  $(".score-label-x").text(`X (${playerMark[1]})`);
  $(".score-label-o").text(`O (${playerMark[2]})`);
}

setScores();

for (let i = 1; i <= 3; i++) {
  for (let l = 1; l <= 3; l++) {
    let button = `.move-box-${i}${l}`;
    addEvents(button, i - 1, l - 1);
  }
}

function setScores() {
  $(".x-score").text(score["x-score"]);
  $(".ties-score").text(score["ties-score"]);
  $(".o-score").text(score["o-score"]);
}

function addEvents(button, row, col) {
  $(button).click(() => {
    board[row][col] += playerMove;
    $(button).html(`<img src = "assets/icon-${playerSign[playerMove]}.svg">`);
    playerMove = playerMove === 2 ? 1 : 2;
    $(".player-turn").attr(
      "src",
      `assets/icon-${playerSign[playerMove]}-grey.svg`
    );
    winner = checkWin(board);
    if (winner !== undefined) {
      $(":button").off();
      $(":button").css("cursor", "auto");
      score[`${playerSign[winner]}-score`] += 1;
      localStorage.setItem("score-xo", JSON.stringify(score));
      $(`.${playerSign[winner]}-score`).text(
        score[`${playerSign[winner]}-score`]
      );
      setTimeout(() => {
        if (winner === 0) {
          var overlayHTML = `
          <div class="overlay">
            <div class="result-box">
              <div class="result-information-box">
                ROUND TIED
              </div>
              <div class="result-button-box">
                <button class="quit-button gray-button">QUIT</button>
                <button class="next-round-button orange-button">NEXT ROUND</button>
              </div>
            </div>
          </div>`;
        } else {
          if (cpu === "true") {
            if (
              (p1Mark === "x" && winner === 1) ||
              (p1Mark === "o" && winner === 2)
            ) {
              var overlayHTML = `
              <div class="overlay">
                <div class="result-box">
                  <p>YOU WON!</p>
                  <div class="result-information-box">
                    <img src="assets/icon-${playerSign[winner]}.svg" alt="">
                    TAKES THE ROUND
                  </div>
                  <div class="result-button-box">
                    <button class="quit-button gray-button">QUIT</button>
                    <button class="next-round-button orange-button">NEXT ROUND</button>
                  </div>
                </div>
              </div>`;
            } else {
              var overlayHTML = `
              <div class="overlay">
                <div class="result-box">
                  <p>OH NO, YOU LOST...</p>
                  <div class="result-information-box">
                    <img src="assets/icon-${playerSign[winner]}.svg" alt="">
                    TAKES THE ROUND
                  </div>
                  <div class="result-button-box">
                    <button class="quit-button gray-button">QUIT</button>
                    <button class="next-round-button orange-button">NEXT ROUND</button>
                  </div>
                </div>
              </div>`;
            }
          } else {
            var overlayHTML = `
            <div class="overlay">
              <div class="result-box">
                <p>PLAYER ${playerMark[winner]} WINS!</p>
                <div class="result-information-box">
                  <img src="assets/icon-${playerSign[winner]}.svg" alt="">
                  TAKES THE ROUND
                </div>
                <div class="result-button-box">
                  <button class="quit-button gray-button">QUIT</button>
                  <button class="next-round-button orange-button">NEXT ROUND</button>
                </div>
              </div>
            </div>
            `;
          }
        }

        $("body").append(overlayHTML);
        if (winner !== 0) {
          $(".result-information-box").css("color", playerColor[winner]);
        }
        $(".next-round-button").click(() => {
          $(".overlay").remove();
          restartGame();
        });
        $(".quit-button").click(() => {
          window.location.href = "index.html";
        });
      }, 2000);
    } else {
      if (cpu === "true" && playerMove === cpuMove) {
        var timeout = setTimeout(() => cpuTurn(board), 50);
      }
    }

    $(button).css("cursor", "auto");
    $(button).off();
  });
  $(button).hover(
    () =>
      $(button).html(
        `<img src = "assets/icon-${playerSign[playerMove]}-outline.svg">`
      ),
    () => $(button).html("")
  );
}
function restartButton() {
  $(".restart-button").hover(
    () => $(".restart-button").css("background-color", "#d8e8ed"),
    () => $(".restart-button").css("background-color", "#a8bfc9")
  );
  $(".restart-button").click(() => {
    var overlayHTML = `
    <div class="overlay">
      <div class="result-box">
        <div class="result-information-box">
          RESTART GAME ?
        </div>
        <div class="result-button-box">
          <button class="cancel-button gray-button">NO, CANCEL</button>
          <button class="yes-button orange-button">YES, RESTART</button>
        </div>
      </div>
    </div>`;
    $("body").append(overlayHTML);
    $(".cancel-button").click(() => {
      $(".overlay").remove();
    });
    $(".yes-button").click(() => {
      $(".overlay").remove();
      restartGame(true);
    });
  });
}
restartButton();
function restartGame(resetScore = false) {
  if (resetScore) {
    score = {
      "x-score": 0,
      "ties-score": 0,
      "o-score": 0,
    };
    setScores();
  }
  localStorage.setItem("score-xo", JSON.stringify(score));
  for (let i = 1; i <= 3; i++) {
    for (let l = 1; l <= 3; l++) {
      board[i - 1][l - 1] = 0;
      let button = `.move-box-${i}${l}`;
      $(button).off();
      $(button).html("");
      $(button).css("background-color", playerColor[0]);
      $(".player-turn").attr("src", "assets/icon-x-grey.svg");
      playerMove = 1;
      addEvents(button, i - 1, l - 1);
    }
  }
  $(":button").css("cursor", "pointer");
  restartButton();
  if (cpu === "true" && playerMove === cpuMove) {
    setTimeout(() => cpuTurn(board), 50);
  }
}
function cpuTurn(board) {
  let valid = false;
  while (!valid) {
    var row = Math.floor(Math.random() * 3);
    var col = Math.floor(Math.random() * 3);
    valid = board[row][col] === 0 ? true : false;
  }
  let move = [row, col];
  $(`.move-box-${move[0] + 1}${move[1] + 1}`).click();
}

function checkWin(board) {
  const allEqual = (arr) => arr.every((val) => val === arr[0] && arr[0] !== 0);
  const isEmpty = (arr) => arr.some((val) => val === 0);
  let filled = true;
  // Horizontal Win
  for (let i = 0; i < board.length; i++) {
    if (allEqual(board[i])) {
      let winner = board[i][0];
      for (let l = 1; l <= 3; l++) {
        let button = `.move-box-${i + 1}${l}`;
        $(button).html(
          `<img src = "assets/icon-${playerSign[winner]}-black.svg">`
        );
        $(button).css(`background-color`, playerColor[winner]);
      }
      return winner;
    }
    if (isEmpty(board[i]) && filled) {
      filled = false;
    }
  }
  // Vertical Win
  for (let i = 0; i < board.length; i++) {
    let col = [];
    for (let l = 0; l < board.length; l++) {
      col.push(board[l][i]);
    }
    if (allEqual(col)) {
      let winner = col[0];
      for (let l = 1; l <= 3; l++) {
        let button = `.move-box-${l}${i + 1}`;
        $(button).html(
          `<img src = "assets/icon-${playerSign[winner]}-black.svg">`
        );
        $(button).css(`background-color`, playerColor[winner]);
      }
      return winner;
    }
  }
  // Diagonal Win
  let negativeDiagonal = [board[0][0], board[1][1], board[2][2]];
  let positiveDiagonal = [board[2][0], board[1][1], board[0][2]];

  if (allEqual(negativeDiagonal)) {
    let winner = negativeDiagonal[0];
    $(".move-box-11").html(
      `<img src = "assets/icon-${playerSign[winner]}-black.svg">`
    );
    $(".move-box-11").css(`background-color`, playerColor[winner]);
    $(".move-box-22").html(
      `<img src = "assets/icon-${playerSign[winner]}-black.svg">`
    );
    $(".move-box-22").css(`background-color`, playerColor[winner]);
    $(".move-box-33").html(
      `<img src = "assets/icon-${playerSign[winner]}-black.svg">`
    );
    $(".move-box-33").css(`background-color`, playerColor[winner]);
    return winner;
  } else if (allEqual(positiveDiagonal)) {
    let winner = positiveDiagonal[0];
    $(".move-box-31").html(
      `<img src = "assets/icon-${playerSign[winner]}-black.svg">`
    );
    $(".move-box-31").css(`background-color`, playerColor[winner]);
    $(".move-box-22").html(
      `<img src = "assets/icon-${playerSign[winner]}-black.svg">`
    );
    $(".move-box-22").css(`background-color`, playerColor[winner]);
    $(".move-box-13").html(
      `<img src = "assets/icon-${playerSign[winner]}-black.svg">`
    );
    $(".move-box-13").css(`background-color`, playerColor[winner]);
    return winner;
  }
  // Tie
  if (filled) {
    return 0;
  }
}
if (cpu === "true" && playerMove === cpuMove) {
  setTimeout(() => cpuTurn(board), 50);
}
