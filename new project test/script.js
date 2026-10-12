const drawButton = document.getElementById("draw-button");
const results = document.getElementById("results");
const emptyState = document.getElementById("empty-state");
const resultCaption = document.getElementById("result-caption");
const themeToggle = document.getElementById("theme-toggle");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "lotto-theme";

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "화이트 모드로 전환" : "다크 모드로 전환",
  );
  themeToggle.title = isDark ? "화이트 모드로 전환" : "다크 모드로 전환";
  themeColorMeta.content = isDark ? "#111713" : "#f7f8fc";
}

const savedTheme = localStorage.getItem(themeStorageKey);
const initialTheme =
  savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme(nextTheme);
});

function drawNumbers() {
  const numbers = Array.from({ length: 45 }, (_, index) => index + 1);

  for (let index = numbers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [numbers[index], numbers[randomIndex]] = [numbers[randomIndex], numbers[index]];
  }

  return numbers.slice(0, 6).sort((first, second) => first - second);
}

function getRange(number) {
  if (number <= 10) return 1;
  if (number <= 20) return 2;
  if (number <= 30) return 3;
  if (number <= 40) return 4;
  return 5;
}

function renderResults() {
  const fragment = document.createDocumentFragment();

  for (let game = 1; game <= 5; game += 1) {
    const row = document.createElement("div");
    row.className = "result-row";
    row.style.animationDelay = `${(game - 1) * 45}ms`;
    row.setAttribute("aria-label", `${game}번째 게임`);

    const label = document.createElement("span");
    label.className = "row-label";
    label.textContent = `${String(game).padStart(2, "0")}`;
    row.append(label);

    for (const number of drawNumbers()) {
      const ball = document.createElement("span");
      ball.className = "number-ball";
      ball.dataset.range = String(getRange(number));
      ball.textContent = String(number);
      row.append(ball);
    }

    fragment.append(row);
  }

  results.replaceChildren(fragment);
  emptyState.hidden = true;
  resultCaption.textContent = "새로운 행운 번호 5게임을 추첨했어요.";
}

drawButton.addEventListener("click", renderResults);
