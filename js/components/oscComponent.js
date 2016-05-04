const React = require('react');
const GainButton = require('./gainButton');
const FreqSlider = require('./freqSlider');
const TypeToggle = require('./typeToggle');
const DestroyButton = require('./destroyButton');
const Scope = require('./scope');

/* 
 * @props {AudioNode} osc
*/
const OscillatorComponent = React.createClass({
  osc: {},
  types: ['sine', 'square', 'sawtooth', 'triangle'],

  // probably will need state in the future:
  getInitialState: function() {
    return {
      type: 'sine',
      frequency: 50,
      gain: false
    }
  },

  componentWillMount: function() {
    this.props.osc.setGain(0).setFreq(this.state.frequency).start();
  },

  handleSlide: function(e) {
    this.props.osc.setFreq(this.state.frequency);
    this.setState({
      frequency: e.target.value
    })
  },

  handleGainClick: function(e) {
    e.preventDefault();
    this.state.gain ? this.props.osc.setGain(0) : this.props.osc.setGain(.5);
    this.setState({
      gain: !this.state.gain
    });
  },

  handleTypeToggle: function(e) {
    this.props.osc.setType(e.target.value);
    this.setState({
      type: e.target.value
    })
  },

  componentWillUnmount: function() {
    // TODO: perhaps destroy the Oscillator if webaudio doesnt do that already,
    // (an OscillatorNode can only started/stopped once)
    this.props.osc.stop();
  },

  render: function() {
    return (
      <div className="osc-component">
        <DestroyButton id={this.props.id} onDestroy={this.props.destroy} />
        <GainButton on={this.state.gain} handleClick={this.handleGainClick}/>
        <FreqSlider frequency={this.state.frequency} handleSlide={this.handleSlide} />
        <TypeToggle type={this.state.type} types={this.types} handleToggle={this.handleTypeToggle} />
        <Scope signal={this.props.osc.getOscNode()} />
      </div>
    )
  }
});

module.exports = OscillatorComponent;
