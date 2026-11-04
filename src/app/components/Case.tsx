import { useSitePaths } from "../../paths";
import type { Document, Block, PublicProject } from "../../lib/model";
import { videoEmbed } from "../../lib/model";
import { translate, type Language } from "../../content/site";
import { RichText } from "./RichText";
import { CaseImage, CaseImageGallery } from "./CaseImage";
export { RichText } from "./RichText";

/** Публичная статическая страница кейса. */
export default function Case({
  document,
  language = "ru",
  otherProjects = [],
}: {
  document: Document;
  language?: Language;
  otherProjects?: PublicProject[];
}) {
  const russian = language === "ru";
  const { homeUrl, mediaUrl, projectUrl } = useSitePaths();
  return (
    <div className="case-page">
      <div className="case-nav">
        <a className="logo" href={homeUrl(language) + "#work"}>
          e<span>g</span> /
        </a>
        <a href={homeUrl(language) + "#work"}>
          {russian ? "← Все работы" : "← All work"}
        </a>
        <a href={"?lang=" + (russian ? "en" : "ru")}>
          {russian ? "EN ↗" : "RU ↗"}
        </a>
      </div>
      <div className="case-intro">
        <span className="kicker">
          {document.category === "ui" ? "GAME UI/UX" : "GRAPHIC DESIGN"}
          {document.demo ? " / DEMO" : ""}
        </span>
        <h1>{translate(document.title, language)}</h1>
        <p>{translate(document.description, language)}</p>
      </div>
      {!document.cover && document.demo ? (
        <div className={"demo-cover " + document.demo.kind}>
          <span>{document.demo.label}</span>
          <h2>{document.demo.title}</h2>
          <div>{document.demo.glyphs.join("　")}</div>
          <small>CONCEPT PLACEHOLDER / DEMO</small>
        </div>
      ) : null}
      <CaseImageGallery
        russian={russian}
        images={document.blocks.flatMap((block) =>
          block.type === "image" || block.type === "gallery"
            ? block.images.map((image, index) => ({
                key: block.id + ":" + index,
                src: mediaUrl(image.id),
                alt: image.alt,
              }))
            : [],
        )}
      >
        {document.blocks.map((block) => (
          <section
            className="case-section"
            key={block.id}
            style={{
              background: block.background,
              paddingTop: block.padding,
              paddingBottom: block.padding,
            }}
          >
            <div className={"block-content width-" + block.width}>
              <CaseBlock
                block={block}
                language={language}
                title={translate(document.title, language)}
              />
            </div>
          </section>
        ))}
      </CaseImageGallery>
      {otherProjects.length > 0 && (
        <section className="case-more" aria-labelledby="case-more-title">
          <div className="case-more-heading">
            <div>
              <span className="kicker">
                {russian ? "ПРОДОЛЖИТЬ ПРОСМОТР" : "KEEP EXPLORING"}
              </span>
              <h2 id="case-more-title">
                {russian ? "Другие работы" : "More projects"}
              </h2>
            </div>
            <a href={homeUrl(language) + "#work"}>
              {russian ? "Все работы ↗" : "All work ↗"}
            </a>
          </div>
          <div className="case-more-grid">
            {otherProjects.map((project) => (
              <a
                className="case-more-card"
                key={project.id}
                href={projectUrl(project.slug, language)}
              >
                <div className="case-more-art">
                  {project.document.cover ? (
                    <img
                      src={mediaUrl(project.document.cover)}
                      alt={project.document.coverAlt}
                      loading="lazy"
                    />
                  ) : project.document.demo ? (
                    <div
                      className={"case-more-demo " + project.document.demo.kind}
                    >
                      <span>{project.document.demo.label}</span>
                      <strong>{project.document.demo.title}</strong>
                      <small>{project.document.demo.glyphs.join("  ")}</small>
                    </div>
                  ) : (
                    <span className="case-more-placeholder">PROJECT</span>
                  )}
                </div>
                <div className="case-more-title">
                  <span>{translate(project.document.title, language)}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="case-more-meta">
                  <span>
                    {translate(project.document.description, language)}
                  </span>
                  <span>{project.document.demo ? "DEMO" : "CASE STUDY"}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
      <div className="case-end">
        <span>EGOR / GAME UI/UX</span>
        <a href={homeUrl(language) + "#work"}>
          {russian ? "← Вернуться к работам" : "← Back to work"}
        </a>
      </div>
    </div>
  );
}
/** Выбираем отображение по типу блока, не смешивая его с шапкой и навигацией кейса. */
function CaseBlock({
  block,
  language,
  title,
}: {
  block: Block;
  language: Language;
  title: string;
}) {
  const { mediaUrl } = useSitePaths();
  if (block.type === "text")
    return <RichText value={translate(block.text, language)} />;
  if (block.type === "divider") return <hr />;
  if (block.type === "video") {
    const embed = videoEmbed(block.url);
    return embed ? (
      <iframe
        src={embed}
        title={title + " — video"}
        loading="lazy"
        allow="fullscreen; picture-in-picture"
        allowFullScreen
      />
    ) : null;
  }
  return (
    <div className={block.type === "gallery" ? "case-gallery" : ""}>
      {block.images.map((image, index) => (
        <figure key={image.id}>
          <CaseImage
            imageKey={block.id + ":" + index}
            src={mediaUrl(image.id)}
            alt={image.alt}
            russian={language === "ru"}
          />
          {translate(image.caption, language) && (
            <figcaption>{translate(image.caption, language)}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
