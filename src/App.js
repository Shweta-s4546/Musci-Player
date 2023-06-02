import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './component/Menu'
import Music from './component/Music'
import Track from './component/Track'
import Contact from './component/Contact'
import Pnf from './component/Pnf'


function App(props){
  return(
       
        <BrowserRouter>
         <Menu/>
    
         <Routes>
            <Route path={`/`} element={<Music/>}/>
            <Route path={`/track/:artistId`} element={<Track/>}/>
            <Route path={`/contact`}  element={<Contact/> }/>
            <Route path={`/*`} element={ <Pnf/> }/>
         </Routes>
        </BrowserRouter>
  )
}
export default App