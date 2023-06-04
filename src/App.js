import Header from './components/Header.js';
import ResumeList from './components/ResumeList.js';
import { BrowserRouter, Routes,Route, Link } from "react-router-dom";
import './App.css';


function App() {

  return (
    <div>
    <BrowserRouter>
    <Header />
    
            
    <Routes>
            <Route  path="/*"  element={ <ResumeList /> }> 
            </Route> 
      
    </Routes>
</BrowserRouter>
         </div>
 
      
      

  
  );
}

export default App;
