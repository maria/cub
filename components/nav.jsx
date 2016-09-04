var React = require('react');
var Link  = require('react-router').Link;

var Nav = React.createClass({
  render: function() {
    var user = ''
    if (typeof username !== 'undefined')
      user = username

    return (
      <div id="head">
        <div id="head-box">
          <div id="logo">
            <Link to='/'>CUB</Link>
          </div>
          <nav id="nav">
            <li><Link to={'/profile/' + user}>Profile</Link></li>
            <li><Link to={'/repos/' + user}>Repos</Link></li>
            <li><Link to='/contact/'>Contact</Link></li>
            { this.render_links() }
          </nav>
        </div>
      </div>
    )
  },

  render_links: function() {
    if (typeof user !== 'undefined') {
      return (<li><a href="/logout/" id="intro-login">Logout</a></li>)
    } else {
      return (<li><a href="/authorize/" id="intro-login">Login</a></li>)
    }
  }
})

module.exports = Nav;
