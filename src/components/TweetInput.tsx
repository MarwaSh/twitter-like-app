import React from 'react';
import '../styles/TweetInput.css'

interface TweetInputProps {
    newTweetContent: string;
    handleTweetContentChange: (content: string) => void;
  }
  
  const TweetInput: React.FC<TweetInputProps> = ({ newTweetContent, handleTweetContentChange }) => {
    return (
      <input
        type="text"
        className="newTweetInput"
        value={newTweetContent}
        onChange={(e) => handleTweetContentChange(e.target.value)}
        placeholder="What's happening?!"
      />
    );
  };
  
  export default TweetInput;