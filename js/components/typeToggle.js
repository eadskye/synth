const React = require('react');

const TypeToggle = (props) => {
  var types = ['sine', 'square', 'sawtooth', 'triangle']
  var active = { border: "1px solid purple"}
  return(
    <div>
      {types.map((type) => {
        return <p onClick={props.handleToggle} value={type} style={props.type === type ? active : null}>{type}</p>
      })}
    </div>
  )
}

module.exports = TypeToggle;
