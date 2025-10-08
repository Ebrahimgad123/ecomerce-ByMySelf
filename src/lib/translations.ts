import en from "../languages/en.json";
import ar from "../languages/ar.json";

const translations = { en, ar };

export function translate(lang: string, key: string): string {
  const safeLang = lang === "ar" ? "ar" : "en"; 
  // eslint-disable-next-line
  return key.split(".").reduce((obj: any, k) => obj?.[k], translations[safeLang]);
}
