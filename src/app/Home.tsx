"use client";
import { useEffect, useState } from "react";
import type { Language } from "../content/site";
import { Header } from "./components/home/Header";
import { Hero } from "./components/home/Hero";
import { Work } from "./components/home/Work";
import { Experience, Contact, Footer } from "./components/home/Sections";
import { useHeroMotion } from "./components/home/useHeroMotion";
/** Сборка главной страницы. Здесь порядок разделов; сами тексты — в content/site.ts. */
export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const { heroRef, contentRef, headerRef } = useHeroMotion();
  useEffect(() => {
    if (new URLSearchParams(location.search).get("lang") === "en")
      setLanguage("en");
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  return (
    <>
      {/* Якорь стоит перед sticky-экраном: возврат наверх всегда ведёт к началу страницы. */}
      <div id="home" aria-hidden="true" />
      <Header
        language={language}
        headerRef={headerRef}
        onToggleLanguage={() =>
          setLanguage((value) => (value === "ru" ? "en" : "ru"))
        }
      />
      <Hero language={language} sectionRef={heroRef} contentRef={contentRef} />
      <main id="work">
        <Work language={language} />
        <Experience language={language} />
        <Contact language={language} />
        <Footer />
      </main>
    </>
  );
}
