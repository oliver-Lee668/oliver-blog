import zh from "./zh"
import en from "./en"
import type { Locale } from "@/lib/i18n"

export const translations: Record<Locale, Record<string, unknown>> = {
  zh: zh as unknown as Record<string, unknown>,
  en: en as unknown as Record<string, unknown>,
}

export type { Locale }