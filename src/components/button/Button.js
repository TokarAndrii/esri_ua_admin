import React from 'react';

function Button({ cmd, arg, children, className }) {
  return (
    <button
      type="button"
      key={cmd}
      className={className}
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(cmd, false, arg); // Send the command to the browser
      }}
    >
      {children}
    </button>
  );
}

export default Button;
