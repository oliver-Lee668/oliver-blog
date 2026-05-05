import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md gradient-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">李</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {t("footer.rights")}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="text-sm text-muted-foreground hover:text-foreground transition-fast">
              {t("nav.home")}
            </a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-fast">
              {t("nav.projects")}
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-fast">
              {t("nav.about")}
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-fast">
              {t("nav.contact")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}