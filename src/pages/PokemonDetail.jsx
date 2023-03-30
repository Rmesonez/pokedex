import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import './PokemonDetail.css';

const PokemonDetail = () => {

    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState({});

    const { id } = useParams();

    const getPokemonById = (id) => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
                setPokemon(res?.data);
                // console.log(res?.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setLoading(true)
        getPokemonById(id)
        setLoading(false)
    }, [id])



    function goBack() {
		window.history.back();
	}

	return (
		<main className='container main-pokemon'>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className='header-main-pokemon'>
						<span className='number-pokemon'>#{pokemon?.id}</span>
						<div className='container-img-pokemon'>
							<img
								src={pokemon?.sprites?.front_default}
								alt={`Pokemon ${pokemon?.name}`}
							/>
						</div>

						<div className='container-info-pokemon'>
							<h1>{pokemon?.name}</h1>
							<div className='card-types info-pokemon-type'>
								{pokemon?.types?.map(type => (
									<span key={type?.type?.name} className={`${type?.type?.name}`}>
										{type?.type?.name}
									</span>
								))}
							</div>
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Height</p>
									<span>{pokemon?.height} Dm</span>
								</div>
								<div className='group-info'>
									<p>Weight</p>
									<span>{pokemon?.weight} Hg</span>
								</div>
							</div>
						</div>
					</div>

					<div className='container-stats'>
						<h1>Statistics</h1>
						<div className='stats'>
							<div className='stat-group'>
								<span>Hp</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon?.stats?.[0]?.base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats?.[1]?.base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats?.[2]?.base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats?.[3]?.base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats?.[4]?.base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Speed</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats?.[5]?.base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Moves</span>
								<div className='counter-stat moves'>
									{pokemon?.moves?.map(move => (
										<span key={move?.move?.name}>{move?.move?.name}</span>
									))}
								</div>
							</div>
							<button
							className='goback button'
							onClick={() => {
								goBack();
							}}
							>Go Back</button>
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default PokemonDetail
