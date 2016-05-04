const React = require('react');
const OscArray = require('./components/oscArray');
const Oscillator = require('./oscillator');

const SynthApp = React.createClass({
  getInitialState: function() {
    return {oscillators: []}
  },

  onAdd: function(e) {
    let nextItems = this.state.oscillators.concat({
      id: Date.now(),
      osc: new Oscillator()
    });
    this.setState({ oscillators: nextItems });
  },

  onDestroy: function(id) {
    let nextItems = this.state.oscillators;
    let i = this.state.oscillators.findIndex((osc) => {
      return osc.id === id;
    });
    nextItems.splice(i, 1);
    this.setState({ oscillators: nextItems });
  },

  render: function() {
     return(
       <div className="synth-main">
         <OscArray oscillators={this.state.oscillators} destroy={this.onDestroy} />
         <button onClick={this.onAdd}>Add New Oscillator</button>
       </div>
     )
  }
});

module.exports = SynthApp;
