import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaExclamationTriangle, FaSpinner } from 'react-icons/fa'; // Import des icônes

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
                            apiKey: '1a6000526db741de9c8de377cc6072d5', // Replace with your NewsAPI key
                            pageSize: 10, // Limit number of news items
                        },
                    }
                );

                // Filter out articles with '[Removed]' in the title
                const filteredArticles = response.data.articles.filter(
                    (article) => !article.title.includes('[Removed]')
                );
                setNews(filteredArticles); // Update state with filtered articles
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
            <div className="text-center text-gray-500">
                <FaSpinner className="animate-spin text-2xl inline-block mr-2" />
                Chargement des actualités...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <FaExclamationTriangle className="inline-block mr-2" />
                {error}
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-2xl shadow-2xl space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Actualités récentes</h2>
            <ul className="space-y-6">
                {news.map((item, index) => (
                    <li key={index} className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start border-b border-gray-700 pb-6">
                        {/* Image of the article */}
                        {item.urlToImage && (
                            <img
                                src={item.urlToImage}
                                alt={item.title}
                                className="w-full lg:w-1/3 rounded-xl shadow-md object-cover transition-transform duration-300 hover:scale-105"
                            />
                        )}

                        {/* Text content */}
                        <div className="flex flex-col justify-between space-y-4 w-full lg:w-2/3">
                            <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition duration-200">
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {item.title}
                                </a>
                            </h3>
                            <p className="text-sm text-gray-300">{item.description || 'Pas de description disponible.'}</p>
                            <p className="text-xs text-gray-400 mt-2">
                                Source: <span className="font-semibold text-gray-300">{item.source.name}</span> | Publié le{' '}
                                {new Date(item.publishedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentNews;
