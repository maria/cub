var React = require('react');

var Nav        = require('./nav');
var PointsList = require('./settings');
var Footer     = require('./footer');

const MAX_PROGRESS = 1000;


var ProfilePage = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <Profile username={this.props.params.username} />
        <ProfileStats username={this.props.params.username} />
        <Footer />
      </div>
    )
  }
});

var ProfileStats = React.createClass({
  getInitialState: function() {
    return {
      repos_count: null,
      repos_score: null,
      repos_top_name: null,
      repos_top_score: null,
      progress: 0,
      login_message: null
    }
  },

  componentDidMount: function() {
    if (typeof username === 'undefined') {
      if (typeof this.props.username === 'undefined') {
        // User not authenticated, looking at default page
        // Show demo data
        this.setState({
          repos_count: '###',
          repos_score: '###',
          repos_top_name: '###',
          repos_top_score: '__',
          progress: 15,
          login_message: 'You need to login to see your own metrics.'
        });

      } else {
        // User is not authenticated, looking at someone
        // Show some real data
        this.setState({
          repos_count: '###',
          repos_score: '###',
          repos_top_name: '###',
          repos_top_score: '__',
          progress: 0,
          login_message: 'You need to login to see more metrics.'
        });
      }

    } else {
      if (typeof this.props.username === 'undefined') {
        // User is authenticated, looking at default page
        this.setState(this.state);

      } else if (this.props.username == username) {
        // User is authenticated, looking at own profile
        var offset = 0;
        var per_page = 999;
        var url = '/api/v1/repository/?offset=' + offset + '&limit=' + per_page;

        $.get(url, function(res) {
          if (this.isMounted()) {

            // Compute total repo score and max repo
            var total_score = 0;
            var max_score = 0;
            var max_repo = '';
            for (var i in res.objects) {
              var score = 0;
              score += res.objects[i].watchers_count * PointsList.watch;
              score += res.objects[i].stargazers_count * PointsList.star;

              if (score > max_score) { max_score = score; max_repo = res.objects[i].name }
              total_score += score;
            }

            this.setState({
              repos_count: res.objects.length,
              repos_score: total_score,
              repos_top_name: max_repo,
              repos_top_score: max_score,
              progress: 100 * total_score / MAX_PROGRESS
            });
          }
        }.bind(this));

      } else {
        // User is authenticated, looking at someone
        this.setState({
          repos_count: null,
          repos_score: null,
          repos_top_name: null,
          repos_top_score: null,
          progress: 0
        });
      }
    }
  },

  render: function() {
    return(
      <div>
        <div className="profile-progress">
          <span className="progress-level" style={{width: '10%'}}>Noob</span>
          <span className="progress-level" style={{width: '80%'}}>Master</span>
          <div id="progress-bar">
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70"
            aria-valuemin="0" aria-valuemax="100" style={{width: this.state.progress + '%', float: 'None'}}>
              {this.state.progress + '%'}
            </div>
          </div>
          <span className="progress-level" style={{width: '100%'}}>Rockstar</span>
        </div>

        <div className="stats-metric">
          <div className="stats-metric-title">Most important repo</div>
          <div className="stats-metric-no">{this.state.repos_top_name}</div>
          <div className="stats-metric-info">{this.state.repos_top_score + " points"}</div>
        </div>
        <div className="stats-metric">
          <div className="stats-metric-title">Total score</div>
          <div className="stats-metric-no">{this.state.repos_score}</div>
          <div className="stats-metric-info">for all repos</div>
        </div>
        <div className="stats-metric">
          <div className="stats-metric-title">Own contributions count</div>
          <div className="stats-metric-no">{this.state.repos_count}</div>
          <div className="stats-metric-info">repositories</div>
        </div>

        { this.state.login_message ?
          <div className="stats-login-msg">
            <a href='/authorize/'>{this.state.login_message}</a>
          </div> : ''}
      </div>
    );
  }
});

var Profile = React.createClass({
  getInitialState: function() {
    return {
      avatar_url : null,
      name       : null,
      username   : null,
      email      : null,
      progress   : 70,
    }
  },

  componentDidMount: function() {
    if (typeof username === 'undefined') {
      if (typeof this.props.username === 'undefined') {
        // User not authenticated, looking at default page
        // Show demo data
        this.setState({
          avatar_url : '/static/images/generic_avatar.png',
          name       : 'Your name',
          username   : 'username',
          email      : 'username@cub.com',
        });

      } else {
        // User is not authenticated, looking at someone
        // Show some real data
        var url = '/api/public/account/?username=' + this.props.username;

        $.get(url, function(res) {
          if (this.isMounted()) {
            this.setState({
              avatar_url : res.objects[0].avatar_url,
              name       : res.objects[0].name,
              username   : res.objects[0].username
            });
          }
        }
        .bind(this))
        .fail(function(err) {
          if (err.status == 400 ) {
            // User not found, redirect to 404 page
            window.location.href = "/404/";
          }
        });
      }

    } else {
      if (typeof this.props.username === 'undefined') {
        // User is authenticated, looking at default page
        // Redirect to own profile
        window.location.href = '/profile/' + username;

      } else if (this.props.username == username) {
        // User is authenticated, looking at own profile
        $.get('/api/v1/myaccount/', function(res) {
          if (this.isMounted()) {
            this.setState({
              avatar_url : res.objects[0].avatar_url,
              name       : res.objects[0].name,
              username   : res.objects[0].username,
              email      : res.objects[0].email
            });
          }
        }.bind(this));

      } else {
        // User is authenticated, looking at someone
        $.get('/api/v1/account/?username=' + this.props.username, function(res) {
          if (this.isMounted()) {
            this.setState({
              avatar_url : res.objects[0].avatar_url,
              name       : res.objects[0].name,
              username   : res.objects[0].username,
              email      : res.objects[0].email
            });
          }
        }
        .bind(this))
        .fail(function(err) {
          if (err.status == 400 ) {
            // User not found, redirect to 404 page
            window.location.href = "/404/";
          }
        });
      }
    }
  },

  render: function() {
    if (this.state.avatar_url) {
      return (
        <div id='profile'>
          <div id='profile-avatar'>
            <img className='avatar' src={this.state.avatar_url}></img>
          </div>
          <div id='profile-info'>
            <div id='profile-name'>{this.state.name}</div>
            <div id='profile-username'>
              <a href={'http://github.com/' + this.state.username}>{this.state.username}</a>
            </div>
            <div id='email'>{this.state.email}</div>
          </div>
        </div>
      );
    } else {
      return(<div></div>);
    }
  }
});

module.exports = ProfilePage;
