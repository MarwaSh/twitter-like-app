import  '../styles/TweetActions.css';

interface TweetActionsProps {
    characterLimit: number;
    newTweetContent: string;
    handlePostTweet: () => void;
  }
  
  const TweetActions: React.FC<TweetActionsProps> = ({ characterLimit, newTweetContent, handlePostTweet }) => {
    return (
      <div className='actionContainer'>
        <span className="characterCount" style={{ color: newTweetContent.length > characterLimit ? 'red' : '#657786' }}>
          {characterLimit - newTweetContent.length}
        </span>
        <span className="separator"></span> 
        <button
          className="tweetButton"
          disabled={newTweetContent.length === 0 || newTweetContent.length > characterLimit}
          onClick={handlePostTweet}>
          Tweet
        </button>
      </div>
    );
  };
  
  export default TweetActions;
  