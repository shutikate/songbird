import './styles/main.scss'
import './pages/greeting';
import { Greeting } from './pages/greeting';
import { Game } from './pages/game';
import { Gallery } from './pages/gallery';
import { Results } from './pages/results';
import './pages/results';
import { NotFound } from './pages/notFound';
import { HashRouter } from './utils/router/HashRouter';

new HashRouter([
  { path: '', page: Greeting },
  { path: 'game', page: Game },
  { path: 'gallery', page: Gallery },
  { path: 'results', page: Results },
  { path: '404', page: NotFound },
]);