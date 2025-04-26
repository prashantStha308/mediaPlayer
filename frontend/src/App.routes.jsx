import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload';
import Player from './pages/Player';

const AppRoutes = () => {
    
    return(
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/upload' element={ <Upload /> } />
            <Route path='/player/:id' element={ <Player /> } />
        </Routes>
    )
}

export default AppRoutes;