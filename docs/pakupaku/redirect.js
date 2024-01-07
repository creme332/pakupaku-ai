/**
 * Redirects user to correct URL with pakupaku option in it.
 */
function redirectToGame() {
  const githubGameURL = "https://creme332.github.io/pakupaku-ai/?pakupaku";
  const localhostGameURL = "http://localhost:4000/?pakupaku";
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    window.location.replace(localhostGameURL);
  } else {
    window.location.replace(githubGameURL);
  }
}

(function checkURL() {
  const indexOfQ = window.location.href.indexOf("?");

  if (indexOfQ < 0) {
    redirectToGame();
    return;
  }

  const allOptions = window.location.href.substring(indexOfQ + 1).split("&");
  console.log(allOptions);

  if (allOptions.length != 1 || allOptions[0] != "pakupaku") {
    redirectToGame();
    return;
  }
})();
