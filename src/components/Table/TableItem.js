import React, { useState } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

import Result from './Result';
import { removeComponent } from '../../backend';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import Form from '../Form/Form';

const opacityAnim = keyframes`
    from{
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Icon = styled.span`
    cursor: pointer;
    margin-right: 1rem;
`;
const TableBodyRow = styled.tr`
    display: flex;
    align-items: center;
    animation: ${opacityAnim} .2s ease-in;
`;

const TableBodyPill = styled.td`
        padding: .5rem;
        font-size: ${props => props.theme.fontSizes.m};
        width: 100%;
        border-right: 2px solid ${props => props.theme.colors.tableHeader};
        &:first-child{
            border-left: 2px solid ${props => props.theme.colors.tableHeader};
        }
    `;
const TableItem = props => {
    const [isModifying, setModifyingStatus] = useState(false);
    const item = props.value;
    const modifyingTarget = props.componentsList.map(item => item).find(element => element.id === item.id);

    const handleListItemRemove = () => {
        removeComponent(modifyingTarget);
        const newList = props.componentsList.map(item => item);
        newList.splice(props.id, 1);
        // localStorage.setItem('userComponents', JSON.stringify(newList));
        return props.setListItems(newList);
    }

    const handleListItemModification = () => {
        setModifyingStatus(prevState => !prevState);
    }
    return (
        <>
            <TableBodyRow>
                <TableBodyPill>
                    {item.name}
                </TableBodyPill>
                <TableBodyPill>
                    {item.category}
                </TableBodyPill>
                <TableBodyPill>
                    {item.desc}
                </TableBodyPill>
                <TableBodyPill>
                    {item.price} zł
                </TableBodyPill>
                <TableBodyPill data-id={props.id}>
                    <Icon>
                        <FontAwesomeIcon onClick={handleListItemRemove} icon={faTrashCan} size='2x' />
                    </Icon>
                    <Icon>
                        <FontAwesomeIcon onClick={handleListItemModification} icon={faPenSquare} size='2x' />
                    </Icon>

                </TableBodyPill>
            </TableBodyRow>
            {isModifying && <div> <Form setListItems={props.setListItems} isModifying={isModifying} setModifyingStatus={setModifyingStatus} modifyingTarget={modifyingTarget} /></div>}
            {props.componentsList.length - 1 === props.id && <Result componentsList={props.componentsList} />}
        </>
    )
}

export default TableItem