import { Provider } from "react-redux";
import "../styles/globals.css";
import initializeStore from "../store";
import Alert from "../components/base/Alert";

const store = initializeStore();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Alert />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
