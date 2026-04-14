import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const BlogPostPage: React.FC = () => {
    const { slug } = useParams();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
            <Helmet>
                <title>{slug} | SUITCASE Legal Blog</title>
                <meta
                    name="description"
                    content="Read the latest legal updates, case laws, and court fee insights for advocates in India."
                />
            </Helmet>

            <h1 className="text-3xl font-bold mb-4 text-blue-700 capitalize">
                {slug?.replace(/-/g, " ")}
            </h1>

            <p className="text-gray-500 mb-4">
                Published by Vipin Kumar | Advocate
            </p>

            <p className="text-gray-700">
                This is an SEO-optimized legal blog template. You can publish the latest
                case laws, legal updates, and court fee insights here.
            </p>
        </div>
    );
};

export default BlogPostPage;
