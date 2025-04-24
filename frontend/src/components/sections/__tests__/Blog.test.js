import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from '../Blog';

describe('Blog Component', () => {
  it('renders title correctly', () => {
    render(<Blog />);
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
  });

  it('renders all blog posts with categories', () => {
    render(<Blog />);

    // Tytuły
    expect(screen.getByText('Jak zacząć przygodę z indoor skydiving?')).toBeInTheDocument();
    expect(screen.getByText('Techniki latania dla zaawansowanych')).toBeInTheDocument();
    expect(screen.getByText('Bezpieczeństwo w tunelu aerodynamicznym')).toBeInTheDocument();

    // Kategorie
    expect(screen.getByText('Poradnik')).toBeInTheDocument();
    expect(screen.getByText('Technika')).toBeInTheDocument();
    expect(screen.getByText('Bezpieczeństwo')).toBeInTheDocument();
  });

  it('renders post dates in correct format', () => {
    render(<Blog />);
    expect(screen.getByText('9.04.2024')).toBeInTheDocument();
    expect(screen.getByText('8.04.2024')).toBeInTheDocument();
    expect(screen.getByText('7.04.2024')).toBeInTheDocument();
  });

  it('renders post descriptions', () => {
    render(<Blog />);
    expect(screen.getByText(/Od pierwszej wizyty do samodzielnych lotów/)).toBeInTheDocument();
    expect(screen.getByText(/Poznaj sekrety profesjonalistów/)).toBeInTheDocument();
    expect(screen.getByText(/Procedury, sprzęt i najważniejsze zasady/)).toBeInTheDocument();
  });

  it('renders correct number of article cards', () => {
    render(<Blog />);
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(3);
  });
});
