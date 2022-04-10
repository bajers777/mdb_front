import React, { useState } from 'react';
import styled from 'styled-components';
import { FormTheme, Input, Button } from '../../UI/Form/FormUI';
import { sendCategory } from '../../backend';


const Form = styled(FormTheme)`
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
    width: 30%;
    margin: 1.5rem;
`;

const NewCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [isValid, setValidStatus] = useState(true);
    const handleNameInput = e => {
        const name = e.target.value;
        return setCategoryName(name);
    }

    const handleFormSubmit = () => {
        if (categoryName.length > 4) {
            setValidStatus(true);
            sendCategory({ categoryName });
            return setCategoryName('');
        }
        setValidStatus(false);
        return setCategoryName('');


    }
    return (
        <Form onSubmit={handleFormSubmit}>
            <Input
                isValid={isValid}
                onChange={handleNameInput}
                value={categoryName}
                type='text'
                placeholder='Nazwa nowej kategorii' />
            <Button type='submit'>Dodaj kategorię</Button>
        </Form>
    )
}

export default NewCategory