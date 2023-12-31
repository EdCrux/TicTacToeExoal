import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/jest-dom'
import App from "../src/App";
import React from 'react'


describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    const headline = screen.getByText(/Tic-tac-toe/i);
    expect(headline).toBeInTheDocument();
  });
});