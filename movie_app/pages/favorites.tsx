import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import Link from 'next/link';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 25px;
`;

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  return (
    <Container>
      <Header>
        <h1>My Favorites ❤️</h1>
        <Link href="/" style={{ color: '#ff4d4d', textDecoration: 'none' }}>
          ← Back to Search
        </Link>
      </Header>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>You haven't saved any movies yet.</p>
          <Link href="/">Start exploring</Link>
        </div>
      ) : (
        <Grid>
          {favorites.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </Grid>
      )}
    </Container>
  );
}