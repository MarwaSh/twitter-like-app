import React from 'react';
import '../styles/AuthorInput.css';

interface AuthorInputProps {
  authorName: string;
  setAuthorName: (name: string) => void;
}

const AuthorInput: React.FC<AuthorInputProps> = ({ authorName, setAuthorName }) => {
  return (
    <input
      type="text"
      value={authorName}
      onChange={(e) => setAuthorName(e.target.value)}
      placeholder="Author Name"
      className="authorInput"
    />
  );
};

export default React.memo(AuthorInput);
