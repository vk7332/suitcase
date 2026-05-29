import { LawBook } from "../../data/law-books";

interface Props {
    book: LawBook;
}

const LawBookCard: React.FC<Props> = ({ book }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
            <img
                src={book.image}
                alt={book.title}
                className="h-48 w-full object-contain mb-3"
            />
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">By {book.author}</p>
            <p className="text-sm text-blue-600">{book.category}</p>
            <p className="font-bold mt-2">{book.price}</p>

            <a
                href={book.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-yellow-500 text-white py-2 mt-4 rounded hover:bg-yellow-600 transition"
            >
                Buy Now
            </a>
        </div>
    );
}


