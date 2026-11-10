import { useState } from "react";
import { siteContent, translate, type Language } from "../../../content/site";
/** Статические разделы используют один источник текста: content/site.ts. */
export function Experience({ language }: { language: Language }) {
  const content = siteContent.experience;
  const [openStudios, setOpenStudios] = useState<string[]>([]);
  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="experience-heading">
        <div>
          <h2 id="experience-title">{translate(content.heading, language)}</h2>
          <p>{translate(content.description, language)}</p>
        </div>
      </div>
      <div className="studio-list">
        {content.studios.map((studio, index) => {
          const expandable = studio.name === "Lesta Games" || studio.name === "RedBoon";
          const isOpen = openStudios.includes(studio.name);
          const detailsId = `studio-details-${index}`;
          return (
            <article
              className={`studio-row${expandable ? " studio-row-expandable" : ""}`}
              key={studio.name}
            >
              {expandable && (
                <button
                  className="studio-expand"
                  type="button"
                  aria-label={
                    language === "ru"
                      ? `Описание работы в ${studio.name}`
                      : `About work at ${studio.name}`
                  }
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                  onPointerDown={(event) => {
                    if (event.pointerType === "mouse") event.preventDefault();
                  }}
                  onClick={() =>
                    setOpenStudios((open) =>
                      isOpen ? open.filter((name) => name !== studio.name) : [...open, studio.name],
                    )
                  }
                >
                  <span
                    className={`studio-chevron${isOpen ? " is-open" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              )}
              <div className="studio-name">
                <span className="studio-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="studio-identity">
                  {studio.name === "Lesta Games" && (
                    <span className="nda-wrap">
                      <button
                        type="button"
                        className="nda-badge"
                        aria-describedby="nda-description"
                      >
                        NDA ⓘ
                      </button>
                      <span className="nda-tooltip" id="nda-description" role="tooltip">
                        {language === "ru"
                          ? "Работы и материалы студии нельзя публиковать из-за соглашения о неразглашении."
                          : "Studio work and materials cannot be shared publicly due to a non-disclosure agreement."}
                      </span>
                    </span>
                  )}
                  <h3>{studio.name}</h3>
                  <p className="studio-role">{studio.role}</p>
                </div>
              </div>
              <div className="studio-projects">
                <span className="studio-label">
                  {translate(
                    studio.games.length > 1 ? content.projects : content.project,
                    language,
                  )}
                </span>
                <ul>
                  {studio.games.map((game) => (
                    <li key={game}>{game}</li>
                  ))}
                </ul>
              </div>
              {studio.name === "Lesta Games" && isOpen && (
                <div className="studio-details" id={detailsId}>
                  {language === "ru"
                    ? "В Lesta Games я работал UI/2D-дизайнером над проектами World of Tanks, World of Warships и Tanks Blitz: создавал элементы игрового интерфейса и UI Kit, готовил графику и ассеты для разработчиков, а также визуалы и анимацию для игровых событий и обновлений."
                    : "At Lesta Games, I worked as a UI/2D designer on World of Tanks, World of Warships and Tanks Blitz. I created game interface elements and UI kits, prepared graphics and assets for developers, and produced visuals and animations for in-game events and updates."}
                </div>
              )}
              {studio.name === "RedBoon" && isOpen && (
                <div className="studio-details" id={detailsId}>
                  {language === "ru"
                    ? "В RedBoon работал над Knock on the Coffin Lid: проектировал HUD и индикацию здоровья, интерфейс карты мира и сценарии взаимодействия игрока с ней. Прорабатывал игровые меню, навигацию и пользовательские сценарии, а также участвовал в разработке героев и злодеев, объединяя визуальный дизайн персонажей с игровым опытом."
                    : "At RedBoon, I worked on Knock on the Coffin Lid, designing the HUD and health indicators, the world map interface and its player interactions. I developed game menus, navigation and user flows, and contributed to the design of heroes and villains, connecting character visuals with the player experience."}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
export function Contact({ language }: { language: Language }) {
  const content = siteContent.contact;
  return (
    <section id="contact" className="contact">
      <div className="contact-heading">
        <h2>{translate(content.heading, language)}</h2>
      </div>
      <div className="contact-details">
        <ul className="contact-links">
          <li>
            <a href={"mailto:" + content.email}>
              <span className="contact-channel">
                {translate(content.emailLabel, language)}
              </span>
              <span className="contact-address">{content.email}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={"https://t.me/" + content.telegram.replace(/^@/, "")}>
              <span className="contact-channel">Telegram</span>
              <span className="contact-address">{content.telegram}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
        <a className="text-link contact-top" href="#home">
          {translate(content.backToTop, language)}
        </a>
      </div>
    </section>
  );
}
export function Footer() {
  const content = siteContent.footer;
  return (
    <footer>
      <span>{content.signature}</span>
      <span>{content.year}</span>
    </footer>
  );
}
