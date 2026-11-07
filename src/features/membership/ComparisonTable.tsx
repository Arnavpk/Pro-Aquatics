import { Check, Minus } from "lucide-react";
import { Editable } from "@/components/ui/Editable";
import { comparisonRows, membershipCategories } from "@/content/membership";
import { cn } from "@/lib/utils";

/** Side-by-side category comparison. Scrolls horizontally on small screens. */
export function ComparisonTable() {
  return (
    <div className="no-scrollbar -mx-[var(--spacing-gutter)] overflow-x-auto px-[var(--spacing-gutter)]">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">Membership comparison by category</caption>
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 w-[34%] bg-white py-5 pr-4 align-bottom">
              <span className="eyebrow text-navy/50">Feature</span>
            </th>
            {membershipCategories.map((c) => (
              <th
                key={c.id}
                scope="col"
                className={cn(
                  "px-4 py-5 align-bottom font-display text-sm font-extrabold uppercase tracking-wide",
                  c.id === "combined" ? "bg-navy text-gold" : "text-navy",
                )}
              >
                {c.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.feature} className="group border-t border-navy/10">
              <th scope="row" className="sticky left-0 bg-white py-5 pr-4 text-sm font-medium text-navy group-hover:bg-soft">
                {row.feature}
              </th>
              {membershipCategories.map((c) => {
                const v = row.values[c.id];
                return (
                  <td
                    key={c.id}
                    className={cn(
                      "px-4 py-5 text-sm transition-colors group-hover:bg-soft",
                      c.id === "combined" && "bg-navy/[0.04]",
                    )}
                  >
                    {v === true ? (
                      <Check aria-label="Included" strokeWidth={2} className="size-5 text-aqua" />
                    ) : v === false ? (
                      <Minus aria-label="Not included" strokeWidth={1.5} className="size-5 text-navy/25" />
                    ) : (
                      <Editable value={v} className="text-navy/70" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
