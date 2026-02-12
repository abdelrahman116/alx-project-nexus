import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/MovieDetail.module.css';

interface Rating {
  Source: string;
  Value: string;
}

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbID: string;
  Genre: string;
  Actors: string;
  Director: string;
  Writer: string;
  Runtime: string;
  Released: string;
  Awards: string;
  Ratings: Rating[];
}

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

    fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data: Movie) => {
        setMovie(data);
        const saved = localStorage.getItem('favorites');
        const favorites: Movie[] = saved ? JSON.parse(saved) : [];
        setIsFavorite(favorites.some((fav) => fav.imdbID === data.imdbID));
      });
  }, [id]);

  const toggleFavorite = () => {
    if (!movie) return;
    const saved = localStorage.getItem('favorites');
    let favorites: Movie[] = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      favorites.push(movie);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (!movie) return <div className={styles.container}><p>Loading...</p></div>;

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image 
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600"} 
          alt={movie.Title}
          width={400}
          height={600}
          className={styles.poster}
          priority
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{movie.Title}</h1>
        <p className={styles.plot}>{movie.Plot}</p>

        {/* Improved Gallery Fix */}
        <div className={styles.infoSection}>
          <span className={styles.infoLabel}>Movie Stills</span>
          <div className={styles.galleryGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.galleryImgWrapper}>
                <Image 
                  src={movie.Poster} 
                  alt={`Still ${i}`} 
                  fill
                  className={styles.galleryImg}
                  style={{ objectPosition: i === 1 ? 'top' : i === 2 ? 'center' : 'bottom' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button 
            className={styles.favButton}
            style={{ backgroundColor: isFavorite ? '#ff4d4d' : '#fff', color: isFavorite ? '#fff' : '#000' }}
            onClick={toggleFavorite}
          >
            {isFavorite ? '❤️ In Favorites' : '🤍 Add to Favorites'}
          </button>
          <button className={styles.backButton} onClick={() => router.back()}>← Back</button>
        </div>
      </div>
    </div>
  );
}