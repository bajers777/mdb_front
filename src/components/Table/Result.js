import React from 'react'
import styled from 'styled-components';

const ResultRow = styled.tr`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: ${props => props.theme.colors.font};
    color: #fff;
    td{
        width: 100%;
    }
`
const ResultCell = styled.td`
    width: 100%;
`

const TotalAmmount = styled(ResultCell)`
            border-left: 2px solid ${props => props.theme.colors.tableHeader};

`
const Result = props => {
    const totalAmmount = props.componentsList.map(item => parseInt(item.price)).reduce((prev, curr) => prev + curr);
    return (
        <ResultRow>
            <ResultCell />
            <ResultCell />
            <ResultCell />
            <TotalAmmount>
                {totalAmmount} zł
            </TotalAmmount>
            <ResultCell />
        </ResultRow>
    )
}

export default Result