import "antd/dist/antd.css";
import "./styles.css";
import { AppRouter } from "./routes/AppRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import "antd/dist/antd.css";

function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
    </Provider>
  );
}

export default App;
