import { useState, useEffect } from 'react';

//Libraries
import {Routes, Route} from 'react-router-dom';

//Styles
import './css/app.css'

//Components
import Login from './components/Login'
import Listado from './components/Listado'
import Header from './components/Header'
import Footer from './components/Footer'
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';


function App() {

  const [favourites, setFavs]= useState([]);

  useEffect(()=>{

    const favsInLocal= localStorage.getItem('favs')
     
     if(favsInLocal!== null){
         const favsArray= JSON.parse(favsInLocal);
         setFavs(favsArray)       }
  },[])

  
  const addOrRemovefromFavs=(e)=>{

    const favMovies= localStorage.getItem('favs')

    let tempMoviesInFavs;
  
    if(favMovies===null){
      tempMoviesInFavs=[]
  
    } else{
      tempMoviesInFavs= JSON.parse(favMovies)
    }
  
   
    const btn= e.currentTarget;
    const parentBtn= btn.parentElement;

    const imgUrl= parentBtn.querySelector('img').getAttribute('src');
    const title=parentBtn.querySelector('h5').innerText
    const overview=parentBtn.querySelector('p').innerText

    const movieData={
                    imgUrl, title, overview,
                    id:btn.dataset.movieId
                  }
    
    let movieIsInArray= tempMoviesInFavs.find(oneMovie=>{
      return oneMovie.id === movieData.id
    });

    if(!movieIsInArray){

      tempMoviesInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavs(tempMoviesInFavs)
      console.log('Se agregó la película')
    } else {
      let moviesLeft=tempMoviesInFavs.filter(oneMovie=>{
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      setFavs(moviesLeft)
      console.log('Se eliminó la película')
      }
    }





  return (
    <>
      <Header favourites={favourites}/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/listado' element={<Listado addOrRemovefromFavs={addOrRemovefromFavs}/>}/>
          <Route path='/detalle' element={<Detalle/>}/>
          <Route path='/resultados' element={<Resultados addOrRemovefromFavs={addOrRemovefromFavs}/>}/>
          <Route path='/favoritos' element={<Favoritos addOrRemovefromFavs={addOrRemovefromFavs} favourites={favourites}/>}/>
          
        </Routes>
      <Footer/>
    </>
  );
}

export default App;
