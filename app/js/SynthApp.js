const React = require('react');
const OscArray = require('./components/oscArray');
const Oscillator = require('./oscillator');
const FilterStage = require('./components/filterStage');

const SynthApp = React.createClass({
  getInitialState: function() {
    return {oscillators: []}
  },

  summedSignal: function() {
    return this.state.oscillators.map((osc) => osc.osc.getOscNode());
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
    return (
      <div className="synth-main">
        <OscArray
          onAdd={this.onAdd}
          oscillators={this.state.oscillators}
          destroy={this.onDestroy}
          summedSignal={this.summedSignal()} />
        <FilterStage signal={this.summedSignal()} />
      </div>
    )
  }
});

module.exports = SynthApp;
