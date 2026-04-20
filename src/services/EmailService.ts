import emailjs from "emailjs-com";

export function sendInvoiceEmail(data: any) {
    return emailjs.send(
        "service_id",
        "template_id",
        {
            client_name: data.client,
            case_title: data.caseTitle,
            total_fee: data.total,
            email: data.email,
        },
        "public_key"
    );
}


