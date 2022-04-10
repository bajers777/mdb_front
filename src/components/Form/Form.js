import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormType from './FormType';
import { sendComponent } from '../../backend';
import { FormTheme, Input, TextArea, Select, Button } from '../../UI/Form/FormUI';
import { getCategories } from '../../backend';
import NewCategory from './NewCategory';

const Container = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
`

const Form = props => {
    const [formFieldData, setFormData] = useState({
        id: Date.now(),
        name: '',
        category: '',
        desc: '',
        price: 0,
        // on first launch it need to be string with space character to avoid set 'incorrect' background too early
        errorHandler: {
            isNameValid: ' ',
            isCategoryValid: ' ',
            isDescValid: ' ',
            isPriceValid: ' ',
        }
    })
    const [isValid, setValidStatus] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    const handleInputChange = e => {
        const key = e.target.id;
        const value = e.target.value;
        return setFormData({
            ...formFieldData,
            [key]: value
        })
    }
    const { setModifyingStatus, isModifying, modifyingTarget } = props;
    const formFieldValidation = () => {
        const { name, category, desc, price, errorHandler } = formFieldData;
        setFormData(prevState => {
            return {
                ...prevState,
                errorHandler: {
                    ...prevState.errorHandler,
                    ...(name.length < 4 ? { isNameValid: false } : { isNameValid: true }),
                    ...(category.length === 0 ? { isCategoryValid: false } : { isCategoryValid: true }),
                    ...(desc.length < 10 ? { isDescValid: false } : { isDescValid: true }),
                    ...(price === 0 ? { isPriceValid: false } : { isPriceValid: true }),
                }
            }
        })
    }

    const handleOnBlurFormFields = e => {
        const type = e.target.id;
        const value = e.target.value;
        setFormData(prevState => {
            switch (type) {
                case 'name':
                    return (
                        {
                            ...prevState,
                            errorHandler: {
                                ...prevState.errorHandler,
                                ...(value.length < 4 ? { isNameValid: false } : { isNameValid: true })
                            }
                        }
                    )
                case 'category':
                    return (
                        {
                            ...prevState,
                            errorHandler: {
                                ...prevState.errorHandler,
                                ...(value.length === 0 ? { isCategoryValid: false } : { isCategoryValid: true })
                            }
                        }
                    )
                case 'desc':
                    return (
                        {
                            ...prevState,
                            errorHandler: {
                                ...prevState.errorHandler,
                                ...(value.length < 10 ? { isDescValid: false } : { isDescValid: true })
                            }
                        }
                    )
                case 'price':
                    return (
                        {
                            ...prevState,
                            errorHandler: {
                                ...prevState.errorHandler,
                                ...(value === 0 ? { isPriceValid: false } : { isPriceValid: true })
                            }
                        }
                    )

                default:
                    break;
            }
        })

    }
    const handleSubmitForm = e => {
        e.preventDefault();
        formFieldValidation();
        if (isValid) {
            props.setListItems(prevState => {
                if (isModifying) {
                    const modifyiedList = prevState.map(item => item);

                    const index = modifyiedList.findIndex(item => item.id === modifyingTarget.id);
                    modifyiedList.splice(index, 1);
                    setModifyingStatus(false);
                    // localStorage.setItem('userComponents', JSON.stringify([...modifyiedList, formFieldData]));
                    sendComponent('modify', formFieldData);
                    return [...modifyiedList, formFieldData];
                }
                // localStorage.setItem('userComponents', JSON.stringify([...prevState, formFieldData]));
                sendComponent('add', formFieldData);
                return [...prevState, formFieldData];
            });
            setValidStatus(false);
            setFormData(
                {
                    id: Date.now(),
                    name: '',
                    category: '',
                    desc: '',
                    price: 0,
                    errorHandler: {
                        isNameValid: ' ',
                        isCategoryValid: ' ',
                        isDescValid: ' ',
                        isPriceValid: ' ',
                    }
                })
        }
    }
    //State need to be always updated 
    useEffect(() => {
        if (Object.values(formFieldData.errorHandler).every(item => item === true)) { //only if ALL fields are correct user can add new item to list
            setValidStatus(true)
        }
    }, [formFieldData.errorHandler]);

    useEffect(() => {
        getCategories().then(res => setCategoryList(res));
    }, [])

    return (
        <Container>
            {!isModifying && <NewCategory />}

            <FormType handleSubmitForm={handleSubmitForm} isModifying={isModifying}>
                <Input
                    isValid={formFieldData.errorHandler.isNameValid}
                    onChange={handleInputChange}
                    onBlur={handleOnBlurFormFields}
                    value={formFieldData.name}
                    id='name'
                    type='text'
                    placeholder={isModifying ? 'Podaj nową nazwe' : 'Podaj nazwę komponentu'} />

                <Select
                    isValid={formFieldData.errorHandler.isCategoryValid}
                    onChange={handleInputChange}
                    onBlur={handleOnBlurFormFields}
                    id='category'
                    value={formFieldData.category}>

                    <option value=''>{isModifying ? '--Nowa kategoria--' : '--Wybierz kategorie--'}</option>
                    {categoryList && categoryList.map(item => <option>{item}</option>)}
                </Select>

                <TextArea
                    isValid={formFieldData.errorHandler.isDescValid}
                    onChange={handleInputChange}
                    onBlur={handleOnBlurFormFields}
                    id='desc'
                    value={formFieldData.desc}
                    placeholder={isModifying ? 'Nowy opis' : 'Opisz nowy komponent'}
                />

                <Input
                    isValid={formFieldData.errorHandler.isPriceValid}
                    onChange={handleInputChange}
                    onBlur={handleOnBlurFormFields}
                    id='price'
                    value={formFieldData.price}
                    type='number'
                    min={0}
                    defaultValue={0}
                />
                <Button type='submit'>{isModifying ? 'Zmień' : 'Dodaj'}</Button>
            </FormType>

        </Container>

    )
}

export default Form