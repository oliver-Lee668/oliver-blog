import { useState, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { t, locale, toggleLocale } = useI18n()

  const navLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.contact"), href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-smooth",
        isScrolled ? "glass-strong border-b border-border/50" : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow transition-smooth group-hover:shadow-glow-lg">
            <span className="text-sm font-bold text-primary-foreground">李</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {locale === "zh" ? "李立" : "Li Li"}<span className="gradient-text">.dev</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-fast rounded-md hover:bg-secondary/50"
            >
              {link.label}
            </button>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="ml-2 flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-fast rounded-md hover:bg-secondary/50"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium">{locale === "zh" ? "EN" : "中"}</span>
          </button>

          <Button
            variant="premium"
            size="sm"
            className="ml-2"
            onClick={() => handleNavClick("#contact")}
          >
            {t("nav.contactMe")}
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-fast rounded-md hover:bg-secondary/50"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium">{locale === "zh" ? "EN" : "中"}</span>
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-fast rounded-md hover:bg-secondary/50"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="premium"
              size="sm"
              className="mt-2"
              onClick={() => handleNavClick("#contact")}
            >
              {t("nav.contactMe")}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}