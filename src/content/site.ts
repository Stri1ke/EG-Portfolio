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
    about: { ru: "Обо мне", en: "About" },
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
      ru: "От логики взаимодействия до визуального характера игры. С опытом в графическом дизайне.",
      en: "From player flows to the visual character of a game. With a background in graphic design.",
    },
    explore: { ru: "Смотреть работы", en: "Explore work" },
    contact: { ru: "Связаться ↗", en: "Get in touch ↗" },
    disciplines: "UI SYSTEMS · PLAYER FLOWS · VISUAL DESIGN",
    scroll: { ru: "ЛИСТАЙ ВНИЗ ↓", en: "SCROLL TO EXPLORE ↓" },
    coordinate: "[ INTERFACE / HUMAN / PLAY ]",
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
  about: {
    index: "02 / ABOUT",
    heading: { ru: "Дизайн, в который играют.", en: "Design you can play." },
    description: {
      ru: "Специализируюсь на UI/UX для игр. Соединяю понятные сценарии, выразительные интерфейсы и опыт в графическом дизайне.",
      en: "I focus on UI/UX for games, combining clear player flows, expressive interfaces and a background in graphic design.",
    },
    skills: ["Game UI/UX", "Visual systems", "Graphic design"],
  },
  experience: {
    index: "03 / EXPERIENCE",
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
    index: "04 / CONTACT",
    heading: { ru: "Контакты", en: "Contact" },
    email: "e.siriukin@gmail.com",
    telegram: "@jwinsel",
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
  about: { ...defaults.about, ...home.about },
  experience: { ...defaults.experience, ...home.experience },
  contact: { ...defaults.contact, ...home.contact },
  footer: { ...defaults.footer, ...home.footer },
};
