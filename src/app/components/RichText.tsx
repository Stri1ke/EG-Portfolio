import type { ReactNode } from "react";
/** Безопасная небольшая разметка: HTML не исполняется, поддерживаются только явные конструкции. */
function inlineText(value: string): ReactNode[] {
  return value
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("*") && part.endsWith("*"))
        return <em key={index}>{part.slice(1, -1)}</em>;
      const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      return link ? (
        <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      ) : (
        part
      );
    });
}
export function RichText({ value }: { value: string }) {
  return (
    <div className="rich-text">
      {value.split("\n").map((line, index) => {
        if (line.startsWith("## "))
          return <h3 key={index}>{inlineText(line.slice(3))}</h3>;
        if (line.startsWith("# "))
          return <h2 key={index}>{inlineText(line.slice(2))}</h2>;
        if (line.startsWith("- "))
          return (
            <p className="bullet" key={index}>
              • {inlineText(line.slice(2))}
            </p>
          );
        return <p key={index}>{inlineText(line)}</p>;
      })}
    </div>
  );
}
