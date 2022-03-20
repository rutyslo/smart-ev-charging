import './App.css';
import Settings from "./components/settings/settings";
import { Routes, Route} from "react-router-dom";
import {ReactComponent as LightningIcon} from './assets/images/lightning-bolt.svg';
import Status from "./components/settings/status/status";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Settings/>} />
          <Route path="/info" element={<Status/>} />
      </Routes>
    </div>
  );
}

export default App;
