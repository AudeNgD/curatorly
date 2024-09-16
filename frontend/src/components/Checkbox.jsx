import React from "react";

function Checkbox({ label, value, onChange }) {
  return (
    <label>
      <input type="checkbox" value={value} onChange={onChange} defaultChecked />
      {label}
    </label>
  );
}

export default Checkbox;
