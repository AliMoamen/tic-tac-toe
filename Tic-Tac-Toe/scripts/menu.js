localStorage.setItem("p1Mark", "x");
localStorage.setItem("cpu-xo", "false");
const score = {
  "x-score": 0,
  "ties-score": 0,
  "o-score": 0,
};
localStorage.setItem("score-xo", JSON.stringify(score));
function activateX() {
  $(".x-mark-button").click(() => {
    $(".x-mark-button").html('<img src="assets/icon-x-black.svg" alt="">');
    $(".x-mark-button").css("background-color", "#a8bfc9");
    $(".o-mark-button").css("background-color", "#1a2a33");
    $(".o-mark-button").html('<img src="assets/icon-o-grey.svg" alt="">');
    $(".o-mark-button").hover(
      () => {
        $(".o-mark-button").css("background-color", "#21313a");
      },
      () => {
        $(".o-mark-button").css("background-color", "#1a2a33");
      }
    );
    $(".x-mark-button").off();
    activateO();
  });
}

function activateO() {
  $(".o-mark-button").click(() => {
    localStorage.setItem("p1Mark", "o");
    $(".o-mark-button").html('<img src="assets/icon-o-black.svg" alt="">');
    $(".o-mark-button").css("background-color", "#a8bfc9");
    $(".x-mark-button").css("background-color", "#1a2a33");
    $(".x-mark-button").html('<img src="assets/icon-x-grey.svg" alt="">');
    $(".x-mark-button").hover(
      () => {
        $(".x-mark-button").css("background-color", "#21313a");
      },
      () => {
        $(".x-mark-button").css("background-color", "#1a2a33");
      }
    );
    $(".o-mark-button").off();
    activateX();
  });
}

$(".js-cpu-game").click(() => {
  localStorage.setItem("cpu-xo", "true");
  window.location.href = "game.html";
});
$(".js-multiplayer-game").click(() => {
  window.location.href = "game.html";
});
activateO();
