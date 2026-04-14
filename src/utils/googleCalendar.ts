export function addToGoogleCalendar(caseData: any) {
    const start = new Date(caseData.next_date)
        .toISOString()
        .replace(/-|:|\.\d+/g, "");

    const end = start;

    const url = `https://www.google.com/calendar/render?action=TEMPLATE
  &text=${encodeURIComponent(caseData.title)}
  &dates=${start}/${end}
  &details=${encodeURIComponent("Court Hearing")}
  `;

    window.open(url, "_blank");
}
