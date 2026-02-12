import { useState, useEffect, useCallback } from 'react';
import MovieCard from '../components/MovieCard';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Track our two mixed search terms
  const [searchTerms, setSearchTerms] = useState({ term1: '', term2: '' });

  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  // Helper to shuffle the mixed movies so they look random
  const shuffleArray = (array: Movie[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const fetchMovies = useCallback(async (term1: string, term2: string, pageNum: number, isNewSearch: boolean) => {
    if (!API_KEY) return;

    setLoading(true);
    setError('');

    try {
      const [res1, res2] = await Promise.all([
        fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(term1)}&page=${pageNum}&apikey=${API_KEY}&type=movie`),
        fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(term2)}&page=${pageNum}&apikey=${API_KEY}&type=movie`)
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      let combinedMovies: Movie[] = [];
      
      if (data1.Response === "True") combinedMovies = [...combinedMovies, ...data1.Search];
      if (data2.Response === "True") combinedMovies = [...combinedMovies, ...data2.Search];

      if (combinedMovies.length > 0) {
        const shuffled = isNewSearch ? shuffleArray(combinedMovies) : [...movies, ...shuffleArray(combinedMovies)];
        
        const uniqueMovies = Array.from(new Map(shuffled.map(m => [m.imdbID, m])).values());
        
        setMovies(uniqueMovies);
        setHasMore(true); 
      } else {
        if (isNewSearch) {
          setMovies([]);
          setError("No movies found! Try a different name.");
        }
        setHasMore(false);
      }
    } catch (_err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  }, [API_KEY, movies]); 
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    
    setPage(1);
    setSearchTerms({ term1: term, term2: term }); 
    fetchMovies(term, term, 1, true);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(searchTerms.term1, searchTerms.term2, nextPage, false);
  };

  useEffect(() => {
    const topics = ['Avengers', 'Dune', 'Spider-Man', 'John Wick', 'Batman', 'Interstellar', 'Iron Man', 'Harry Potter', 'Star Wars', 'Cyberpunk', 'Matrix', 'Gladiator'];
    
    const t1 = topics[Math.floor(Math.random() * topics.length)];
    let t2 = topics[Math.floor(Math.random() * topics.length)];
    
    while (t1 === t2) {
      t2 = topics[Math.floor(Math.random() * topics.length)];
    }
    
    setSearchTerms({ term1: t1, term2: t2 });
    fetchMovies(t1, t2, 1, true);
  }, []); 

  return (
    <main className={styles.pageContainer}>
      <Head>
      <title>MovieRec Pro - Discover Trending Movies</title>
      <meta name="description" content="Browse trending movies, search for your favorites, and save them to your watchlist. Built with Next.js." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
      <form className={styles.searchBox} onSubmit={handleSearch}>
        <input 
          className={styles.searchInput}
          placeholder="Search movies..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">Search</button>
      </form>

      <h2 style={{ marginBottom: '20px' }}>
        {query ? `Results for "${query}"` : 'Recommended for You'}
      </h2>

      {error && <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}

      <div className={styles.grid}>
        {movies.map((m, index) => (
          <MovieCard 
            key={`${m.imdbID}-${index}`} 
            movie={m} 
            priority={index < 8} 
          />
        ))}
      </div>

      {loading && <p style={{ textAlign: 'center', margin: '20px' }}>Loading...</p>}

      {hasMore && !loading && movies.length > 0 && (
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton} onClick={loadMore}>
            Show More
          </button>
        </div>
      )}
    </main>
  );
}