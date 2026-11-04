import { useEffect, type RefObject } from "react";
import { siteContent, translate, type Language } from "../../../content/site";
/** Нативный dialog поддерживает Escape и удерживает клавиатурный фокус внутри окна. */
export function ResumeDialog({
  language,
  dialogRef,
}: {
  language: Language;
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  useEffect(() => () => document.body.classList.remove("modal-open"), []);
  const content = siteContent.resume;
  return (
    <dialog
      id="case"
      ref={dialogRef}
      onClose={() => document.body.classList.remove("modal-open")}
    >
      <button
        className="close"
        aria-label={translate(content.close, language)}
        onClick={() => dialogRef.current?.close()}
      >
        ×
      </button>
      <div className="case-body">
        <span className="case-status">{content.status}</span>
        <h2>{translate(content.heading, language)}</h2>
        <p>{translate(content.description, language)}</p>
      </div>
    </dialog>
  );
}
