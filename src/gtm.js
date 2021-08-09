import ReactGA from 'react-ga'

if (window) {
  ReactGA.initialize('G-GGWQWR75M0')
  ReactGA.pageview(window.location.pathname)
}
