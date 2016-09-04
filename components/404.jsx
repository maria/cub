var React = require('react');


var PageNotFound = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <h1>404: Page not found</h1>
        <Footer />
      </div>
    )
  }
});

module.exports = PageNotFound;
