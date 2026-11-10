import { useHashRoute } from './hooks/useHashRoute';
import OrganizerPage from './pages/OrganizerPage';
import RevealPage from './pages/RevealPage';

export default function App() {
  const route = useHashRoute();

  if (route.name === 'reveal') {
    // key: ao navegar entre links no mesmo separador, o estado da página reinicia
    return <RevealPage key={route.token} token={route.token} />;
  }
  return <OrganizerPage />;
}
