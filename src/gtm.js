import ReactGA from 'react-ga'

if (typeof window !== 'undefined') {
  ReactGA.initialize('G-GGWQWR75M0')
  ReactGA.pageview(window.location.pathname)
}
