import Header from '../components/Header';
import WellList from '../components/WellList';
import Dashboard from '../components/Dashboard';
import Chatbot from '../components/Chatbot';
import { WellProvider } from '../context/WellContext';

export default function Home() {
  return (
    <WellProvider>
      <div className="flex flex-col h-screen bg-brand-light font-sans">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <WellList />
          <main className="flex-1 flex overflow-hidden">
            <Dashboard />
            <Chatbot />
          </main>
        </div>
      </div>
    </WellProvider>
  );
}
