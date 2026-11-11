import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, tone = "dark", align = "left", className }: Props) {
  const onDark = tone === "light";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span className={cn("eyebrow", onDark ? "text-gold" : "text-clay")}>{eyebrow}</span>
      <h2 className={cn("mt-3 text-4xl leading-[1.05] md:text-6xl", onDark ? "text-forest-foreground" : "text-bark")}>
        {title}
      </h2>
      {text && (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", onDark ? "text-forest-foreground/80" : "text-muted-foreground")}>
          {text}
        </p>
      )}
    </div>
  );
}
