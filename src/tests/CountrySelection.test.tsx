import { render } from '@testing-library/react';
import { describe, test, expect} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux'
import CountrySelection from '../pages/CountrySelection';
import '@testing-library/jest-dom';

describe('Checking component integrity', () => {
    test('Country Snapshot', () => {
        const container = render(
            <Provider store={store}>
                <MemoryRouter>
                    <CountrySelection />
                </MemoryRouter>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });
});
