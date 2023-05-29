import { render } from '@testing-library/react';
import { describe, test, expect} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux'
import SeasonSelection from '../pages/SeasonSelection';
import '@testing-library/jest-dom';

describe('Checking component integrity', () => {
    test('Season Snapshot', () => {
        const container = render(
            <Provider store={store}>
                <MemoryRouter>
                    <SeasonSelection />
                </MemoryRouter>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });
});
