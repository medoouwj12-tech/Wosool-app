import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "وصول ليموزين | Wosool Limousine Egypt",
    short_name: "وصول | Wosool",
    description: "تطبيق وصول ليموزين - رحلتك من الإسكندرية إلى أي مكان في مصر بأعلى مستويات الفخامة والراحة",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0A0A0C",
    theme_color: "#0A0A0C",
    icons: [
      {
        src: "/logo.jpeg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/logo.jpeg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}
