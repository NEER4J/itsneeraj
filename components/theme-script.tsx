/**
 * Inline script injected into <head> before hydration so the saved preference
 * is applied before paint. Resolves "system" (or missing) to dark/light using
 * prefers-color-scheme. Avoids any flash from a default to the saved theme.
 */
export function ThemeScript() {
  const code = `(function(){try{var pref=localStorage.getItem("neeraj.theme");var resolved={dark:1,light:1,terminal:1,cyber:1};var p=pref&&(resolved[pref]||pref==="system")?pref:"system";var t=p;if(p==="system"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}var d=document.documentElement;d.setAttribute("data-theme",t);d.setAttribute("data-theme-pref",p);}catch(e){var d=document.documentElement;d.setAttribute("data-theme","dark");d.setAttribute("data-theme-pref","system");}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
