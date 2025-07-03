import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RouterRoutes from './containers/routes/RouterRoutes.jsx'
import MainContainer from './containers/mainContainer/MainContainer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContainer>
      <RouterRoutes />
    </MainContainer>
  </StrictMode>
)
