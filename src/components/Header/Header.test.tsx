import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { Header } from './index';
import { MemoryRouter } from 'react-router-dom';

describe('Header test', () => {
  test('link test', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const mainLink = screen.getByTestId('main-link');
    const aboutLink = screen.getByTestId('about-link');
    userEvent.click(aboutLink);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    userEvent.click(mainLink);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
