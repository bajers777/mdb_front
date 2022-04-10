import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { FormTheme } from '../../UI/Form/FormUI';

const slideAnim = keyframes`
    from{
        height: 0px;
        opacity: 0;
    }
    to{
        height: 250px;
        opacity: 1;
    }
`;

const FormAnim = styled(FormTheme)`
    animation: ${slideAnim} .1s ease-in;
    height: 250px;
    width: 100%;
`;

const FormType = props => {
    if (props.isModifying) {
        return <FormAnim onSubmit={props.handleSubmitForm}>{props.children}</FormAnim>;
    }
    return <FormTheme onSubmit={props.handleSubmitForm}>{props.children} </FormTheme>;
}


export default FormType;