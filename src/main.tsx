import ReactDOM from 'react-dom/client'
import App from './App'
import { EditorConfigContextProvider } from './context/editorConfig'
import store from './store/index'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <EditorConfigContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </EditorConfigContextProvider>
  // </React.StrictMode>
)
