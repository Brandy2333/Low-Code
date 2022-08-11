import ReactDOM from 'react-dom/client';
import App from './App';
import { EditorConfigContextProvider } from "./context/editorConfig"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <EditorConfigContextProvider>
    <App />
  </EditorConfigContextProvider>
  // </React.StrictMode>
);

