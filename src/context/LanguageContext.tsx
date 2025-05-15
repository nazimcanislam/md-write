"use client";

import React, { createContext, useContext, useState } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

const translations = { en, tr };

type Language = "en" | "tr";

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangContextType>({
  lang: "tr",
  setLang: () => {},
  t: () => "",
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<Language>("tr");

  const t = (key: string) => translations[lang][key as keyof typeof tr] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
