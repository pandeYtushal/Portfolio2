import { useEffect } from "react";

const BASE_URL = "https://tushal.site";
const DEFAULT_OG_IMAGE = `${BASE_URL}/avtar.png`;
const TWITTER_HANDLE = "@pandeYtushal";
const SITE_NAME = "Tushal Anand — Portfolio";

interface SEOMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

/**
 * useSEO — lightweight hook that imperatively updates <head> for every route.
 * No library dependency. Runs after paint so it never blocks rendering.
 */
export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
}: SEOMeta) {
  useEffect(() => {
    // ── Title ──────────────────────────────────────────────
    document.title = title;

    // ── Helper: upsert a <meta> tag ────────────────────────
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = attr.split("=");
        el.setAttribute(attrName.trim(), attrVal?.replace(/"/g, "").trim() ?? "");
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    // ── Helper: upsert a <link> tag ────────────────────────
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // ── Helper: upsert a JSON-LD <script> ─────────────────
    const setJsonLd = (id: string, data: object) => {
      let el = document.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
      if (!el) {
        el = document.createElement("script");
        el.setAttribute("type", "application/ld+json");
        el.setAttribute("data-seo-id", id);
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };

    // ── Standard meta ─────────────────────────────────────
    setMeta('meta[name="description"]', 'name="description"', description);
    setMeta(
      'meta[name="robots"]',
      'name="robots"',
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    // ── Canonical ─────────────────────────────────────────
    setLink("canonical", canonical);

    // ── Open Graph ────────────────────────────────────────
    setMeta('meta[property="og:type"]', 'property="og:type"', ogType);
    setMeta('meta[property="og:url"]', 'property="og:url"', canonical);
    setMeta('meta[property="og:title"]', 'property="og:title"', title);
    setMeta('meta[property="og:description"]', 'property="og:description"', description);
    setMeta('meta[property="og:image"]', 'property="og:image"', ogImage);
    setMeta('meta[property="og:image:width"]', 'property="og:image:width"', "1200");
    setMeta('meta[property="og:image:height"]', 'property="og:image:height"', "630");
    setMeta('meta[property="og:site_name"]', 'property="og:site_name"', SITE_NAME);

    // ── Twitter / X Card ──────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'name="twitter:card"', "summary_large_image");
    setMeta('meta[name="twitter:url"]', 'name="twitter:url"', canonical);
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', title);
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', description);
    setMeta('meta[name="twitter:image"]', 'name="twitter:image"', ogImage);
    setMeta('meta[name="twitter:creator"]', 'name="twitter:creator"', TWITTER_HANDLE);
    setMeta('meta[name="twitter:site"]', 'name="twitter:site"', TWITTER_HANDLE);

    return () => {
      // Reset to site defaults on unmount so stale meta never leaks
      document.title = SITE_NAME;
    };
  }, [title, description, canonical, ogImage, ogType, noindex]);
}

export { BASE_URL, DEFAULT_OG_IMAGE, SITE_NAME };

