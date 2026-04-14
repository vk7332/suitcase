export interface LawBook {
    id: number;
    title: string;
    author: string;
    category: string;
    image: string;
    price: string;
    affiliateLink: string;
}

export const lawBooks: LawBook[] = [
    {
        id: 1,
        title: "The Code of Civil Procedure, 1908",
        author: "C.K. Takwani",
        category: "Civil Law",
        image: "https://m.media-amazon.com/images/I/41CPC.jpg",
        price: "₹899",
        affiliateLink: "https://www.amazon.in/dp/XXXXXXXX?tag=youraffid-21",
    },
    {
        id: 2,
        title: "The Indian Penal Code",
        author: "K.D. Gaur",
        category: "Criminal Law",
        image: "https://m.media-amazon.com/images/I/41IPC.jpg",
        price: "₹750",
        affiliateLink: "https://www.amazon.in/dp/XXXXXXXX?tag=youraffid-21",
    },
    {
        id: 3,
        title: "Law of Evidence",
        author: "Batuk Lal",
        category: "Evidence Law",
        image: "https://m.media-amazon.com/images/I/41Evidence.jpg",
        price: "₹695",
        affiliateLink: "https://www.amazon.in/dp/XXXXXXXX?tag=youraffid-21",
    },
    {
        id: 4,
        title: "Constitution of India",
        author: "M.P. Jain",
        category: "Constitutional Law",
        image: "https://m.media-amazon.com/images/I/41COI.jpg",
        price: "₹1,199",
        affiliateLink: "https://www.amazon.in/dp/XXXXXXXX?tag=youraffid-21",
    },
];
