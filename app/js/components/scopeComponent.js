const React = require('react');
const scope = require('../scope.js');

/*
 * @props {AudioNode} signal
*/
let Scope = React.createClass({
  scope: {},

  getInitialState: function() {
    return {drawing: true};
  },

  componentDidMount: function() {
    this.scope = scope(this.refs.canvas, this.props.signal);
  },

  componentWillReceiveProps: function(nextProps) {
    // cheap trick to only redraw the 'scope if we are "summing" the signal,
    // and n inputs have changed. skips on single osc components
    if (!Array.isArray(nextProps.signal)) return;
    this.scope = scope(this.refs.canvas, nextProps.signal);
  },

  handleVisibilityChange: function() {
  },

  handleToggle: function() {
    this.setState({
      drawing: !this.state.drawing
    })
    this.state.drawing ? this.scope.start() : this.scope.stop();
  },

  render: function() {
    return(
      <div>
        <button onClick={this.handleToggle}>Toggle Scope</button>
        <canvas ref="canvas"></canvas>
      </div>
    )
  }
});

module.exports = Scope;
