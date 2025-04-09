import React from 'react';
import { render, screen } from '@testing-library/react';
import KidsZone from '../KidsZone';

describe('KidsZone Component', () => {
  it('renders title correctly', () => {
    render(<KidsZone />);
    expect(screen.getByText('Zajęcia dla dzieci')).toBeInTheDocument();
  });

  it('renders all course cards', () => {
    render(<KidsZone />);
    expect(screen.getByText('Kurs dla początkujących')).toBeInTheDocument();
    expect(screen.getByText('Kurs dla zaawansowanych')).toBeInTheDocument();
    expect(screen.getByText('Obóz wakacyjny')).toBeInTheDocument();
  });

  it('renders course prices', () => {
    render(<KidsZone />);
    expect(screen.getByText('150 zł/lekcja')).toBeInTheDocument();
    expect(screen.getByText('180 zł/lekcja')).toBeInTheDocument();
    expect(screen.getByText('1200 zł/tydzień')).toBeInTheDocument();
  });
}); 