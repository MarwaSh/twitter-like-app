import React, { useState, useEffect, useCallback, useMemo  } from 'react';
import '../styles/Feed.css'; 
import Tweet from './Tweet';
import TweetInput from './TweetInput';
import TweetActions from './TweetActions';
import AuthorInput from './AuthorInput';

interface TweetType {
  authorName: string;
  content: string;
  date: string;
}

const Feed: React.FC = () => {
  const [visibleTweetsCount, setVisibleTweetsCount] = useState(10);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [newTweetContent, setNewTweetContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const characterLimit = 280;

  useEffect(() => {
    const savedTweets = localStorage.getItem('tweets');
    if (savedTweets) {
      setTweets(JSON.parse(savedTweets));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        setVisibleTweetsCount(prevCount => prevCount + 10);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePostTweet = useCallback(() => {
    if (newTweetContent.trim() === '') return;
    setTweets(tweets => {
      const newTweet: TweetType = { authorName: authorName, content: newTweetContent, date: new Date().toISOString() };
      const updatedTweets = [newTweet, ...tweets];
      localStorage.setItem('tweets', JSON.stringify(updatedTweets));
      return updatedTweets;
    });
    setNewTweetContent('');
  }, [newTweetContent, authorName]);

  const sortedTweets = useMemo(() => {
    return [...tweets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [tweets]);

  return (
    <div className="feedContainer">
      <div className='combinedContainer'>
        <div className="inputContainer">
          <AuthorInput authorName={authorName} setAuthorName={setAuthorName} />
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
      {sortedTweets.length> 0 ? (
      sortedTweets.slice(0, visibleTweetsCount).map((tweet, index) => (
        <Tweet
          key={index}
          authorName={tweet.authorName}
          content={tweet.content}
          date={tweet.date}
        />
      ))
      ) : (
        <div className="emptyFeedMessage">No tweets to display. Be the first to post something!</div>
      ) }
    </div>
  );
};

export default Feed;