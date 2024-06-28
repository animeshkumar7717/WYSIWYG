import React from 'react';

const ImageComponent = ({ imageUrl, editable, onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="component-container">
      {editable ? (
        <input type="file" accept="image/*" onChange={handleFileChange} />
      ) : (
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />
      )}
    </div>
  );
};

export default ImageComponent;
