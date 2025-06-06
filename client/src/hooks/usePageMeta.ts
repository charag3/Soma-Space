import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
}

export function usePageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector("meta[name='description']") as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
