import logo from './logo.svg';
import './App.css';
import HeaderAppComponent from './components/HeaderAppComponent';
// import MatchResumeComponent from './components/MatchResumeComponent';
import PlayRoundComponent from './components/PlayRoundComponent';

function App() {
  return (<>
      <HeaderAppComponent />
      <div className="App">
        <PlayRoundComponent />
        {/* <MatchResumeComponent /> */}
      </div>
    </>
  );
}



export default App;
