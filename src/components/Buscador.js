import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap'
import swal from '@sweetalert/with-react';

function Buscador(){

    const navigate= useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()

        const keyword= e.currentTarget.keyword.value.trim()
        
        if (keyword.length===0){
            swal(<h5>Tienes que escribir una palabra clave</h5>)

        } else {
            e.currentTarget.keyword.value=''
            navigate(`/resultados?keyword=${keyword}`)
        }
    }

    return(
        <>

        <Form className='d-flex' onSubmit={handleSubmit}>
             <Form.Control type="search" className='me-2' name="keyword"/>
              <Button variant="success" type="search">
                      Buscar
              </Button>
       
        </Form>
       
        </>
    )
}

export default Buscador