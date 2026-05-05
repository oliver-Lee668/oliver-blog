import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "zh" | "en"

interface I18nContextType {
  locale: Locale
  toggleLocale: () => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

// Deep get a value from nested object by dot-separated key
function deepGet(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".")
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === "string" ? current : path
}

interface I18nProviderProps {
  children: ReactNode
  translations: Record<Locale, Record<string, unknown>>
}

export function I18nProvider({ children, translations }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>("zh")

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "zh" ? "en" : "zh"))
  }, [])

  const t = useCallback(
    (key: string): string => {
      return deepGet(translations[locale] as Record<string, unknown>, key)
    },
    [locale, translations]
  )

  return (
    <I18nContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}