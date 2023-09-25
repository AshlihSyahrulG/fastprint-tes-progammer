import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import { Provider } from 'react-redux'
import './App.css'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App
