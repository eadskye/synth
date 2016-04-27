const React = require('react');
const GainButton = require('./gainButton');
const FreqSlider = require('./freqSlider');
const TypeToggle = require('./typeToggle');
const Oscillator = require('../oscillator');
const Scope = require('./scope');
const audioCtx = require('../helpers/audioctx');

const OscillatorComponent = React.createClass({
  osc: {},

  // probably will need state in the future:
  getInitialState: function() {
    return {
      type: 'sine',
      frequency: 50,
      gain: false
    }
  },

  componentWillMount: function() {
    this.osc = new Oscillator(audioCtx); // run all oscillator nodes in same audio context
    this.osc.setGain(0).setFreq(this.state.frequency).start();
  },

  handleSlide: function(e) {
    this.osc.setFreq(this.state.frequency);
    this.setState({
      frequency: e.target.value
    })
  },

  handleGainClick: function(e) {
    e.preventDefault();
    this.state.gain ? this.osc.setGain(0) : this.osc.setGain(1);
    this.setState({
      gain: !this.state.gain
    });
  },

  handleTypeToggle: function(e) {
    this.osc.setType(e.target.value);
    this.setState({
      type: e.target.value
    })
  },

  render: function() {
    return (
      <div className="osc-component">
        <GainButton on={this.state.gain} handleClick={this.handleGainClick}/>
        <FreqSlider frequency={this.state.frequency} handleSlide={this.handleSlide} />
        <TypeToggle type={this.state.type} handleToggle={this.handleTypeToggle} />
        <Scope osc={this.osc.getOscNode()} />
      </div>
    )
  }
});

module.exports = OscillatorComponent;
