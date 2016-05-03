const React = require('react');

const TypeToggle = (props) => {
  let active = { border: "1px solid purple"}
  return(
    <div>
      {props.types.map((type) => {
        return <p onClick={props.handleToggle} key={type} value={type} style={props.type === type ? active : null}>{type}</p>
      })}
    </div>
  )
}

module.exports = TypeToggle;
