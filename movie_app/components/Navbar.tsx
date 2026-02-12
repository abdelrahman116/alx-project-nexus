import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Nav = styled.nav`
  background: #1a1a1a;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #333;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff4d4d;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled.span<{ $active: boolean }>`
  color: ${props => (props.$active ? '#ff4d4d' : '#fff')};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ff4d4d;
  }
`;

const Navbar = () => {
  const router = useRouter();

  return (
    <Nav>
      <Link href="/" passHref style={{ textDecoration: 'none' }}>
        <Logo>MovieRec</Logo>
      </Link>
      <NavLinks>
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <StyledLink $active={router.pathname === '/'}>Home</StyledLink>
        </Link>
        <Link href="/favorites" passHref style={{ textDecoration: 'none' }}>
          <StyledLink $active={router.pathname === '/favorites'}>Favorites</StyledLink>
        </Link>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;