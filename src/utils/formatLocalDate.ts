/**
 * Convierte un string "YYYY-MM-DD" a una fecha local sin desfase de huso horario,
 * y devuelve un string con formato local (ej: "23/06/2025").
 */
export function formatLocalDate(dateStr: string, locale: string | undefined = undefined): string {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-").map(Number);

  // Crea la fecha con hora al mediodía local para evitar desfase horario
  const localDate = new Date(year, month - 1, day, 12); // hora 12 para prevenir desplazamiento

  return localDate.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
