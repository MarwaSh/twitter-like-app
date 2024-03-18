import React from 'react';
import { format, parseISO } from 'date-fns';
import '../styles/Tweet.css';

interface TweetProps {
  authorName: string;
  content: string;
  date: string;
}

const Tweet: React.FC<TweetProps> = ({ authorName, content, date }) => {
  const formattedDate = format(parseISO(date), 'h:mm a · MMM d, yyyy');

  return (
    <div className="tweetContainer">
      <div className="tweetAuthorName" title={authorName}>{authorName}</div>
      <div className="content">{content}</div>
      <div className="datePosted">{formattedDate}</div>
    </div>
  );
};

export default React.memo(Tweet);
