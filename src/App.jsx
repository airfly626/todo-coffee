import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Stats from './components/Stats';
import History from './components/History';
import Layout from './components/Layout';
import Hero from './components/Hero';
import CoffeeForm from './components/CoffeeForm';
import { useAuth } from './context/AuthContext';


function App() {
  //db
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuthenticated = globalUser;
  const isData = globalData && !!Object.keys(globalData || {}).length;


  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );


  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated} />
      {
        isAuthenticated && isLoading &&
        <div className="text-center mb-5">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="fw-bold">Loading data...</h4>
        </div>
      }
      {
        isAuthenticated && isData && authenticatedContent
      }
    </Layout>
  )
}

export default App
