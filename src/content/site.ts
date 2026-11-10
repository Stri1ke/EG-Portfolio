/**
 * ТЕКСТЫ ГЛАВНОЙ СТРАНИЦЫ — начинай редактирование сайта с этого файла.
 * ru — русский текст, en — английский. Меняй слова внутри кавычек.
 * Разметка и поведение находятся в app/components/home, оформление — в public/portfolio.css.
 */
import home from "../data/home.json";
import type { Localized } from "../lib/model";
export type Language = "ru" | "en";
export const translate = (text: Localized, language: Language): string =>
  text[language] || text.ru;

const defaults = {
  // metadata.title — надпись на вкладке браузера. На самом первом экране она не выводится.
  metadata: {
    title: "Egor — Game UI / UX Designer",
    description: "Игровые интерфейсы, системы и визуальные эксперименты.",
  },
  navigation: {
    openMenu: { ru: "Открыть меню", en: "Open menu" },
    closeMenu: { ru: "Закрыть меню", en: "Close menu" },
    menuLabel: { ru: "Основное меню", en: "Main navigation" },
    work: { ru: "Работы", en: "Work" },
    contact: { ru: "Связаться ↗", en: "Contact ↗" },
    homeLabel: { ru: "На главную", en: "Home" },
    resume: "CV",
  },
  hero: {
    eyebrow: { ru: "ПОРТФОЛИО", en: "PORTFOLIO" },
    name: { ru: "ЕГОР", en: "EGOR" },
    // Это видимая специализация под именем. Меняй её здесь, а не в metadata.title.
    role: "Game UI/UX Designer",
    description: {
      ru: "Проектирую игровые интерфейсы, объединяя продуманный пользовательский опыт, выразительный визуальный стиль и техническую реализацию.",
      en: "From player flows to the visual character of a game. With a background in graphic design.",
    },
    explore: { ru: "Смотреть работы", en: "Explore work" },
    contact: { ru: "Связаться ↗", en: "Get in touch ↗" },
    scroll: { ru: "ЛИСТАЙ ВНИЗ ↓", en: "SCROLL TO EXPLORE ↓" },
  },
  work: {
    index: "01 / SELECTED WORK",
    hint: {
      ru: "ПРОКРУТКА ОТКРЫВАЕТ СЛЕДУЮЩИЙ СЛОЙ",
      en: "SCROLL REVEALS THE NEXT LAYER",
    },
    heading: { ru: "Избранные работы", en: "Selected work" },
    description: {
      ru: "Игровые интерфейсы, системы и визуальные эксперименты.",
      en: "Game interfaces, systems and visual experiments.",
    },
    filterLabel: { ru: "Фильтр проектов", en: "Project filter" },
    filters: [
      { value: "all", label: { ru: "Все", en: "All" } },
      { value: "ui", label: { ru: "Game UI/UX", en: "Game UI/UX" } },
      { value: "graphic", label: { ru: "Графика", en: "Graphic" } },
    ],
    loadError: {
      ru: "Не удалось загрузить проекты.",
      en: "Could not load projects.",
    },
    retry: { ru: "Повторить", en: "Retry" },
  },
  experience: {
    index: "02 / EXPERIENCE",
    heading: { ru: "Опыт в игровой индустрии.", en: "Experience in games." },
    description: {
      ru: "Компании и игры, над которыми я работал.",
      en: "Studios and games I’ve worked on.",
    },
    project: { ru: "ПРОЕКТ", en: "PROJECT" },
    projects: { ru: "ПРОЕКТЫ", en: "PROJECTS" },
    // Чтобы добавить компанию, скопируй один объект в этом массиве.
    studios: [
      {
        name: "Lesta Games",
        role: "Graphic Designer / UI Designer",
        games: ["World of Tanks", "World of Warships", "Tanks Blitz"],
      },
      {
        name: "RedBoon",
        role: "UX/UI Designer",
        games: ["Knock on the Coffin Lid"],
      },
    ],
  },
  contact: {
    index: "03 / CONTACT",
    heading: { ru: "Контакты", en: "Contact" },
    email: "e.siriukin@gmail.com",
    telegram: "@jwinsel",
    emailLabel: { ru: "Почта", en: "Email" },
    backToTop: { ru: "Вернуться наверх ↑", en: "Back to top ↑" },
  },
  footer: {
    signature: "EGOR / GAME UI/UX",
    year: "2026",
  },
  resume: {
    status: "CV / EGOR",
    heading: { ru: "Резюме", en: "Résumé" },
    description: {
      ru: "Файл резюме пока не добавлен.",
      en: "The résumé file has not been added yet.",
    },
    close: { ru: "Закрыть", en: "Close" },
  },
};

export const siteContent = {
  ...defaults,
  hero: { ...defaults.hero, ...home.hero },
  work: { ...defaults.work, ...home.work },
  experience: { ...defaults.experience, ...home.experience },
  contact: { ...defaults.contact, ...home.contact },
  footer: { ...defaults.footer, ...home.footer },
};
