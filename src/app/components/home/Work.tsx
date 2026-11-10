import { useState } from "react";
import { siteContent, translate, type Language } from "../../../content/site";
import { projects } from "../../../data/projects";
import { useSitePaths } from "../../../paths";
import { DemoArtwork } from "./DemoArtwork";
/** Данные опубликованных кейсов входят в сборку: серверный API не требуется. */
export function Work({ language }: { language: Language }) {
  const [filter, setFilter] = useState("all");
  const { mediaUrl, projectUrl } = useSitePaths();
  const content = siteContent.work;
  return (
    <>
      <div className="section-heading">
        <h2>{translate(content.heading, language)}</h2>
      </div>
      <div className="work-toolbar">
        <p>{translate(content.description, language)}</p>
        <div
          className="filters"
          aria-label={translate(content.filterLabel, language)}
        >
          {content.filters.map((item) => (
            <button
              key={item.value}
              className={filter === item.value ? "active" : ""}
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {translate(item.label, language)}{item.value !== "all" && ` (${projects.filter((project) => project.document.category === item.value).length})`}
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid" id="projects">
        {projects.map((project) => {
          const document = project.document;
          return (
            <a
              key={project.id}
              className="project"
              data-type={document.category}
              hidden={filter !== "all" && document.category !== filter}
              href={projectUrl(project.slug, language)}
            >
              {document.cover ? (
                <div className="art project-cover">
                  <img
                    src={mediaUrl(document.cover)}
                    alt={document.coverAlt}
                    loading="lazy"
                    decoding="async"
                    width={638}
                    height={440}
                  />
                </div>
              ) : document.demo ? (
                <DemoArtwork project={document.demo} />
              ) : (
                <div className="art">
                  <span className="tag">PROJECT</span>
                </div>
              )}
              <h3 className="project-title">
                <span>{translate(document.title, language)}</span>
                <span className="arrow">↗</span>
              </h3>
              <div className="project-meta">
                <span>{translate(document.description, language)}</span>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
