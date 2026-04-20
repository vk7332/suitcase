import React from "react";
import { Link } from "react-router-dom";

const posts = [
    {
        id: 1,
        title: "How to Calculate Court Fees in India",
        slug: "how-to-calculate-court-fees-in-india",
        date: "April 2026",
    },
    {
        id: 2,
        title: "Latest Supreme Court Judgments for Advocates",
        slug: "latest-supreme-court-judgments",
        date: "April 2026",
    },
];

const BlogListPage: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">
                Legal Blog & Updates
            </h1>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="p-4 bg-white shadow rounded">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-500">{post.date}</p>
                        <Link
                            to={`/blog/${post.slug}`}
                            className="text-blue-600 font-medium"
                        >
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogListPage;


