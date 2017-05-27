/**
 * App.js
 *
 */

import $ from 'jquery'
import retina from 'retinajs'

/*
 * Components
 */
import './components/nav-collapse'
// import './components/modal'

/* Init Retinajs */
retina()

/* Make jQuery available to October CMS */
window.$ = $
window.jQuery = $
