import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/MovieCard.module.css';

interface MovieProps {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
  };
  priority?: boolean;
}

export default function MovieCard({ movie, priority = false }: MovieProps) {
  const [imgSrc, setImgSrc] = useState(
    movie.Poster !== "N/A" ? movie.Poster : null
  );


  const backupPoster = `https://placehold.co/300x450/222/fff.png?text=${encodeURIComponent(movie.Title)}`;

  return (
    <Link href={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
      <div className={styles.card}>
        <div className={styles.posterContainer}>
          <Image 
            src={imgSrc || backupPoster} 
            alt={movie.Title}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className={styles.poster}
            onError={() => setImgSrc(backupPoster)}
            priority={priority}
            unoptimized={true}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{movie.Title}</h3>
          <span className={styles.year}>{movie.Year}</span>
        </div>
      </div>
    </Link>
  );
}