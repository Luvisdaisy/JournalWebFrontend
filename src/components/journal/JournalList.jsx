import {useEffect, useState} from "react";
import axios from "axios";
import JournalCard from "./JournalCard.jsx";

export default function JournalList({url}) {

    const [journals, setJournals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const itemsPerPage = 5;

    useEffect(() => {
        resetAndFetchJournals();
    }, [url]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight &&
                !isLoading &&
                hasMore
            ) {
                fetchJournals();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore]);

    const resetAndFetchJournals = async () => {
        setJournals([]);
        setCurrentPage(0);
        setHasMore(true);
        await fetchJournals(0);
    };

    const fetchJournals = async (page = currentPage) => {
        if (!url) return;
        setIsLoading(true);
        try {
            const endpoint = `${url}?page=${page}&size=${itemsPerPage}`;
            const response = await axios.get(endpoint);
            if (response.headers["content-type"]?.includes("application/json")) {
                const newJournals = response.data;
                setJournals((prevJournals) => [...prevJournals, ...newJournals]);
                setCurrentPage(page + 1);
                if (newJournals.length < itemsPerPage) {
                    setHasMore(false);
                }
            } else {
                console.error("Expected JSON, but got:", response.headers["content-type"]);
            }
        } catch (error) {
            console.error("Error fetching journals:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className = "min-h-screen flex flex-col items-center px-4 py-6">
            {journals.map((journal) => (
                <JournalCard key = {journal.id} journal = {journal}/>
            ))}
            {isLoading && <span className = "loading loading-spinner loading-lg"></span>}
            {/*{!hasMore && !isLoading && <p>No more journals.</p>}*/}
        </div>
    );
}
