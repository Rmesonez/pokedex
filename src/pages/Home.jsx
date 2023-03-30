import './Home.css'
import { useState, useEffect, useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import  PokemonList  from './PokemonList';
import { FilterBar }  from '../components/FilterBar';

const Home = () => {

    const [loading, setLoading] = useState(false)
	const { active, setActive, resetFilterPokemons } = useContext(PokemonContext)

	const trainer = useSelector(state => state.trainer).toUpperCase();


	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
		  setLoading(false);
		}, 5000); 
        }, []);

		useEffect(() => {
			resetFilterPokemons();
		}, [])

  return (
    <>
		{loading ? <Loader /> : null}
        
		<div className='trainer'>
			<h1>Welcome To the Pokedex Trainer { trainer }, Here you can find All of Us!</h1>
		</div>
		<div className='container-filter container'>
				<div id='filter' className='icon-filter' onClick={() => setActive(!active)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
						/>
					</svg>
					<span>Filter</span>
				</div>
			</div>
		<PokemonList
		/>
		<FilterBar
		/>
        </>
  )
}

export default Home
