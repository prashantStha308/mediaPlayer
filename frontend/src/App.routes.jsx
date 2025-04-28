import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload';
import PlayerPage from './pages/PlayerPage.jsx';

const AppRoutes = () => {
    
    return(
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/upload' element={ <Upload /> } />
            <Route path='/player/' element={ <PlayerPage /> } />
            <Route path='/player/:id' element={ <PlayerPage /> } />
        </Routes>
    )
}

export default AppRoutes;