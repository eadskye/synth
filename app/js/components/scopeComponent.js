const React = require('react');
const scope = require('../scope.js');

/*
 * @props {AudioNode} signal
*/
let Scope = React.createClass({
  getInitialState: function() {
    return {drawing: true};
  },

  componentDidMount: function() {
    this._scope = scope(this.refs.node, this.props.signal);
    this._scope.start();
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },

  componentWillReceiveProps: function(nextProps) {
    this._scope.destroy();
    this._scope = scope(this.refs.node, nextProps.signal);
  },

  handleVisibilityChange: function() {
    if (document.hidden) {
      this.setState({ drawing: false })
    } else {
      this.setState({ drawing: true })
    }
  },

  render: function() {
    // bypass for init render
    if (this._scope !== undefined) this.state.drawing ? this._scope.start() : this._scope.stop();
    return(
      <div ref="node"></div>
    )
  }
});

module.exports = Scope;
