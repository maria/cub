var React         = require('react');
var ReactPaginate = require('react-paginate');

var Nav        = require('./nav');
var PointsList = require('./settings');
var Footer     = require('./footer');

const per_page = 10;


var RepoPage = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <RepoList username={this.props.params.username} />
        <Footer />
      </div>
    )
  }
});

var RepoList = React.createClass({
  getInitialState: function() {
      return {
        repos: [],
        offset: 0,
        pageNum: 1,
        nextOffset: per_page,
        previousOffset: 0
      }
  },

  getRepoList: function() {
    var offset = this.state.offset;
    var nextOffset = offset + per_page;
    var previousOffset = (offset - per_page < 1) ? 0 : offset - per_page;
    var url = '/api/v1/repository/?offset=' + offset + '&limit=' + per_page;

    $.get(url, function(res) {
      this.setState({
        repos: res.objects,
        nextOffset: nextOffset,
        previousOffset: previousOffset,
        pageNum: Math.ceil(res.meta.total_count / per_page )})
     }.bind(this));
  },

  componentDidMount: function() {
    if (this.props.username !== 'undefined' && this.isMounted()) {
      this.getRepoList();

    } else {
      // Load demo page
      this.setState({
        repos   : {},
        offset  : null,
        pageNum : null
      });
    }
  },

  handleClick: function(event) {
    var pageSelected = event.selected;

    this.setState({
      offset: pageSelected * per_page
    }, () => {
      this.getRepoList();
    });
  },

  render: function() {
    return (
      <div>
        <h1>Your score</h1>
        <PointsList />
        <h1>Your contributions</h1>
        { this.state.repos.map(function(repo, i) {
          return (<Repo repo={repo} key={i} />)
        }, this)}

        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handleClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pagination-pages"}
                       activeClassName={"active"} />
      </div>
    );
  }
});

var Repo = React.createClass({
  render: function() {
    var repo_score = this.props.repo.watchers_count * PointsList.watch;
    repo_score += this.props.repo.stargazers_count * PointsList.star;

    return (
      <div className="repo-item">
        <div className="repo-score">
          <div className="repo-score-points">{repo_score}</div>
          <div className="repo-score-text">Points</div>
        </div>
        <div className="repo-name">
          <a href={this.props.repo.html_url}>{this.props.repo.name}</a>
        </div>
        <div className="repo-description">{this.props.repo.description}</div>
        <ul>
          <li>Forked: {this.props.repo.fork}</li>
          <li>Forks: {this.props.repo.forks_count}</li>
          <li>Stars: {this.props.repo.stargazers_count}</li>
          <li>Watchers: {this.props.repo.watchers_count}</li>
        </ul>
      </div>
    )
  }
})

module.exports = RepoPage;
