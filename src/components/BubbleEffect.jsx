import React, { useState } from 'react';

const BubbleEffect = () => {
  const [bubbles, setBubbles] = useState([]);

  const handleClick = (e) => {
    if (!e.target.closest('.auth-wrapper')) {
      const newBubble = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setBubbles(prev => [...prev, newBubble]);

      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 2000);
    }
  };

  return (
    <div className="bubble-container" onClick={handleClick}>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default BubbleEffect;
