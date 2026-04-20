export function sendWhatsAppReminder(caseData: any, client: any) {
    const message = `
⚖️ Case Reminder

Case: ${caseData.title}
Next Date: ${new Date(caseData.next_date).toLocaleDateString()}

Please attend court on time.

- ${caseData.advocate || "Your Advocate"}
  `;

    const phone = client.phone?.replace(//D/g, "");

    const url = `https://wa.me/91${phone}?text=${encodeURIComponent(
        message
    )}`;

    window.open(url, "_blank");
}


