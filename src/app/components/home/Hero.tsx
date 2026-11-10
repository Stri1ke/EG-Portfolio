import type { Ref } from "react";
import { HeroArtwork } from "./HeroArtwork";
import { siteContent, translate, type Language } from "../../../content/site";
/** Первый экран. Тексты редактируются в content/site.ts, размеры — в .hero в CSS. */
export function Hero({
  language,
  sectionRef,
  contentRef,
}: {
  language: Language;
  sectionRef: Ref<HTMLElement>;
  contentRef: Ref<HTMLDivElement>;
}) {
  const content = siteContent.hero;
  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-grid" />
      <div className="hero-content" ref={contentRef}>
        <h1>{translate(content.name, language)}</h1>
        <h2>
          {content.role}
          <span className="cursor">_</span>
        </h2>
        <p>{translate(content.description, language)}</p>
        <div className="hero-actions">
          <a className="button primary" href="#work">
            <span>{translate(content.explore, language)}</span>
            <span>↓</span>
          </a>
          <a className="text-link" href="#contact">
            {translate(content.contact, language)}
          </a>
        </div>
      </div>
      <HeroArtwork />
      <span className="hero-bottom">
        {translate(content.scroll, language)}
      </span>
    </section>
  );
}
