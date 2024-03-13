import './index.scss';
import AppRouter from "./Components/AppRouter/AppRouter";
import NavBar from "./Components/NavBar/NavBar";
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <AppRouter>
          <NavBar />
        </AppRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
