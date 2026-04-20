export function sendEmailReminder(caseData: any, client: any) {
    const subject = `Case Reminder - ${caseData.title}`;

    const body = `
Case: ${caseData.title}
Next Hearing Date: ${new Date(caseData.next_date).toLocaleDateString()}

Regards,
${caseData.advocate || "Advocate"}
  `;

    const url = `mailto:${client.email}?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
}


