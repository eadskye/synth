const React = require('react');
const OscComponent = require('./oscComponent');
const Scope = require('./scope');

const OscillatorArray = (props) => {
  return (
    <div className="osc-array-main">
      <div className="osc-array">
        {props.oscillators.map((osc) =>
          <OscComponent 
            id={osc.id} 
            key={osc.id} 
            osc={osc.osc} 
            destroy={props.destroy}
          />
         )}
      </div>
      <Scope signal={props.oscillators.map((osc) => osc.osc.getOscNode())} />
    </div>
  )
};

module.exports = OscillatorArray;
