import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './bootstrap.min.css'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
