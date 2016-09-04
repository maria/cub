var React    = require('react');
var History  = require('history');
var ReactDOM = require('react-dom');
var Router   = require('react-router').Router;
var Route    = require('react-router').Route;

var IndexPage    = require('./index');
var ProfilePage  = require('./profile');
var RepoPage     = require('./repos');
var ContactPage  = require('./contact');
var PointsList   = require('./settings');
var PageNotFound = require('./404');


ReactDOM.render((
  <Router history={History.createHistory()}>
    <Route path="/" component={IndexPage} onEnter={IndexPage.onEnter}/>
    <Route path="/profile/" component={ProfilePage} />
    <Route path="/profile/:username" component={ProfilePage} />
    <Route path="/repos/" component={RepoPage} />
    <Route path="/repos/:username" component={RepoPage} />
    <Route path="/contact/" component={ContactPage} />
    <Route path="/404/" component={PageNotFound} />
  </Router>
), document.getElementById("main"))
