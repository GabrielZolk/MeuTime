import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux'
import Login from '../pages/Login';
import '@testing-library/jest-dom';

const component = (
  <Provider store={store}>
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  </Provider>
);

describe('Verifying component rendering', () => {
    test('Checking login button, title and validation text', () => {
      render(component);
  
      expect(screen.getByText('Login')).toBeDefined();
      expect(screen.getByText('Enter your API-KEY to log in.')).toBeDefined();
      expect(screen.getByText('Incorrect or invalid key.')).toBeDefined();
    });
    test('Should be able to FireEvent', () => {
    const handleClick = vi.fn();

      const { getByText } = render(<button onClick={handleClick}>Login</button>);
      fireEvent.click(getByText("Login"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    // test('Should be able to have default style', () => {
        
    //     render(component)

    //     expect(screen.getByText('Login')).toHaveStyle({
    //       maxWidth: "60%",
    //       height: "50px",
    //       color: "#2792D6",
    //       border: "none",
    //       borderRadius: "8px"
    //     });
    //   });
  });
