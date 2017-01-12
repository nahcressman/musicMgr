// src/components/App/index.js
import React, { Component } from 'react';
//import classnames from 'classnames';
import LoginModule from '../LoginModule';
import SearchInterface from '../SearchInterface';

import './style.css';

// class App extends Component {
//   // static propTypes = {}
//   // static defaultProps = {}
//   // state = {}

//   render() {
//     const { className, ...props } = this.props;
//     return (
//       <div className={classnames('App', className)} {...props}>
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

class App extends Component {
  render() {
              return (
            <div>
              <LoginModule/>
              <SearchInterface url="/search"/>
            </div>
          );
  }
}
export default App;