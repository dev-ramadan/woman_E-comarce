import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { OurePtovider } from './context/gloableContext.jsx'
import { Provider } from 'react-redux'
import { store } from './api/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <OurePtovider>
    <App />
  </OurePtovider>,
  </Provider>
)
