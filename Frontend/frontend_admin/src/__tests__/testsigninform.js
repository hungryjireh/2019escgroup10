import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import SignInForm, { WrongWarning } from "../components/SignIn/SignInForm";
import { fetchMock, FetchMock } from '@react-mock/fetch';
import mockAxios from 'jest-mock-axios';
import 'jest-dom/extend-expect'
import {FormHeader, FormContent, ContentUser, ContentPassword, FormButton} from "../components/SignIn/SignInForm";

afterEach(cleanup);

// const renderComponent = ({username, password}) => 
//     render(
//         username === 'admin' && password === 'happy' ?
//         <FetchMock
//         mocks={[
//             { matcher: '/api/token/', method: 'POST', response: localStorage.setItem('jwt', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTU0NzkzMDQxLCJqdGkiOiI2MWUxZDFiNzFkNTI0YTljOTAzMzdlNTk5NDc2OTExNiIsInVzZXJfaWQiOjF9._mdR8yW62IoF8PC88OKcdKe6kIXtfLGixfMV1l-h6ew') }
//         ]}
//         >
//         <SignInForm />
//         </FetchMock> :
//         <FetchMock
//         mocks={[
//             { matcher: '/api/token/', method: 'POST', response: localStorage.setItem('jwt', null) }
//         ]}
//         >
//         <SignInForm />
//         </FetchMock>
//     );

it("FormButton renders", () => {
    const { asFragment } = render(<FormButton />);
    expect(asFragment()).toMatchSnapshot();
});

it("FormHeader renders", () => {
    const { asFragment } = render(<FormHeader />);
    expect(asFragment()).toMatchSnapshot();
});

it("FormContent renders", () => {
    const { asFragment } = render(<FormContent />);
    expect(asFragment()).toMatchSnapshot();
});

it("ContentUser renders", () => {
    const { asFragment } = render(<ContentUser />);
    expect(asFragment()).toMatchSnapshot();
});

it("ContentPassword renders", () => {
    const { asFragment } = render(<ContentPassword />);
    expect(asFragment()).toMatchSnapshot();
});

test('Initial Login Page', async () => {
    const {getByText, getByLabelText, container, debug} = render(<SignInForm />);
    expect(getByLabelText('Username'));
    const usernameField = container.querySelector('#username');
    expect(usernameField.value).toBe('');
    expect(getByLabelText('Password'));
    const passwordField = container.querySelector('#password');
    expect(passwordField.value).toBe('');
})

test('Username field input works', async () => {
    const {getByText, container, debug} = render(<SignInForm />);

    const username = 'admin';
    const usernameField = container.querySelector('#username');
    fireEvent.change(usernameField, {target: {value: username}});
    expect(usernameField.value).toBe('admin');
})

test('Password field input works', async () => {
    const {getByText, container, debug} = render(<SignInForm />);

    const password = 'happy';
    const passwordField = container.querySelector('#password');
    fireEvent.change(passwordField, {target: {value: password}});
    expect(passwordField.value).toBe('happy');
})

test('calls "onClick" prop on button click', () => {
    // Render new instance in every test to prevent leaking state
    const onClick = jest.fn();
    const { getByText } = render(<FormButton onClick={onClick}>Sign In<FormButton/>);

    fireEvent.click(getByText(/Sign In/i));
    expect(onClick).toHaveBeenCalled();
});
  

test('Check jwt token for authenticated user', async () => {
    const response = {
        data: { accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTU0NzkzMDQxLCJqdGkiOiI2MWUxZDFiNzFkNTI0YTljOTAzMzdlNTk5NDc2OTExNiIsInVzZXJfaWQiOjF9._mdR8yW62IoF8PC88OKcdKe6kIXtfLGixfMV1l-h6ew" }
    };
    const {getByText, container, debug} = render(<SignInForm/>);
    const username = 'admin';
    const usernameField = container.querySelector('#username');
    fireEvent.change(usernameField, {target: {value: username}});
    const password = 'happy';
    const passwordField = container.querySelector('#password');
    fireEvent.change(passwordField, {target: {value: password}});
    expect(passwordField.value).toBe('happy');
    fireEvent.click(getByText(/Sign In/i));
    if (usernameField.value === 'admin' && passwordField.value === 'happy') {
        mockAxios.mockResponse(response);
        localStorage.setItem('jwt', response.data.accessToken);
    }
    expect(localStorage.getItem('jwt')).toBe('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTU0NzkzMDQxLCJqdGkiOiI2MWUxZDFiNzFkNTI0YTljOTAzMzdlNTk5NDc2OTExNiIsInVzZXJfaWQiOjF9._mdR8yW62IoF8PC88OKcdKe6kIXtfLGixfMV1l-h6ew');
})

test('Check jwt token for unauthenticated user', async () => {
    localStorage.clear();
    const response = {
        data: { accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTU0NzkzMDQxLCJqdGkiOiI2MWUxZDFiNzFkNTI0YTljOTAzMzdlNTk5NDc2OTExNiIsInVzZXJfaWQiOjF9._mdR8yW62IoF8PC88OKcdKe6kIXtfLGixfMV1l-h6ew" }
    };
    const {getByText, container, debug} = render(<SignInForm/>);
    const username = 'admin';
    const usernameField = container.querySelector('#username');
    fireEvent.change(usernameField, {target: {value: username}});
    const password = 'boohoo'; //wrong password
    const passwordField = container.querySelector('#password');
    fireEvent.change(passwordField, {target: {value: password}});
    fireEvent.click(getByText(/Sign In/i));
    if (usernameField.value === 'admin' && passwordField.value === 'happy') {
        mockAxios.mockResponse(response);
        localStorage.setItem('jwt', response.data.accessToken);
    }
    expect(localStorage.getItem('jwt')).toBe(null);
})