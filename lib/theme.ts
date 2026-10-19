export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "ollex-theme";

/**
 * Runs before first paint (root layout, `beforeInteractive`) so an explicit
 * Light/Dark choice never flashes the other theme. "system" stores nothing:
 * the page then follows `prefers-color-scheme` through CSS alone.
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
