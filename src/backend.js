//components
const getComponents = async () => {
    const res = await fetch('https://mdb-rekru.herokuapp.com/components');
    return res.json();
}

const sendComponent = async (type, item) => {
    const data = { type, item }
    return await fetch('https://mdb-rekru.herokuapp.com/components', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

const removeComponent = async (item) => {

    return fetch(`https://mdb-rekru.herokuapp.com/components/${item.id}`, {
        method: 'DELETE',
    })
}

//categories 
const getCategories = async (item) => {
    const res = await fetch('https://mdb-rekru.herokuapp.com/category');
    return res.json();
}

const sendCategory = async (item) => {

    return await fetch('https://mdb-rekru.herokuapp.com/category', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}

export { getComponents, sendComponent, removeComponent, getCategories, sendCategory };

