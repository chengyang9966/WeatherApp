import React,{useEffect,useState} from 'react';
import './App.css';
import env from "react-dotenv";
import Weather from "./pages/weather";
import Loader from './components/loader'; 
function App() {
  const[loadingTest,setLoadingTest]=useState<Boolean>(false)
  console.log('loadingTest: ', loadingTest);

  useEffect(()=>{
    if(!(sessionStorage.getItem('API_KEY')===env.API_KEY)){
      setLoadingTest(true)
      sessionStorage.setItem('API_KEY',env.API_KEY)
      setLoadingTest(false)
    }
  
     
    
    
},[])
  return (
    <div className="App">
   <Loader Defaultloading={loadingTest}/>
      <Weather/>
    </div>
  );
}

export default App;
