import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import TextBox from './TextBox';
import ImageComponent from './ImageComponent';
import Button from './ButtonComponent';

const Canvas = ({ components, addComponent }) => {
  const [items, setItems] = useState([]);
  const [bgColor, setBgColor] = useState('white');
  const [editMode, setEditMode] = useState(false); 
  const [editState, setEditState] = useState([]); 
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (previewMode) {
      setEditState(items);
    } else {
      setItems(editState);
    }
  }, [previewMode, items, editState]);

  const [{ isOver }, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item) => {
      if (item.type === 'IMAGE') {
        setItems((prevItems) => [...prevItems, { type: 'IMAGE', imageUrl: item.imageUrl }]);
      } else if (item.type === 'TEXT') {
        setItems((prevItems) => [...prevItems, { type: 'TEXT', content: '' }]);
      } else if (item.type === 'BUTTON') {
        setItems((prevItems) => [...prevItems, { type: 'BUTTON', text: 'Button', color: 'blue' }]);
      } else {
        addComponent(item.type);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const handleTextBoxChange = (index, content) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], content };
    setItems(updatedItems);
  };

  const handleImageChange = (index, imageUrl) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], imageUrl };
    setItems(updatedItems);
  };

  const handleButtonTextChange = (index, text) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], text };
    setItems(updatedItems);
  };

  const handleButtonColorChange = (index, color) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], color };
    setItems(updatedItems);
  };

  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <label>Canvas Background Color: </label>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        <button onClick={toggleEditMode}>{editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}</button>
        <button onClick={togglePreviewMode}>{previewMode ? 'Exit Preview Mode' : 'Preview Mode'}</button>
      </div>
      <div ref={drop} className="scrollable-container" style={{ backgroundColor: isOver ? 'lightgray' : bgColor }}>
        {items.map((item, index) => (
          item.type === 'IMAGE' ? (
            <ImageComponent key={index} imageUrl={item.imageUrl} editable={editMode} onChange={(imageUrl) => handleImageChange(index, imageUrl)} />
          ) : item.type === 'TEXT' ? (
            <TextBox key={index} content={item.content} editable={editMode} onChange={(content) => handleTextBoxChange(index, content)} />
          ) : item.type === 'BUTTON' ? (
            <Button key={index} text={item.text} editable={editMode} onChange={(text) => handleButtonTextChange(index, text)} color={item.color} onColorChange={(color) => handleButtonColorChange(index, color)} />
          ) : null
        ))}
      </div>
    </div>
  );
};

export default Canvas;
