import Login from "../pages/Login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../redux';

const mount = () => {
    cy.mount(
        <Provider store={store}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>
    );
}

describe("Button", () => {
    it("should mount", () => {
        mount();
        cy.get("button").contains("Login");
    })

    it("should contain a specific style", () => {
        mount();
        cy.get("button").should("have.css", "background-color", "rgb(255, 255, 255)");
    })
})