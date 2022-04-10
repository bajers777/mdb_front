import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { getCategories } from '../../backend';

const StyledTable = styled.table`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    margin: 0 5%;
    font-family: 'Inter', sans-serif;
`

const Table = props => {
    const [sortType, setSortType] = useState('none');
    const [filterType, setFilterType] = useState('all');
    const [categoryList, setCategoryList] = useState([]);

    const sortComponentsList = (key) => {
        return (a, b) => {
            if (key === 'price') {
                parseInt(a[key]);
                parseInt(b[key]);
                return a[key] - b[key];
            }
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        }
    }

    const handleSortItems = e => {
        const sortType = e.target.getAttribute('data-type');
        return setSortType(sortType);

    }

    const displayFilteredList = () => {
        const componentsList = [...props.listItems];
        const filteredComponentsList = componentsList.filter(item => item.category === filterType);

        if (filterType === 'all') {
            componentsList.sort(sortComponentsList(sortType))
            return <TableBody componentsList={componentsList} setListItems={props.setListItems} />
        }
        filteredComponentsList.sort(sortComponentsList(sortType))
        return <TableBody componentsList={filteredComponentsList} setListItems={props.setListItems} />
    }
    useEffect(() => {
        getCategories().then(res => setCategoryList(res));
    }, [])

    return (
        <StyledTable>
            <TableHeader handleSortItems={handleSortItems} setFilterType={setFilterType} filterType={filterType} categoryList={categoryList} />
            {/* <TableBody {...props} /> */}
            {displayFilteredList()}
        </StyledTable>
    )
}
export default Table