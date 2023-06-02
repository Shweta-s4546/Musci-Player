import React, { useEffect, useState } from 'react'
import key from '../config/token'
import Artist from '../screen/Artist';
import Search from '../screen/Search';

//useState => state hook, useEffect => a hook used to call api request

const URL = 'https://api.spotify.com'

function Music(props){

    const [artist,setArtist] = useState([])

    const searchArtist = async (artistName) =>{
        await fetch(`${URL}/v1/search?q=${artistName}&type=artist`,{
            method:'GET',
            headers: {
                Authorization: `Bearer ${key}` // bearer token(auth 2.0)
            }
        })
        .then(res =>res.json())
        .then(out => {
                setArtist(out.artists.items)
        })
        .catch(err => console.log(err.message));
    }

   useEffect(()=> {
    //statements
    searchArtist('Ilayaraja')
   },[])
    return(
        <div className='container'>
            <div className="row"> 
                <div className="col-md-12">
                    <h3 className="display-3 text-success text-center">Music</h3>
                </div>
            </div>

            <div className='row'>
                <Search searchName={searchArtist}/>
            </div>
            <div className="row">
                {
                    artist && artist.map((item,index) => {
                       return(
                        <Artist key={index} {...item}/>
                       )
                    })
                }
            </div>
        </div>
    )
}

export default Music