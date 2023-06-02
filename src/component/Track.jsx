import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import key from '../config/token'


const url = 'https://api.spotify.com'

function Track(props){

    const [tracks,setTracks] = useState([])
    const params = useParams()  //used to read router parameters

    //player status
    const [audio,setAudio] = useState(false) //audio player
    const [playing,setPlaying] = useState(false) //true =play, false= pause
    const [preUrl,setPreUrl] =  useState(false) //song url

    //to switch the views
    const [view,setViews] = useState(false) //true = card, false = list

    const searchTracks  = async () => {
        
        await fetch(`${url}/v1/artists/${params.artistId}/top-tracks?market=IN`,{
             method : 'GET',
            headers: {
                Authorization : `Bearer ${key}`,
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json() )
        .then(out => {
           setTracks(out.tracks)
        }).catch(err => console.log(err.message));
    }

    useEffect(() => {
        searchTracks()
    },[])


    //to handle play
    const playAudio = (url) => {
        const myAudio = new Audio(url);
        if(!playing){
            //initial play
            myAudio.play();
            setAudio(myAudio);
            setPreUrl(url)
            setPlaying(true)
        }else{
            //play to pause
            audio.pause();
            //pause tp play again
            if(preUrl === url) {
                setPlaying(false);  // pause state
            }else{
                myAudio.play();
                setPlaying(true);
                setPreUrl(url);
                setAudio(myAudio);
            }
        }
    }


    // to handle icon
    const trackIcon = (url) =>{
        if(!url)
            return <strong className='text-danger'>No Track</strong>;
        
        if(playing && url === preUrl)
            return <button className='btn btn-sm btn-warning'><i className="bi bi-pause-fill">Pause</i></button>    
        
        return <button className="btn btn-sm btn-success"><i className="bi bi-play-fill">Play</i></button>
    }

    //to convert milliseconds to time(min:sex:ms)
    const msToTime = (ms) => {
        let mSec = ms % 1000;
        let sec = Math.floor((ms/1000) % 60);
        let min = Math.floor((ms/ (60 * 1000)% 60 ));
        return `${min}:${sec}`
    }



    return(
        <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="display-3 text-success text-center">Track</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-secondary float-end" onClick={() => setViews(!view)}>
                        {
                            view ? <i className="bi bi-app"></i> : <i className="bi bi-list"></i>
                        }
                    </button>
                </div>
            </div>

            <div className="row">
                {
                    tracks && tracks.map((item,index) => {
                        const { id,name,album,preview_url,duration_ms } = item
                        return(
                            <div className={view ? "col-lg-4 col-md-6 col-sm-12 mt-2" : "col-md-6 col-sm-12 mt-2"} key={index}>
                                {
                                    view ? (
                                        <div className="card">
                                            <img src={album ? album.images[0].url:''} alt="no image" className='card-img-top'/>
                                            <div className="card-body">
                                                <h5 className="text-success text-center"> { name }</h5>
                                            </div>
                                            <div className="card-footer">
                                                {
                                                    trackIcon(preview_url)
                                                }
                                            </div>
                                         </div>
                                     ) : (
                                            <ul className="list-group" onClick={()=> playAudio(preview_url)}>
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3">
                                                        <img src={album ? album.images[0].url:''} alt="no image" className='img-fluid rounded-circle'/>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 text-center">
                                                        <h6 className="text-success text-uppercase">{ name }</h6>
                                                        <p className="text-danger float-end">Time : { msToTime(duration_ms)}</p>
                                                    </div>
                                                    <div className="col-md-3 col-sm-3">
                                                        <span className="float-end">
                                                            {
                                                                trackIcon(preview_url)
                                                            }       
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                     )
                                }
                                

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Track