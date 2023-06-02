import React,{ useState } from 'react'


//mutable = data is not visible so we use "useRef"
//imutable = data is visible so we use "useState and onChange event"

function Search(props){
  
    const [artist, setArtist] = useState("")

    const submitHandler = (e) =>{
        e.preventDefault();
        props.searchName(artist)
    }

    return(
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="card">
                    <div className="card-body">
                        <div className="form-group mt-2">
                            <div className="input-group">
                                <input type="search" name="artist" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} className="form-control" placeholder='enter artist name' required/>
                                <button onClick={submitHandler} className='btn btn-success'>
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search