import { Link } from 'react-router-dom';
import { useState } from 'react'
import Loader from './Loader';
import './PokemonCard.css'

const PokemonCard = ({ pokemon }) => {

	const [loading, setLoading] = useState(false);


	return (
		loading ? <Loader /> :
		<Link to={
			`/pokemon/${pokemon?.id}`}
			className='card-pokemon'>
			<div className='card-img'>
				<img
					src={
						pokemon?.sprites?.front_default }
					alt={`Pokemon ${pokemon?.name}`}
				/>
			</div>
			<div className='card-info'>
				<span className='pokemon-id'>N° {
				// pokemonData ? pokemonData?.id :
				pokemon?.id}</span>
				<h3>{pokemon?.name}</h3>
				<div className='card-types'>
					{
					pokemon?.types?.map(type => (
						<span className={type?.type?.name} key={type?.type?.name}>
							{type?.type?.name}
						</span>
					))}
				</div>				
			</div>
		</Link>
	);
};

export default PokemonCard;
