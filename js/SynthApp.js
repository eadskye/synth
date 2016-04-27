const React = require('react');
const OscArray = require('./components/oscArray');

const SynthApp = React.createClass({
  getInitialState: function() {
    return {oscillators: []}
  },
  onAdd: function(e) {
    let nextItems = this.state.oscillators.concat({id: Date.now()});
    e.preventDefault();
    this.setState({ oscillators: nextItems });
  },
  render: function() {
    return(
      <div>
        <OscArray oscillators={this.state.oscillators} />
        <button onClick={this.onAdd}>Add New Oscillator</button>
      </div>
    )
  }
});

module.exports = SynthApp;
