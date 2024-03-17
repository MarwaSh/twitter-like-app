import React, { useState, useEffect } from 'react';
import '../styles/Feed.css'; 
import Tweet from './Tweet';
import TweetInput from './TweetInput';
import TweetActions from './TweetActions';

interface TweetType {
  author: string;
  content: string;
  date: string;
}

const Feed: React.FC = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [newTweetContent, setNewTweetContent] = useState('');
  const [author] = useState("Amit Evron");
  const characterLimit = 280;

  useEffect(() => {
    const savedTweets = localStorage.getItem('tweets');
    if (savedTweets) {
      setTweets(JSON.parse(savedTweets));
    }
  }, []);

  const handlePostTweet = () => {
    if (newTweetContent.trim() === '') return;
    const newTweet: TweetType = { author, content: newTweetContent, date: new Date().toISOString() };
    const updatedTweets = [newTweet, ...tweets];
    setTweets(updatedTweets);
    localStorage.setItem('tweets', JSON.stringify(updatedTweets));    
    setNewTweetContent('');
  };

  return (
    <div className="feedContainer">
      <div className='combinedContainer'>
        <div className="inputContainer">
          <span className="authorName">{author}</span>
          <TweetInput
            newTweetContent={newTweetContent}
            handleTweetContentChange={setNewTweetContent}
          />
        </div>
        <TweetActions
          characterLimit={characterLimit}
          newTweetContent={newTweetContent}
          handlePostTweet={handlePostTweet}
        />
      </div>
      <div className="bottomSeparator"></div>
      {tweets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((tweet, index) => (
        <Tweet
          key={index}
          author={tweet.author}
          content={tweet.content}
          date={tweet.date}
        />
      ))}
    </div>
  );
};

export default Feed;
