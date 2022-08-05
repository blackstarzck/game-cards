import './app.css';
import { Page } from './components/Global.element';
import Navbar from './components/Navbar/Navbar';
import Section from './components/Section/Section';

function App() {
  return (
    <Page>
      <Navbar />
      <Section />
    </Page>
  );
}

export default App;
