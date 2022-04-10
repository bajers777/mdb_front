import React from 'react'
import styled from 'styled-components';

const TableHeadline = styled.tr`
    display: flex;
    flex-flow: row;
    border: 2px solid ${props => props.theme.colors.tableHeader};
    border-radius: .5rem .5rem 0 0;
    background-color: ${props => props.theme.colors.tableHeader};
`
const TableHeadlinePill = styled.td`
    font-size: ${props => props.theme.fontSizes.l};
    padding: .5rem;
    margin: 0;
    border-right: 2px solid ${props => props.theme.colors.mainBg};
    width: 100%;
    &:last-child{
        border: none;
    }
`;
const TableTitle = styled.h3`
    font-size: 1.5rem;
`;
const Header = styled.thead`
    width: 100%;
`;
const Select = styled.select`
    font-size: .6
    5rem;
    width: 100%;
`

const TableHeader = props => {
    const { handleSortItems, setFilterType, filterType, categoryList } = props;
    return (
        <Header>
            <TableHeadline>
                <TableHeadlinePill onClick={handleSortItems} data-type='name'>
                    Nazwa
                </TableHeadlinePill>
                <TableHeadlinePill onClick={handleSortItems} data-type='category'>
                    Kategoria
                </TableHeadlinePill>
                <TableHeadlinePill onClick={handleSortItems} data-type='desc'>
                    Opis
                </TableHeadlinePill>
                <TableHeadlinePill onClick={handleSortItems} data-type='price'>
                    Cena
                </TableHeadlinePill>
                <TableHeadlinePill>
                    <Select
                        onChange={e => setFilterType(e.target.value)}
                        value={filterType}>

                        <option value='all'>Wszystkie</option>
                        {categoryList.map(item => <option>{item}</option>)}
                    </Select>
                </TableHeadlinePill>
            </TableHeadline>
        </Header>
    )
}

export default TableHeader;