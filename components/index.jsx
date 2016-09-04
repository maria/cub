var React = require('react');


var IndexPage = React.createClass({
  statics: {
    onEnter(next, transition) {
      // Redirect to profile if user is logged in
      if (typeof username !== 'undefined') {
        return transition(null, '/profile/' + username);
      }
    },
  },

  render: function() {
    return (
      <div>
        <Nav />
        <div id="intro">
          <div id="intro-top">Open Source Connect Hub</div>
          <div id="intro-body">CUB</div>
          <div id="intro-bottom">
            { this.render_links() }
          </div>
        </div>
      </div>
    )
  },

  render_links: function() {
    // OBSOLETE, will be removed
    // User will be redirected to profile page if he is logged in, so we don't
    // need to show /profile link anymore
    if (typeof user !== 'undefined')
      return (<a href="/profile/" id="intro-login">Profile</a>)
    else
      return (<a href="/authorize/" id="intro-login">Login</a>)
  }
});

module.exports = IndexPage;
