

<BrowserRouter>
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/dass' component={Dass42}/>
    <Route exact path='/iron' component={IronLevels}/>
    <Route path='*' component={NotFound}/>
  </Switch>
</BrowserRouter>
