import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from './Loader';
import './PokemonCard.css'

const PokemonCard = ({ pokemon }) => {

	const [pokemonData, setPokemonData] = useState(null);
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		setLoading(true);
		axios.get(pokemon?.url)
			.then(res => {
				// console.log(res?.data)
				setPokemonData(res?.data)
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setLoading(false);
			})
	}, [ pokemon?.url ])



	return (
		loading ? <Loader /> :
		<Link to={
			pokemonData ? `/pokemon/${pokemonData?.id}` : `/pokemon/${pokemon?.id}`} className='card-pokemon'>
			<div className='card-img'>
				<img
					src={
						pokemonData ?
						pokemonData?.sprites?.front_default : pokemon?.sprites?.front_default }
					alt={`Pokemon ${pokemon?.name}`}
				/>
			</div>
			<div className='card-info'>
				<span className='pokemon-id'>N° {
				pokemonData ? pokemonData?.id :
				pokemon?.id}</span>
				<h3>{pokemon?.name}</h3>
				<div className='card-types'>
					{
					pokemonData ?
					pokemonData?.types?.map(type => (
						<span className={type?.type?.name} key={type?.type?.name}>
							{type?.type?.name}
						</span>
					)) : pokemon?.types?.map(type => (
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
