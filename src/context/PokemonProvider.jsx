
import { useEffect, useState } from 'react';
import { useForm } from '../hook/useForm';
import { PokemonContext } from './PokemonContext';
import axios from 'axios';

export const PokemonProvider = ({ children }) => {

	const [globalPokemons, setGlobalPokemons] = useState([]);
	const [loading, setLoading] = useState(true);

	// Utilizar CustomHook - useForm
	const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

	const [active, setActive] = useState(false);


//LLamar a todos los pokemones

	const getGlobalPokemons = () => {
		const baseURL = 'https://pokeapi.co/api/v2/';
		axios.get(`${baseURL}pokemon?limit=1261&offset=0`)
		.then(res => {
			const promises = res?.data?.results?.map(pokemon => {
				return axios.get(pokemon?.url)
			})
			Promise.all(promises)
			.then(res => {
				const results = res?.map(pokemon => pokemon?.data)
				setGlobalPokemons(results);
				setLoading(false);
			})
		})
		.catch(err => console.log(err))
	}

	
	useEffect(() => {
		setLoading(true);
		getGlobalPokemons();
		setLoading(false);		
	}, []);


	

	// Filter Function + State
	const [typeSelected, setTypeSelected] = useState({
		grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
	});

	const [filteredPokemons, setfilteredPokemons] = useState([]);
	

	const handleCheckbox = e => {
		setTypeSelected({
			...typeSelected,
			[e.target.name]: e.target.checked,
		});
		if (e.target.checked) {
			const filteredResults = globalPokemons?.filter(pokemon =>
				pokemon?.types
					.map(type => type.type.name)
					.includes(e.target.name)
			);
			setfilteredPokemons([...filteredPokemons, ...filteredResults]);
			document.getElementById('filter').click();
		} else {
			const filteredResults = filteredPokemons.filter(
				pokemon =>
					!pokemon.types
						.map(type => type.type.name)
						.includes(e.target.name)
			);
			setfilteredPokemons([...filteredResults]);
			setTimeout(() => {
				document.getElementById('filter').click();
			}, 3000);
		}
	};

	const resetFilterPokemons = () => {
		setfilteredPokemons([]);
	};

	return (
		<PokemonContext.Provider
			value={{
				valueSearch,
				onInputChange,
				onResetForm,
				globalPokemons,
				active,
				setActive,
				handleCheckbox,
				filteredPokemons,
				resetFilterPokemons,
			}}
		>
			{children}
		</PokemonContext.Provider>
	);
};
