// import React from 'react'
// import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
// import Dass42 from './Dass42'
// import IronLevels from './IronLevels'
// import Home from './Home'
// import NotFound from './NotFound'
// // https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
// const AppRouter = () => (
//   <div>
//     <BrowserRouter>
//       <Switch>
//         <Route exact path='/' component={Home} />
//         <Route exact path='/dass' component={Dass42} />
//         <Route exact path='/iron' component={IronLevels} />
//         <Route path='*' component={NotFound} />
//       </Switch>
//     </BrowserRouter>
//   </div>
// )
// export default AppRouter

// <BrowserRouter>
//   <Switch>
//     <Route exact path='/' component={Home}
//             children={() => <Link to="/">Home</Link>} />
//     <Route exact path='/dass' component={Dass42}
//            children={() => <Link to="/dass">DASS42</Link> } />
//     <Route exact path='/iron' component={IronLevels}
//            children={() => <Link to="/iron">Iron Levels</Link> } />
//     <Route path='*' component={NotFound} />
//   </Switch>
// </BrowserRouter>
