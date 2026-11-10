import { useEffect, useRef, useState, type Ref } from "react";
import { siteContent, translate, type Language } from "../../../content/site";
import { useSitePaths } from "../../../paths";

type HeaderProps = {
  language: Language;
  headerRef: Ref<HTMLElement>;
  onToggleLanguage: () => void;
};
/** Верхнее меню. Состоянием языка управляет Home, поэтому вся страница меняется одновременно. */
export function Header({
  language,
  headerRef,
  onToggleLanguage,
}: HeaderProps) {
  const content = siteContent.navigation;
  const { assetUrl } = useSitePaths();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const resumeRef = useRef<HTMLDialogElement>(null);

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
      <div className="header-brand">
      <a
        className="brand"
        href="#home"
        aria-label={translate(content.homeLabel, language)}
        onClick={() => setMenuOpen(false)}
      >
        e<span>g</span> /
      </a>
      <span className="header-status">
        {language === "ru" ? "Портфолио пополняется — не все проекты ещё оформлены." : "Portfolio in progress — more projects are being prepared."}
      </span>
      </div>
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
          className="nav-resume"
          type="button"
          aria-haspopup="dialog"
          onClick={() => {
            setMenuOpen(false);
            resumeRef.current?.showModal();
          }}
        >
          CV ↗
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
      <dialog ref={resumeRef} className="resume-dialog" aria-labelledby="resume-title">
        <button
          className="resume-close"
          type="button"
          aria-label={language === "ru" ? "Закрыть" : "Close"}
          onClick={() => resumeRef.current?.close()}
        >
          ×
        </button>
        <h2 id="resume-title">{language === "ru" ? "Скачать резюме" : "Download CV"}</h2>
        <p>{language === "ru" ? "Выберите язык" : "Choose a language"}</p>
        <div className="resume-options">
          <a href={assetUrl("cv/Egor_Siriukin_CV_RU.pdf")} download>Русский ↗</a>
          <a href={assetUrl("cv/Egor_Siriukin_CV_EN.pdf")} download>English ↗</a>
        </div>
      </dialog>
    </header>
  );
}
