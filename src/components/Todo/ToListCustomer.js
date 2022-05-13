import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ToList from '../../components/Tolist/List/ToList'
import { baseUrl } from '../../environments'



function ToListCustomer(props) {

    //TRAZENDO A LISTA DE CUSTOMERS
    const URL = `${baseUrl}/customer`

    //TRAZENDO A LISTA DE CUSTOMERS
    const [customer, setCustomer] = useState([])

    useEffect(() => {
        //TRAZENDO A LISTA DE CUSTOMERS
        getCustomers()
    },[])


    //EXIBINDOLISTA DE USUARIOS
    const getCustomers = () => {
        axios.get(`${URL}`)
        .then((response) => {
            setCustomer(response.data)
        })
    }

    //DELETANDO O USUARIO POR ID
    const deleteCustomer = (id) => {
        axios.delete(`${URL}/${id}`)
        .then((response) => {
            getCustomers()
        })
    }

    const editDescription = (customer) => {
        if (customer.name === '' && customer.age === '' && customer.document === '' && customer.tel === '' && customer.state === '') {
            return
        }

        axios.put(`${URL}/${customer.id}`, customer)
        .then((response) => {
            getCustomers()
        })
    }

    return (
        <>  
           {/*TRAZENDO A LISTA DE CUSTOMERS*/} 
           {/*DELETANDO O CUSTOMERS*/}
            <ToList
             
            user = {customer} 
            editDescription={editDescription}
            delete={deleteCustomer}
            />
        </>
    )
}

export default ToListCustomer