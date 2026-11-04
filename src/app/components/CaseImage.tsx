"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

type GalleryImage = { key: string; src: string; alt: string };
const GalleryContext = createContext<
  (key: string, trigger: HTMLButtonElement) => void
>(() => {});

export function CaseImageGallery({
  images,
  russian,
  children,
}: {
  images: GalleryImage[];
  russian: boolean;
  children: ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <GalleryContext.Provider
      value={(key, trigger) => {
        const index = images.findIndex((image) => image.key === key);
        if (index < 0) return;
        triggerRef.current = trigger;
        setActive(index);
      }}
    >
      {children}
      {active !== null &&
        createPortal(
          <ImageModal
            images={images}
            active={active}
            russian={russian}
            returnFocus={triggerRef}
            onNavigate={setActive}
            onClose={() => {
              setActive(null);
            }}
          />,
          document.body,
        )}
    </GalleryContext.Provider>
  );
}

function ImageModal({
  images,
  active,
  russian,
  onNavigate,
  onClose,
  returnFocus,
}: {
  images: GalleryImage[];
  active: number;
  russian: boolean;
  onNavigate: (index: number) => void;
  onClose: () => void;
  returnFocus: RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const image = images[active];
  const navigate = (step: number) =>
    onNavigate((active + step + images.length) % images.length);
  const zoomLabel = zoomed
    ? russian
      ? "Показать целиком"
      : "Fit image"
    : russian
      ? "По ширине экрана"
      : "Fit to width";

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = returnFocus.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [returnFocus]);

  useEffect(() => {
    viewportRef.current?.scrollTo(0, 0);
  }, [active, zoomed]);

  return (
    <dialog
      ref={dialogRef}
      className="case-image-modal"
      aria-label={russian ? "Просмотр изображений" : "Image viewer"}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="case-image-toolbar">
        <div className="case-image-navigation">
          <button
            type="button"
            disabled={images.length < 2}
            onClick={() => navigate(-1)}
            aria-label={russian ? "Предыдущее изображение" : "Previous photo"}
          >
            ←
          </button>
          <span aria-live="polite" aria-atomic="true">
            {active + 1} / {images.length}
          </span>
          <button
            type="button"
            disabled={images.length < 2}
            onClick={() => navigate(1)}
            aria-label={russian ? "Следующее изображение" : "Next photo"}
          >
            →
          </button>
        </div>
        <button
          type="button"
          className="case-image-zoom"
          aria-pressed={zoomed}
          onClick={() => setZoomed(!zoomed)}
        >
          {zoomLabel}
        </button>
        <button
          type="button"
          className="case-image-close"
          aria-label={russian ? "Закрыть изображение" : "Close image"}
          onClick={onClose}
          autoFocus
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div
        ref={viewportRef}
        className={"case-image-viewport" + (zoomed ? " is-zoomed" : "")}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <button
          type="button"
          className="case-image-canvas"
          onClick={() => setZoomed(!zoomed)}
          aria-label={zoomLabel}
        >
          <img src={image.src} alt={image.alt} />
        </button>
      </div>
    </dialog>
  );
}

export function CaseImage({
  imageKey,
  src,
  alt,
  russian,
}: {
  imageKey: string;
  src: string;
  alt: string;
  russian: boolean;
}) {
  const openImage = useContext(GalleryContext);
  return (
    <button
      type="button"
      className="case-image-trigger"
      aria-label={
        (russian ? "Увеличить изображение" : "Enlarge image") +
        (alt ? ": " + alt : "")
      }
      aria-haspopup="dialog"
      onClick={(event) => openImage(imageKey, event.currentTarget)}
    >
      <img src={src} alt={alt} loading="lazy" />
    </button>
  );
}
