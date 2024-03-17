import React from 'react';
import { format, parseISO } from 'date-fns';
import '../styles/Tweet.css';

interface TweetProps {
  author: string;
  content: string;
  date: string;
}

const Tweet: React.FC<TweetProps> = ({ author, content, date }) => {
  const formattedDate = format(parseISO(date), 'h:mm a · MMM d, yyyy');

  return (
    <div className="tweetContainer">
      <div className="author">{author}</div>
      <div className="content">{content}</div>
      <div className="datePosted">{formattedDate}</div>
    </div>
  );
};

export default Tweet;
