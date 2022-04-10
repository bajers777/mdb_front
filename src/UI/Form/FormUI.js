import styled from 'styled-components';

const FormTheme = styled.form`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: center;
    margin: 1.5rem;
`;

const Input = styled.input`
    padding: .25rem;
    margin: .25rem;
    width: 100%;
    border-radius: .25rem;
    font-size: ${props => props.theme.fontSizes.m};
    background-color: ${props => props.isValid ? 'white' : 'red'};
    &::placeholder{
        font-family: 'Inter', sans-serif;
    }
`;

const TextArea = styled.textarea`
    padding: .25rem;
    margin: .25rem;
    width: 100%;
    border-radius: .25rem;
    font-size: ${props => props.theme.fontSizes.m};
    background-color: ${props => props.isValid ? 'white' : 'red'};
    &::placeholder{
        font-family: 'Inter', sans-serif;
    }

`;

const Select = styled.select`
    font-family: 'Inter', sans-serif;
    padding: .25rem;
    margin: .25rem;
    width: 100%;
    border-radius: .25rem;
    font-size: ${props => props.theme.fontSizes.m};
    background-color: ${props => props.isValid ? 'white' : 'red'};
    
`;

const Button = styled.button`
    padding: .25rem;
    width: 35%;
    background-color: ${props => props.theme.colors.font};
    border-radius: .25rem;
    border: none;
    color: white;
    cursor: pointer;
`;

export { FormTheme, Input, TextArea, Select, Button };