import { useState } from 'react';
import Card from './Card';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stories = () => {
  const stories = [
    'Life is too short to be anything but happy.',
    'In the end, we only regret the chances we didn’t take.',
    'The best way to predict the future is to create it.',
    'Believe you can and you’re halfway there.',
    'The only limit to our realization of tomorrow will be our doubts of today.',
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'The greatest glory in living lies not in never falling, but in rising every time we fall.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;
  const totalStories = stories.length;
  const lastIndex = totalStories - cardsToShow;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + cardsToShow <= lastIndex ? prevIndex + cardsToShow : lastIndex));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - cardsToShow >= 0 ? prevIndex - cardsToShow : 0));
  };

  const renderCards = () => {
    return stories.slice(currentIndex, currentIndex + cardsToShow).map((story, index) => (
      <Card key={index} height={200} width={140}>
        {story}
      </Card>
    ));
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <button
        className={`bg-gray-200 rounded-full p-2 ${
          currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-300'
        }`}
        onClick={goToPrevious}
        disabled={currentIndex === 0}
      >
        <FontAwesomeIcon icon={faArrowLeft}  />
      </button>
      {renderCards()}
      <button
        className={`bg-gray-200 rounded-full p-2 ${
          currentIndex === lastIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-300'
        }`}
        onClick={goToNext}
        disabled={currentIndex === lastIndex}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Stories;
