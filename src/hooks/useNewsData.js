import { useState, useEffect } from "react";

const useNewsData = (category, searchTerm, dateFilter, regionFilter, languageFilter) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);

        const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
        const apiUrl = "https://gnews.io/api/v4/top-headlines";
        const params = new URLSearchParams({
          token: apiKey,
          topic: category || "",
          q: searchTerm || "",
          lang: languageFilter || "en", // Default to English language
        });

        if (dateFilter) {
          params.set("from", dateFilter);
        }

        if (regionFilter) {
          params.set("country", regionFilter);
        }

        const url = `${apiUrl}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        setNewsData(data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchNewsData();
  }, [category, searchTerm, dateFilter, regionFilter, languageFilter]);

  return { newsData, loading, error };
};

export default useNewsData;
