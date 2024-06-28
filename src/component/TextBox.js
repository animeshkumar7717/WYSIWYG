import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextBox = ({ content, editable, onChange }) => {
  const [editorHtml, setEditorHtml] = useState(content);

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    onChange(html);
  };

  return (
    <div className="component-container">
      {editable && (
        <ReactQuill
          value={editorHtml}
          onChange={handleEditorChange}
          readOnly={!editable}
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image', 'video'],
              ['clean']
            ],
          }}
        />
      )}
      {!editable && <div dangerouslySetInnerHTML={{ __html: editorHtml }} />}
    </div>
  );
};

export default TextBox;
