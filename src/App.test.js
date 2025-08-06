import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from './component';
import { MemoryRouter } from 'react-router-dom';

const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

test('renders analytics dashboard', () => {
  renderWithRouter(<Component />);
  const dashboardElement = screen.getByText(/Insights Overview/i);
  expect(dashboardElement).toBeInTheDocument();
});

test('renders ADmyBRAND logo', () => {
  renderWithRouter(<Component />);
  const logoElements = screen.getAllByText(/ADmyBRAND/i);
  expect(logoElements.length).toBeGreaterThan(0);
  expect(logoElements[0]).toBeInTheDocument();
});

test('renders revenue metrics', () => {
  renderWithRouter(<Component />);
  const revenueElement = screen.getByText(/Total Revenue/i);
  expect(revenueElement).toBeInTheDocument();
});
