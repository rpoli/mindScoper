
import React from './lib/react/react';
var ReactDOM = require('react-dom');
import Header from './components/header/header';
import Footer from './components/footer/footer';
 
ReactDOM.render(<Header/>,document.getElementById("appHeader"));
ReactDOM.render(<Footer />,document.getElementById("appFooter"));
