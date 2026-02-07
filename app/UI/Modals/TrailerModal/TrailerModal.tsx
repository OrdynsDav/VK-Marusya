import { TrailerModalProps } from "../../interfaces";
import "../modal.scss";
import { createPortal } from "react-dom";

function getEmbedUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    let videoId = "";

    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v") ?? "";
    }

    if (!videoId) {
      console.error("Invalid YouTube URL: video ID not found");
      return "";
    }

    const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
    embedUrl.searchParams.set("autoplay", "1");
    embedUrl.searchParams.set("rel", "0");
    return embedUrl.toString();
  } catch (e) {
    console.error("Invalid URL", e);
    return "";
  }
}

export default function TrailerModal({ videoUrl, videoTitle, isOpen, onClose }: TrailerModalProps) {

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : "";
  const iframeSrc = isOpen && embedUrl ? embedUrl : "";

  if (!isOpen || !videoUrl) return null;

  return createPortal(
    <div
      className="modal-overlay modal modal-trailer"
    >
      <div className="modal__wrapper" >
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть трейлер"
        >
          <svg width="24" height="24">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <iframe
          className="modal__iframe"
          src={iframeSrc}
          title={videoTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          aria-label="Видео трейлера"
        />
      </div>
    </div>,
    document.body
  );
}