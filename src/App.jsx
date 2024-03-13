
import './index.scss'
import AppRouter from "./Components/AppRouter/AppRouter";
import NavBar from "./Components/NavBar/NavBar";
import Footer from './Components/Footer/Footer';


function App() {
  

  return (
    <>
      <AppRouter>
        <NavBar />

      </AppRouter>
      <Footer/>
      
    </>
  )
}

export default App
