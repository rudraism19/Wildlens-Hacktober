"use client";

import * as React from "react";

export function PwaRegister() {
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("WildLens PWA Service Worker registered:", registration.scope);
          })
          .catch((err) => {
            console.warn("WildLens PWA Service Worker registration failed:", err);
          });
      });
    }
  }, []);

  return null;
}
