const themeToggle = document.getElementById("theme-toggle");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "partnership-inquiry-theme";

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
