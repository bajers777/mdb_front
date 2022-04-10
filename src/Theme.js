import React from 'react'
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
const theme = {
    colors: {
        mainBg: '#ffffff',
        tableHeader: '#f2f3f7',
        font: '#102c5b',
        secondaryFont: '#676a6d'
    },
    fontSizes: {
        xs: '.65rem',
        s: '.75rem',
        m: '1rem',
        l: '1.5rem',
        xl: '2.5rem',
    }
}
const Theme = props => {
    return (
        <ThemeProvider theme={theme} >{props.children}</ThemeProvider>
    )
}

export default Theme