import axios from "axios";
import * as cheerio from "cheerio";

export const fetchCauseList = async (courtUrl: string) => {
    const res = await axios.get(courtUrl);

    const normalize = (str: string) =>
        str.replace(/\s+/g, "").toLowerCase();

    const match = list.find((c) =>
        normalize(c.caseNo).includes(normalize(caseNumber))
    );

    const $ = cheerio.load(res.data);

    const hearings: any[] = [];

    $("table tr").each((_, el) => {
        const cols = $(el).find("td");

        if (cols.length > 2) {
            hearings.push({
                caseNo: $(cols[0]).text(),
                party: $(cols[1]).text(),
                date: $(cols[2]).text(),
            });
        }
    });

    return hearings;
};