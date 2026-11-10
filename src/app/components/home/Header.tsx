import { useEffect, useRef, useState, type Ref } from "react";
import { siteContent, translate, type Language } from "../../../content/site";

type HeaderProps = {
  language: Language;
  headerRef: Ref<HTMLElement>;
  onToggleLanguage: () => void;
  onOpenResume: () => void;
};
/** Верхнее меню. Состоянием языка управляет Home, поэтому вся страница меняется одновременно. */
export function Header({
  language,
  headerRef,
  onToggleLanguage,
  onOpenResume,
}: HeaderProps) {
  const content = siteContent.navigation;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Выпадающее меню не модальное: Tab свободно идёт дальше по странице.
  useEffect(() => {
    const mobile = matchMedia("(max-width: 600px)");
    const onResize = () => {
      if (!mobile.matches) setMenuOpen(false);
    };
    mobile.addEventListener("change", onResize);
    return () => mobile.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target) &&
        !toggleRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);
  return (
    <header ref={headerRef} className={menuOpen ? "menu-open" : ""}>
      <a
        className="brand"
        href="#home"
        aria-label={translate(content.homeLabel, language)}
        onClick={() => setMenuOpen(false)}
      >
        e<span>g</span> /
      </a>
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="header-navigation"
        aria-label={translate(
          menuOpen ? content.closeMenu : content.openMenu,
          language,
        )}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="header-navigation"
        ref={menuRef}
        aria-label={translate(content.menuLabel, language)}
        onBlur={(event) => {
          if (
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget) &&
            event.relatedTarget !== toggleRef.current
          )
            setMenuOpen(false);
        }}
      >
        <a href="#work" onClick={() => setMenuOpen(false)}>
          {translate(content.work, language)}
        </a>
        <button
          id="cv"
          className="nav-cv"
          aria-haspopup="dialog"
          aria-controls="case"
          onClick={() => {
            setMenuOpen(false);
            onOpenResume();
          }}
        >
          {content.resume}
        </button>
        <button
          id="lang"
          onClick={() => {
            onToggleLanguage();
            setMenuOpen(false);
          }}
        >
          {language === "ru" ? "EN ↗" : "RU ↗"}
        </button>
        <a
          className="nav-contact"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          {translate(content.contact, language)}
        </a>
      </nav>
    </header>
  );
}
