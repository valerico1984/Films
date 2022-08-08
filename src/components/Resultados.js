import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'

import {Row, Col, Card, Button, Container} from 'react-bootstrap'
import swal from '@sweetalert/with-react';

function Resultados(props){

    let query = new URLSearchParams(window.location.search);
    let keyword= query.get('keyword');

    const navigate=useNavigate()

    const [moviesResult, setMoviesResult]=useState([])

    useEffect(()=>{

        

        const endPointResults= `https://api.themoviedb.org/3/search/movie?api_key=4f8ebddec236106336d3bbaa9e4f3536&language=es-ES&query=${keyword}`;
            axios.get(endPointResults)
                .then(response=>{  
                    const moviesArray= response.data.results
                    
                    if(moviesArray.length===0){
                        swal(
                            <h6>Tu búsqueda no arrojó resultados</h6>
                        )
                        
                        navigate('/listado')
                    }     
                    setMoviesResult(moviesArray)
                   
                })

                .catch(error=>console.log(error))

    }, [navigate, keyword])


    return(
        <Container fluid>
        <h2>Buscaste: <em>{keyword}</em></h2>

        <Row>
            {moviesResult.map((oneMovie, idx)=>{

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
                                <Card.Title>{oneMovie.title.substring(0,200)}</Card.Title>
                                <Card.Text>
                               {oneMovie.overview.substring(0,200)}...</Card.Text>
                               <Link to={`/detalle?movieID=${oneMovie.id}`} className='link'><Button variant="success">Ver detalle</Button></Link>
                            </Card.Body>
                            </Card>
                        </Col>
    
                    )

            })}


        </Row>
       </Container>
    )
}

export default Resultados