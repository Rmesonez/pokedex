import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setTrainer } from '../store/slices/trainer.slice'

const Login = () => {

    const [trainerValue, setTrainerValue] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const trainer = useSelector(state => state.trainer)

    const handleLogin = () => {
        dispatch(setTrainer(trainerValue))
        localStorage.setItem('trainer', trainer)
        navigate('/home')
        if(trainerValue === '') {
            alert('Please enter your name')
        }
    }


    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 8000);
    }, []);


  return (
    <>
    {
        loading ? <Loader /> : 
            <div className='form'>   
                <figure>
                </figure>
                    <h1>Hello Trainer What's your name?</h1>
                    <form>
                        <input 
                        type="text" 
                        name="trainer"
                        value={trainerValue}
                        placeholder="Enter your name"
                        onChange={e => setTrainerValue(e.target.value)}
                        
                        />
                        <button 
                        type="submit"
                        onClick={handleLogin}
                        >Login</button>
                    </form>
            </div>
    }
    </>
  )
}

export default Login