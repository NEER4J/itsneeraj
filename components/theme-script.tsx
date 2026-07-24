import Script from "next/script";

/**
 * Pre-hydration theme init. Applies the saved light/dark choice onto <html>
 * before paint so there's no flash. With no saved choice, CSS follows the
 * system preference. Rendered via next/script (beforeInteractive) so React
 * doesn't warn about inline <script> tags in the component tree.
 */
export function ThemeScript() {
  const code = `(function(){try{var v=localStorage.getItem("neeraj.v2.theme");if(v==="light"||v==="dark"){document.documentElement.setAttribute("data-v2-theme",v);}}catch(e){}})();`;
  return (
    // beforeInteractive in the root layout is the App Router pattern for a
    // pre-hydration script; the lint rule targets the legacy pages/_document.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: code }} />
  );
}
