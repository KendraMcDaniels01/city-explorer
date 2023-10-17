import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Explorer from  './components/Explorer';


function App() {
  return (
    <>
      <div className="App">
      <header>
    <h1>City Explorer</h1>
    </header>
    <nav>
      <input
        type="text"
        id="keyword"
        name="keyword"
        placeholder="keyword OR lat,lon"
      />
    </nav>  
        <Explorer />

      </div>
    </>
  )
}

export default App;