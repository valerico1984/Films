import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react';

import {Container, Row, Col, Card, Button} from 'react-bootstrap'

function Listado (props){
    
    let token= sessionStorage.getItem('token')

    const navigate= useNavigate();

    const [moviesList, setMoviesList] = useState([])

    useEffect(()=>{ 

        const endPoint='https://api.themoviedb.org/3/discover/movie?api_key=4f8ebddec236106336d3bbaa9e4f3536&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'

        

        axios.get(endPoint)
             .then(res=>{
                 const apiData= res.data;
                 setMoviesList(apiData.results)
             })
             .catch(error=>{
                 swal(
                     <h2>Error en la carga de datos</h2>
                 );
                 return             })

     },[setMoviesList])

  
    
return(
<>
   {!token ? navigate('/'):
   
       <Container fluid="md" >

        <Row className="justify-content-md-center">

            {moviesList.map((oneMovie, idx)=>{

                return(
                    <Col md="auto m-4" key={idx}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" style={{height:'75%'}} src={`https://image.tmdb.org/t/p/w400/${oneMovie.poster_path}`} alt='img_movie'/>
                        <button onClick={props.addOrRemovefromFavs} 
                        title='Agregar a favoritos' 
                        className='favourite_button'
                        data-movie-id={oneMovie.id}>
                        🖤
                        </button>
                        <Card.Body>
                            <Card.Title><h5>{oneMovie.title.substring(0,200)}</h5></Card.Title>
                            <Card.Text>
                           {oneMovie.overview.substring(0,200)}...                            </Card.Text>
                           <Link to={`/detalle?movieID=${oneMovie.id}`} className='link'><Button variant="success">Ver detalle</Button></Link>
                        </Card.Body>
                        </Card>
                    </Col>

                )


            })}
           
            
        </Row>
    </Container>
}
</>
)
}

export default Listado;