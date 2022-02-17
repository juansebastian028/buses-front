import 'antd/dist/antd.css';
import './styles.css';
import { AppRouter } from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
