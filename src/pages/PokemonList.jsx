import { useState, useEffect, useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext';
import ReactPaginate from "react-paginate"
import axios from 'axios'
import Loader from '../components/Loader'
import PokemonCard from '../components/PokemonCard'
import './PokemonList.css'

const PokemonList = () => {

    const [loading, setLoading] = useState(false)
    const { filteredPokemons } =
		useContext(PokemonContext);

    //all pokemons

    const [allPokemons, setAllPokemons] = useState([]);
    const [ currentItems, setCurrentItems ] = useState([])
    const [ itemOffset, setItemOffset ] = useState(0)
    const [ pageCount, setPageCount ] = useState(0)
    const itemsPerPage = 14;


    const getAllPokemons = () => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=1261/')
            .then(res => {
                setAllPokemons(res?.data?.results)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        setLoading(true)
        getAllPokemons()
        setLoading(false)
    }, [])

  

//all pokemon pagination
  useEffect(() => {
        setLoading(true)
        const endOffset = itemOffset + itemsPerPage
        const newCurrentItems = allPokemons?.slice(itemOffset, endOffset)
        setCurrentItems(newCurrentItems)
        setPageCount(Math.ceil(allPokemons?.length / itemsPerPage))
        setLoading(false)
    }, [itemOffset, allPokemons])

  const handlePageClick = (e) => {
      const newOffset = e.selected * itemsPerPage
        setItemOffset(newOffset)
    }
    

  return (
    <>
        {
				loading ? (
					<Loader />
				) : (			
				<div className='card-list-pokemon container'>
					{filteredPokemons?.length ? (
						<>
							{filteredPokemons?.map(pokemon => (
								<PokemonCard pokemon={pokemon} key={pokemon?.id} />
							))}
						</>
					) : (
						<>
							{
                            currentItems?.map(pokemon => (
                            <PokemonCard pokemon={pokemon} key={pokemon?.id} />
                            ))
                            }
						</>
                            
                        
					)}
                    <div className="paginate">
                    <ReactPaginate
                    breakLabel={ "..." }
                    breakClassName={ "break-me" }
                    containerClassName={ "pagination" }
                    nextLabel={ "Next >" }
                    previousLabel={ "< Previous" }
                    pageCount={ pageCount }
                    renderOnZeroPageCount={ false }
                    onPageChange={ handlePageClick }
                    pageRangeDisplayed={ 5 }
                    marginPagesDisplayed={ 2 }
                    activeClassName={ "active" }
                    pageLinkClassName={ "page-link" }

                    />
                    </div>
      
            </div>	
			)
		}
        
	</>
  )
}

export default PokemonList
