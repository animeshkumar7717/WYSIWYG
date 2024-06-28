import React, { useState } from 'react';

const ButtonComponent = ({ text, editable, onChange, color, onColorChange }) => {
  const [buttonText, setButtonText] = useState(text);
  const [buttonColor, setButtonColor] = useState(color || 'blue');

  const handleTextChange = (e) => {
    setButtonText(e.target.value);
    onChange(e.target.value);
  };

  const handleColorChange = (e) => {
    setButtonColor(e.target.value);
    onColorChange(e.target.value);
  };

  return (
    <div style={{ border: '1px solid black', margin: '8px', padding: '8px', cursor: editable ? 'text' : 'move' }}>
      {editable ? (
        <div>
          <input type="text" value={buttonText} onChange={handleTextChange} />
          <input type="color" value={buttonColor} onChange={handleColorChange} />
        </div>
      ) : (
        <button style={{ backgroundColor: buttonColor }}>{buttonText}</button>
      )}
    </div>
  );
};

export default ButtonComponent;
