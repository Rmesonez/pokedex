import './Loader.css'

const LoaderMain = () => {
  return (
    <div className="container-max">
      <div className='loader-container'>
          <h1>Loading...</h1>
          <figure>
            <img src="./pokegif.gif" alt="loading pokedex"/>
          </figure>
      </div>
    </div>
  )
}

export default LoaderMain
