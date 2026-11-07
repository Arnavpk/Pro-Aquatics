import { ButtonLink } from "@/components/ui/Button";
import { CourtLines } from "@/components/graphics/CourtLines";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy text-white">
      <CourtLines trigger="load" className="absolute left-1/2 top-1/2 -z-10 w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-15" />
      <div className="container-site flex flex-col items-start gap-8 py-32">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="text-display uppercase">
          Out of
          <br />
          <span className="text-gold">bounds.</span>
        </h1>
        <p className="max-w-md text-lead text-white/75">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
