import React from 'react'
import styled from 'styled-components';
import TableItem from './TableItem';

const Body = styled.tbody`
    display: flex;
    flex-flow: column;
    width: 100%;
    background-color: ${props => props.theme.colors.main};
`
const TableBody = props => {

    return (
        <Body>
            {props.componentsList.map((item, index) => <TableItem key={index} id={index} value={item} {...props} />)}
        </Body>
    )
}

export default TableBody