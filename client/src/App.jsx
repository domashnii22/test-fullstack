import { Route, Routes } from 'react-router-dom';
import Tables from './components/Tables/Tables';
import Menu from './components/Menu/Menu';
import Dashboards from './components/Dashboards/Dashboards';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/tables" element={<Tables />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
