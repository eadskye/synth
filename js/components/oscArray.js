const React = require('react');
const OscComponent = require('./oscComponent');
const Scope = require('./scope');

let createOscComponent = (oscComp) => {
  return <OscComponent key={oscComp.id} osc={oscComp.osc}/>
}

const OscillatorArray = (props) => {
  return (
    <div>
      {props.oscillators.map(createOscComponent)}
      <Scope signal={props.oscillators.map((osc) => osc.osc.getOscNode())} />
    </div>
  )
};

module.exports = OscillatorArray;
