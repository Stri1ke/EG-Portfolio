import { siteContent, translate, type Language } from "../../../content/site";
/** Статические разделы используют один источник текста: content/site.ts. */
export function About({ language }: { language: Language }) {
  const content = siteContent.about;
  return (
    <section id="about" className="about">
      <span className="index">{content.index}</span>
      <div>
        <h2>{translate(content.heading, language)}</h2>
        <p>{translate(content.description, language)}</p>
        <div className="skills">
          {content.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Experience({ language }: { language: Language }) {
  const content = siteContent.experience;
  return (
    <section
      id="experience"
      className="experience"
      aria-labelledby="experience-title"
    >
      <div className="experience-heading">
        <span className="index">{content.index}</span>
        <div>
          <h2 id="experience-title">{translate(content.heading, language)}</h2>
          <p>{translate(content.description, language)}</p>
        </div>
      </div>
      <div className="studio-list">
        {content.studios.map((studio, index) => (
          <article className="studio-row" key={studio.name}>
            <div className="studio-name">
              <span className="studio-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="studio-identity">
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
          </article>
        ))}
      </div>
    </section>
  );
}
export function Contact({ language }: { language: Language }) {
  const content = siteContent.contact;
  return (
    <section id="contact" className="contact">
      <span className="index">{content.index}</span>
      <h2>{translate(content.heading, language)}</h2>
      <p>{translate(content.description, language)}</p>
      <a className="text-link" href="#home">
        {translate(content.backToTop, language)}
      </a>
    </section>
  );
}
export function Footer({ language }: { language: Language }) {
  const content = siteContent.footer;
  return (
    <footer>
      <span>{content.signature}</span>
      <span>{translate(content.status, language)}</span>
      <span>{content.year}</span>
    </footer>
  );
}
