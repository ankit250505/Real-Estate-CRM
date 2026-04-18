import sanitizeHtml from "sanitize-html";

export const sanitizeInput = (value?: string | null) =>
  value ? sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim() : value;
