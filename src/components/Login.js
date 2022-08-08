import axios from "axios";
import swal from '@sweetalert/with-react';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Container, Form, Button} from "react-bootstrap";
import Listado from './Listado'


function Login() {

const navigate = useNavigate();




const [isEnabled, setEnabled] = useState(true)

const [email, setEmail] = useState('')

const [password, setPassword] = useState('')

useEffect(()=>{

    const regexEmail=     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const regexPassword = /[A-Za-z]{5}/

   if (regexEmail.test(email) && regexPassword.test(password)){
        setEnabled(false)
   }
},[email, password])

const submitHandler = (e)=>{
    e.preventDefault()
    
    const regexEmail=     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if (email==='' || password===''){
        
    swal (
        <h2>Los campos no pueden estar vacíos</h2>
    )
        return
    }

    

    if (email !=='' && !regexEmail.test(email)){
        swal(
            <h2>Debes escribir una dirección de correo electrónico válida</h2>
            )
        return
    }

    if(email !== 'challenge@alkemy.org' || password !== 'react'){
        swal(
            <h2>Credenciales inválidas</h2>
            )
           
        return
    }

   

   axios
        .post('http://challenge-react.alkemy.org', {"email": email, "password": password})
        .then(res=> {  
            swal(
            <h2>Ingresaste correctamente</h2>
            );
            const tokenRecibido= res.data.token;
            sessionStorage.setItem('token', tokenRecibido);
            navigate('/listado')
            })

         
        }

        // const changeHandler = (e) =>{

        //     e.preventDefault()
    
        //     const email = e.target.email.value;
        //     const password = e.target.password.value;

            

        //     if (regexEmail.test(email) && regexPassword.test(password)){

        //         Button.disabled = false

        //     }

        // }
        let token= sessionStorage.getItem('token')

return(
<>
    { token ? <Listado/> :

    <Container id='login'>
        
    
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control onChange={e => setEmail(e.target.value)} value={email} type="text" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control onChange={e=> setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password" />
        </Form.Group>
        
        <Button disabled={isEnabled} className='button' variant="success" type="submit">
            Submit
        </Button>
        </Form>
        
        
    </Container>
}
</>
)
}

export default Login;