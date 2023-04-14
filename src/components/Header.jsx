import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { PokemonContext } from '../context/PokemonContext';
import { useContext } from 'react';


const Header = () => {

	const { onInputChange, valueSearch, onResetForm } =
		useContext(PokemonContext);

	const navigate = useNavigate();

	const onSearchSubmit = e => {
		e.preventDefault();
		navigate('/search', {
			state: valueSearch,
		});

		onResetForm();
	};


  return (
    <>
            <div className='header-title'>
				<img src='/pokemonbg1.jpg' alt='bg pokemon' />
			</div>
			<header className='container nav'>
				<Link to='/home' className='logo'>
					<img
						src='/Pokédex_logo.png'
						alt='Logo Pokedex'
					/>
				</Link>
				<form onSubmit={onSearchSubmit} >
					<div className='form-group'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='icon-search'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
							/>
						</svg>
						<input
							type='search'
							name='valueSearch'
							id=''
							value={valueSearch}
							onChange={onInputChange}
							placeholder='Pokemon name'
						/>
						</div>

						<button className='btn-search'>Search</button>
					</form>
					
            </header>

    </>
  )
}

export default Header
