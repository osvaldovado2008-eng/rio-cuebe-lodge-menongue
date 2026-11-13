import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { contact, navLinks } from "@/data/resort";
import { SocialLinks } from "./SocialLinks";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(["inicio", ...navLinks.map((l) => l.href.slice(1))]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-border/60 bg-background/90 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Logo light={!scrolled} />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href.slice(1) ? "true" : undefined}
              className={cn(
                "relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform aria-[current]:after:scale-x-100",
                scrolled ? "text-bark hover:text-clay aria-[current]:text-clay" : "text-forest-foreground/85 hover:text-gold aria-[current]:text-gold",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="lg" className="hidden rounded-full sm:inline-flex">
            <a href="#reservar">Reservar</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menu"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
                  scrolled ? "text-bark hover:bg-muted" : "text-forest-foreground hover:bg-forest-foreground/10",
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-0 bg-forest-deep p-0 text-forest-foreground [&>button]:hidden">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-16 items-center justify-between px-5">
                <Logo light />
                <SheetClose aria-label="Fechar menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-forest-foreground/10">
                  <X className="h-6 w-6" />
                </SheetClose>
              </div>
              <nav className="mt-6 flex flex-col px-5" aria-label="Menu móvel">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      aria-current={active === l.href.slice(1) ? "true" : undefined}
                      className="border-b border-forest-foreground/10 py-4 font-display text-3xl hover:text-gold aria-[current]:text-gold"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3 px-5">
                <SheetClose asChild>
                  <Button asChild variant="hero" size="xl">
                    <a href="#reservar">Pedir reserva</a>
                  </Button>
                </SheetClose>
                <Button asChild variant="glass" size="xl">
                  <a href={contact.phones[0].href}>
                    <Phone /> {contact.phones[0].display}
                  </a>
                </Button>
              </div>
              <SocialLinks className="mt-8 px-5" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
