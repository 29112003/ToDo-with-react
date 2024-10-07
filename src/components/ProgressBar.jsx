import React from 'react';

const ProgressBar = ({ completedTasks, totalTasks }) => {
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="fixed top-20 right-20 w-72 h-10 bg-gray-300 rounded-full shadow-lg overflow-hidden">
      <style>
        {`
          @keyframes grow {
            0% {
              width: 0%;
            }
            100% {
              width: ${percentage}%;
            }
          }
        `}
      </style>
      <div
        className="h-full bg-green-500"
        style={{
          width: `${percentage}%`,
          animation: `grow 1s ease-in-out forwards`,
          transition: 'width 0.5s ease-in-out', // Smooth transition for width
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;
