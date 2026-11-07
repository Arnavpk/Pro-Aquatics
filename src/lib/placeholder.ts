/**
 * Editable placeholders
 * ---------------------
 * This is a real client website. Any business fact that has not been
 * confirmed (prices, hours, phone numbers, specs, statistics…) is written as
 * `tbc("Label")` inside src/content. It renders as a clearly marked
 * placeholder until the value is replaced with a plain string or number.
 *
 * Find every outstanding value with:  grep -rn "tbc(" src/content
 */
export interface Placeholder {
  readonly tbc: true;
  readonly label: string;
}

export type Editable<T = string> = T | Placeholder;

export const tbc = (label: string): Placeholder => ({ tbc: true, label });

export function isPlaceholder(value: unknown): value is Placeholder {
  return typeof value === "object" && value !== null && "tbc" in value;
}

/** Plain-text version of an editable value (for alt text, metadata, etc.). */
export function editableText<T extends string | number>(value: Editable<T>) {
  return isPlaceholder(value) ? `[${value.label}]` : String(value);
}
