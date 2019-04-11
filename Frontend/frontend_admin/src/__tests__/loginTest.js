import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import { fetchMock, FetchMock } from '@react-mock/fetch';
import {HeaderButton,PopupOptions, ListContent, UpdateListComp} from "../components/UpdateList"
import 'jest-dom/extend-expect'

// import axiosMock from 'axios'

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
//         <FetchMock/> :
//         <FetchMock
//         mocks={[
//             { matcher: '/api/token/', method: 'POST', response: localStorage.setItem('jwt', null) }
//         ]}
//         >
//         <SignInForm/>
//         <FetchMock/>
//     );
// test('Username field', async () => {
//     const {getByText, container, debug} = render(<SignInForm />);
//     const username = 'admin';
//     const usernameField = container.querySelector('#username');
//     fireEvent.change(usernameField, {target: {value: username}});
//     expect(usernameField.value).toBe('admin');
// })

// test('Password field', async () => {
//     const {getByText, container, debug} = render(<SignInForm />);

//     const password = 'happy';
//     const passwordField = container.querySelector('#password');
//     fireEvent.change(passwordField, {target: {value: password}});
//     expect(passwordField.value).toBe('happy');
// })

// test('Submit Button', async () => {
//     const count = 0;
//     const handleSubmit = ({count}) => {count : count + 1};
//     const {getByText, container, debug} = render(<SignInForm onClick={handleSubmit({count})}/>);
//     const submitButton = getByText('Sign In')
//     fireEvent.click(submitButton);
//     expect(count === 1);
// })

// test('Check jwt token for authenticated user', async () => {
//     const {container, debug} = renderComponent({username: "admin", password: "happy"});
//     expect(localStorage.getItem('jwt')).toBe('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTU0NzkzMDQxLCJqdGkiOiI2MWUxZDFiNzFkNTI0YTljOTAzMzdlNTk5NDc2OTExNiIsInVzZXJfaWQiOjF9._mdR8yW62IoF8PC88OKcdKe6kIXtfLGixfMV1l-h6ew');
// })

// test('Check jwt token for unauthenticated user', async () => {
//     const {container, debug} = renderComponent({username: "admin", password: "whoop"});
//     expect(localStorage.getItem('jwt')).toBe("null");
// })




test('Check for buttons', async () =>{
    const mockfn=jest.fn()
    const {getByText} = render(<HeaderButton onClick = {mockfn}> Test </HeaderButton>)
fireEvent.click(getByText('Test'))
expect(mockfn).toHaveBeenCalled()
})

test('HeaderButton renders', async () =>{
    const {asFragment} = render(<HeaderButton/>)
    expect (asFragment.toMatchSnapshot)
})

test('HeaderPopup renders', async () =>{
    const {asFragment} = render(<PopupOptions/>)
    expect (asFragment.toMatchSnapshot)  
})

test('ListContent renders', async () =>{
    const {asFragment} = render(<ListContent/>)
    expect (asFragment.toMatchSnapshot)  
})

test('ListContent content', async () =>{
    const {getByTestId, container}=render(<UpdateListComp/>)
    const changeData=getByTestId('list')
    changeData.reversedUpdates=['hello','world is here', '10101']
    fireEvent.change(changeData)
    expect(getByTestId('list')).toHaveTextContent('world is here')


})
