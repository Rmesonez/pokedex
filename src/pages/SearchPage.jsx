import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import './SearchPage.css'

const SearchPage = () => {
    const location = useLocation();
	const navigate = useNavigate();
    
    const { globalPokemons } = useContext(PokemonContext);

    const filteredPokemons = globalPokemons?.filter(pokemon =>
		pokemon?.name.includes(location?.state.toLowerCase())
	);
	

    function goBack() {
		navigate('/home')
	}

	return (
        
		<div className='container'>
			<p className='p-search'>
				We Found <span>{filteredPokemons?.length}</span>{' '}
				results
			<button
				className='goback searcher'
					onClick={() => {
						goBack();
					}}
					>Go Back
			</button>
			</p>
			<div className='card-list-pokemon container'>
				{filteredPokemons?.map(pokemon => (
					<PokemonCard pokemon={pokemon} key={pokemon?.id} />
				))}
			</div>
			
		</div>
	);
};

export default SearchPage;