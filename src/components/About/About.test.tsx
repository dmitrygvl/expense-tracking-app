import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './About';

describe('About', () => {
  it('render component', () => {
    render(<About />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
