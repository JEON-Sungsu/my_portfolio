import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import GlobalStyle from './styles/GlobalStyle'
import { theme } from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
