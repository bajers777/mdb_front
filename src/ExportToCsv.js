import React from 'react'

const ExportToCsv = () => {

    const fakeData = [1, 2, 3, 4, 123, 2, 251, 1213233];
    const typedArrayToURL = (data) => {
        return URL.createObjectURL(new Blob([data], { type: 'text/csv' }))
    }

    const testBlob = new Blob([fakeData], { type: 'text/csv' }).text();


    console.log(testBlob);
    return (
        <div>
            Download link

        </div>
    )
}

export default ExportToCsv