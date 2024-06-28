import React from 'react';
import { useDrag } from 'react-dnd';

const ToolbarItem = ({ type, label, imageUrl }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COMPONENT',
    item: { type, imageUrl },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="toolbar-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {label}
    </div>
  );
};

export default ToolbarItem;
