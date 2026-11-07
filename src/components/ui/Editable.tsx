import { isPlaceholder, type Editable as EditableValue } from "@/lib/placeholder";
import { cn } from "@/lib/utils";

/**
 * Renders a confirmed value as-is, or a clearly marked placeholder for
 * values still awaiting confirmation from the client.
 */
export function Editable({
  value,
  className,
}: {
  value: EditableValue<string | number>;
  className?: string;
}) {
  if (!isPlaceholder(value)) return <span className={className}>{value}</span>;
  return (
    <span
      className={cn("tbc", className)}
      title="Placeholder — update in src/content"
      data-placeholder={value.label}
    >
      [{value.label}]
    </span>
  );
}
