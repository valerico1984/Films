import {Navbar, Container, Nav} from 'react-bootstrap'

function Footer(){


    return(
        <footer>
             <Navbar fixed='bottom' expand='md'  bg="dark" variant="dark">
                <Container fluid>
                <Navbar.Brand>Seguinos en nuestras redes sociales</Navbar.Brand>
                <Nav>
                <Nav.Link target= '_blank' href="https://www.instagram.com/">Instagram</Nav.Link>
                <Nav.Link target= '_blank' href="https://www.facebook.com">Facebook</Nav.Link>
                </Nav>
                     
                <p style={{color:'white', paddingRight:'10px', paddingTop:'2px'}}>Copyright: Valeria Rico</p>
                </Container>
            </Navbar>       
        </footer>
                
        
    )
}

export default Footer;