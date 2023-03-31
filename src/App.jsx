import { createContext, useState, useEffect } from 'react'
import { PokemonProvider } from './context/PokemonProvider';
import { Route, Routes, HashRouter } from 'react-router-dom'
import ReactSwitch from 'react-switch';
import './App.css'
import './DarkMode.css'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectRoutes from './components/ProtectRoutes'
import PokemonList from './pages/PokemonList'
import PokemonDetail from './pages/PokemonDetail'
import SearchPage from './pages/SearchPage'

export const ThemeContext = createContext(null);

function App() {
  
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
	

	const toogleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

  useEffect(() => {
		setLoading(true);
		setTimeout(() => {
		  setLoading(false);
		}, 5000); 
        }, []);


  return (
    <ThemeContext.Provider value={{ theme, toogleTheme }}>
    <PokemonProvider>
    <HashRouter>
      <div className="App" id={ theme }>
      <div className="switch">
					<span> { theme === 'light' ? 'Light ' : 'Dark '}</span>
				<ReactSwitch 
				onChange={toogleTheme} checked={ theme === 'dark' } 
				/>
				</div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={ <ProtectRoutes /> }>
          <Route path="/home" element={<Home />} />
               <Route path="/pokemon" element={<PokemonList />} />
               <Route path="/pokemon/:id" element={<PokemonDetail />} />
                <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
    </PokemonProvider>
    </ThemeContext.Provider>
  )
}

export default App
