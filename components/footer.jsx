var React = require('react');


var Footer = React.createClass({
  render: function() {
    return (
      <footer>
        <ul className="list-inline">
          <li> <a href="https://www.google.ro/maps/place/Bucure%C8%99ti/@44.4377401,25.9545542,11z/data=!3m1!4b1!4m2!3m1!1s0x40b1f93abf3cad4f:0xac0632e37c9ca628?hl=ro" target="_blank"> Hacked with <span className="glyphicon glyphicon-heart" aria-hidden="true"></span> in Bucharest, RO</a> | </li>
          <li> <a href="https://github.com/maria/cub" target="_blank"> GitHub repository </a> | </li>
          <li> <a href="https://unsplash.com/photos/6g0KJWnBhxg" target="_blank"> Background via Unsplash </a></li>
        </ul>
      </footer>
    )
  }
});

module.exports = Footer;
