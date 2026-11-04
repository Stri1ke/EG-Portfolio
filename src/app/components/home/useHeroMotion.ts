import { useEffect, useRef } from "react";
/**
 * Эффект прокрутки первого экрана. ref указывает на DOM-элемент, а не на текстовые данные.
 * Все обработчики и кадры отменяются при уходе со страницы — повторное открытие безопасно.
 */
export function useHeroMotion() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      const hero = heroRef.current,
        content = contentRef.current;
      if (!hero || !content) return;
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / hero.offsetHeight),
      );
      headerRef.current?.classList.toggle("scrolled", window.scrollY > 80);
      // На телефоне первый экран длиннее окна: текст должен оставаться видимым при прокрутке.
      const staticContent = reducedMotion.matches || window.innerWidth <= 900;
      content.style.transform = staticContent
        ? ""
        : `translateY(${-progress * 75}px)`;
      content.style.opacity = staticContent ? "" : String(1 - progress * 0.65);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reducedMotion.addEventListener("change", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return { heroRef, contentRef, headerRef };
}
