import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Toggle = styled.button`
  position: fixed;
  top: 1.25rem;
  right: 1.5rem;
  z-index: 20;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 1px solid var(--ypg-border);
  border-radius: 999px;
  background: var(--ypg-glass);
  backdrop-filter: blur(8px);
  cursor: pointer;
  box-shadow: 0 6px 18px -12px rgba(15, 17, 21, 0.4);
  transition: transform 0.15s ease, background-color 0.2s ease;

  &:hover {
    transform: translateY(-1px) rotate(-8deg);
  }
`;

type Theme = "light" | "dark";

const getInitial = (): Theme =>
  (document.documentElement.getAttribute("data-theme") as Theme) || "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ypg-theme", theme);
    } catch (e) {}
  }, [theme]);

  return (
    <Toggle
      type="button"
      aria-label="테마 전환"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </Toggle>
  );
}
