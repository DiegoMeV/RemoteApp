import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import RouterRoutes from './containers/routes/RouterRoutes.jsx'
import MainContainer from './containers/mainContainer/MainContainer.jsx'
import './index.css'
import('host-app/globalStyles') // Importing the QueryClient from the host app

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContainer>
      <RouterRoutes />
    </MainContainer>
  </StrictMode>
)
