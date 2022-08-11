import './app.css';
import Navbar from './components/cointainer/Navbar/Navbar';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <div className="blur-img"></div>
      <Navbar/>
      <Home/>
    </>
  );
}

export default App;
