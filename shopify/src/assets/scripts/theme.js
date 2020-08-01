import _ from 'lodash';
import '../styles/theme.scss';

function component() {
    const element = document.createElement('div');
    console.log("hello worldd");
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());