const React = require('react');
const OscComponent = require('./oscComponent');

const OscillatorArray = (props) => {
  let createOscComponent = (osc) => {
    return <OscComponent key={osc.id} />
  }
  return <div>{props.oscillators.map(createOscComponent)}</div>
};

module.exports = OscillatorArray;
