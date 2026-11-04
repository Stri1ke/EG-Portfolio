import { useEffect, useState } from "react";
import Home from "./app/Home";
import Case from "./app/components/Case";
import { projects } from "./data/projects";
import { siteContent, translate, type Language } from "./content/site";
import { SiteRoot } from "./paths";

export type PageProps = { slug: string; root: string };
export function App({ slug, root }: PageProps) {
  const [language, setLanguage] = useState<Language>("ru");
  const project = projects.find((item) => item.slug === slug);
  useEffect(() => {
    setLanguage(
      new URLSearchParams(location.search).get("lang") === "en" ? "en" : "ru",
    );
  }, []);
  useEffect(() => {
    if (project) {
      document.documentElement.lang = language;
      document.title = translate(project.document.title, language) + " — Egor";
    }
  }, [language, project]);
  return (
    <SiteRoot value={root}>
      {project ? (
        <Case
          document={project.document}
          language={language}
          otherProjects={projects.filter((item) => item.slug !== slug)}
        />
      ) : slug ? (
        <div className="case-intro">
          <h1>Страница не найдена</h1>
          <a href={root}>На главную ↗</a>
        </div>
      ) : (
        <Home />
      )}
    </SiteRoot>
  );
}
export const metadata = siteContent.metadata;
export { projects };
