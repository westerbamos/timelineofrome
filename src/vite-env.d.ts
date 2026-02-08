/// <reference types="vite/client" />

interface Window {
  dataLayer: Array<{
    event: string;
    [key: string]: unknown;
  }>;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}
