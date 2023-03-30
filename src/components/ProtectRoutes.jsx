import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import Header from '../components/Header';


const ProtectRoutes = () => {

  const trainer = useSelector(state => state.trainer)
//   const trainerName = localStorage.getItem('trainer')
    
    return (
        <>
            <Header />
            {
            trainer ? <Outlet /> : <Navigate to='/' />
            }
        </>
    )

}

export default ProtectRoutes

