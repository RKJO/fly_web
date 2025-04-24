import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('App Routing', () => {
  it('renders home page at /', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText('Dla najmłodszych')).toBeInTheDocument();
    expect(screen.getByText('Z naszego bloga')).toBeInTheDocument();
  });

  it('renders blog page at /blog', () => {
    renderWithRouter(<App />, { route: '/blog' });
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders kids zone page at /kids', () => {
    renderWithRouter(<App />, { route: '/kids' });
    expect(screen.getByText('Zajęcia dla dzieci')).toBeInTheDocument();
  });

  it('renders visualization page at /visualization', () => {
    renderWithRouter(<App />, { route: '/visualization' });
    expect(screen.getByText('Wróć do strony głównej')).toBeInTheDocument();
  });

  it('navigation links work correctly', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Dla najmłodszych')).toBeInTheDocument();

    const blogLink = screen.getByText('Czytaj więcej');
    expect(blogLink.getAttribute('href')).toBe('/blog');

    const kidsLink = screen.getByText('Dowiedz się więcej');
    expect(kidsLink.getAttribute('href')).toBe('/kids');
  });
});
