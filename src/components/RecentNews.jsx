import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const RecentNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines',
                    {
                        params: {
                            country: 'us', // Country for news (e.g., 'fr' for France)
                            apiKey: '1a6000526db741de9c8de377cc6072d5',
                            pageSize: 15, // Limit number of news items
                        },
                    }
                );

                // Filter out articles with '[Removed]' in the title
                const filteredArticles = response.data.articles.filter(
                    (article) => !article.title.includes('[Removed]')
                );
                setNews(filteredArticles);
            } catch (err) {
                setError('Erreur lors du chargement des actualités.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-gray-600 text-lg flex items-center">
                    <FaSpinner className="animate-spin text-3xl mr-2" />
                    Chargement des actualités...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-20 text-red-600">
                <FaExclamationTriangle className="text-3xl mr-2" />
                {error}
            </div>
        );
    }

    return (
        <section className="pb-16 pt-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-semibold text-gray-100 text-center mb-10">
                    Actualités récentes
                </h2>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
                    {news.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                            <div className="overflow-hidden rounded-t-xl">
                                {item.urlToImage && (
                                    <img
                                        src={item.urlToImage}
                                        alt={item.title}
                                        className="w-full h-56 object-cover transition duration-300 hover:scale-110"
                                    />
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {item.title}
                                    </a>
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {item.description || 'Pas de description disponible.'}
                                </p>
                                <div className="text-xs text-gray-500">
                                    <span className="font-semibold text-gray-800">
                                        Source: {item.source.name}
                                    </span>{' '}
                                    | Publié le {new Date(item.publishedAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentNews;
