import {Container, Card, Row, Col} from 'react-bootstrap'

function Favoritos(props){

    return(
        <>
          <Container fluid="md" >
             <h2>Sección de Favoritos</h2>   
             <Row className="justify-content-md-center">

                {!props.favourites.length && <div className='col-12 text-danger'>No hay películas seleccionadas como favoritas</div> }
     
                 {props.favourites.map((oneMovie, idx)=>{
     
                     return(
                         <Col md="auto m-4" key={idx}>
                         <Card style={{ width: '18rem' }}>
                             <Card.Img variant="top" style={{height:'75%'}} src={oneMovie.imgUrl} alt='img_movie'/>
                             <button onClick={props.addOrRemovefromFavs} 
                               title='Agregar a favoritos' 
                               className='favourite_button'
                               data-movie-id={oneMovie.id}>
                               🖤
                                </button>
                             <Card.Body>
                                 <Card.Title><h5>{oneMovie.title.substring(0,200)}</h5></Card.Title>
                                 <Card.Text>
                                {oneMovie.overview.substring(0,200)}...                           
                                 </Card.Text>
                                {/* <Link to={`/detalle?movieID=${oneMovie.id}`} className='link'><Button variant="success">Ver detalle</Button></Link> */}
                             </Card.Body>
                             </Card>
                         </Col>
     
                     )
     
     
                 })}
                
                 
             </Row>
         </Container>
     
     </>
        )
}

export default Favoritos