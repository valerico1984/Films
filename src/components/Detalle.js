
import {useNavigate, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';

import {Row, Col, Container, Image, Button} from 'react-bootstrap'
import axios from 'axios';
import swal from '@sweetalert/with-react';

function Detalle(){

    let token = sessionStorage.getItem('token')
    let navigate = useNavigate()

    let query = new URLSearchParams(window.location.search);
    let movieID= query.get('movieID');

    const [movieDetail, setMovieDetail] = useState(null)

    useEffect(()=>{

        const endPointDetail= `https://api.themoviedb.org/3/movie/${movieID}?api_key=4f8ebddec236106336d3bbaa9e4f3536&language=es-ES`
        
        axios.get(endPointDetail)
            .then(response=>{
                const filmDetail = response.data
                setMovieDetail(filmDetail)
            })
            .catch( error=>{
                swal (
                    <h2>Hubo un error en la carga de Detalles de la película</h2>
                   
                )
                navigate('/listado')}
            )
      }, [movieID, navigate])

    return(

        <>
        {!token ? navigate('/') : (
      
      !movieDetail ? <p>Cargando...</p> :

      (movieDetail &&

      <>
        <Container fluid style={{textAlign:'center'}}>

        <h2 style={{textAlign:'center', paddingBottom:'30px'}}>{movieDetail.title}</h2>

          <Row>
            <Col>
            
                <Image fluid rounded style={{height:'75%'}} src={`https://image.tmdb.org/t/p/w400/${movieDetail.poster_path}`} alt='movie_img'>
                </Image>
            
            </Col>
            <Col className='mr-6' style={{textAlign: 'justify'}}>
                <h6>Fecha de estreno:</h6>
                <p>{movieDetail.release_date}</p>
                <h6>Reseña:</h6>
                <p>{movieDetail.overview}</p>
                <h6>Rating:</h6>
                <p>{movieDetail.vote_average}</p>
                <h6>Género:</h6>
                {movieDetail.genres.map(oneGenre=><li key={oneGenre.id}>{oneGenre.name}</li>)}
                <br/>

                  
                 <Link to='/listado'><Button variant='success'>Volver al listado</Button></Link>


            </Col>

         </Row>

      </Container>
    </>
    )
        )
}

</>
    )


}

export default Detalle