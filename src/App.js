import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import CountryList from './components/country-list/CountryList';
import CountryDetails from './components/country-details/CountryDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/**
 * This component controlls all routing
 * @returns {JSX.Element} 
 */
function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Header/>
    </div>
    <Routes>
    <Route path="/" element={<CountryList />} /> 
    <Route path ="/country-detail/:countryName" element ={<CountryDetails/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
