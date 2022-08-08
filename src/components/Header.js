import {Navbar, Nav} from 'react-bootstrap';

import Buscador from './Buscador'

function Header(props) {

    return(
        <header>
            
            <Navbar className='mb-4' bg="dark" variant="dark">
               
                <Navbar.Brand>API</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/listado">Listado</Nav.Link>
                <Nav.Link href="/favoritos">Favoritos</Nav.Link>
                <span className='success' style={{color:'white'}}>{
                props.favourites.length > 0 && 
                props.favourites.length}</span>
                </Nav>
                <Buscador/>
  
            </Navbar>
          
         </header>

   )
}

export default Header;