import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux'
import NotAuthorized from '../components/NotAuthorized';
import '@testing-library/jest-dom';

const component = (
  <Provider store={store}>
    <MemoryRouter>
      <NotAuthorized />
    </MemoryRouter>
  </Provider>
);

describe('Verifying component rendering', () => {
    test('Checking login button and text', () => {
      render(component);
  
      expect(screen.getByText('Login')).toBeDefined();
      expect(screen.getByText('Not Authorized. You must be logged to use the app.')).toBeDefined();
    });
    test('Should be able to FireEvent', () => {
    const handleClick = vi.fn();

      const { getByText } = render(<button onClick={handleClick}>Login</button>);
      fireEvent.click(getByText("Login"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
