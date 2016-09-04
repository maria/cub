var React = require('react');

var PointsList = React.createClass({
  statics: {
    watch : 10,
    star  : 20
  },

  render: function() {
    return (
      <div>
        <h2>Points:</h2>
        <ul>
          <li>Watcher: {PointsList.watch}p</li>
          <li>Star: {PointsList.star}p</li>
        </ul>
      </div>
    );
  }
});

module.exports = PointsList;
