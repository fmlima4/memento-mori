import React, { useEffect, useState } from 'react';
import './LifeCalendar.css';

const LifeCalendar = ({ weeksLived, totalWeeks }) => {
  const [displayedWeeks, setDisplayedWeeks] = useState(0);

  useEffect(() => {
    setDisplayedWeeks(0);
    if (weeksLived > 0) {
      const interval = setInterval(() => {
        setDisplayedWeeks(prev => {
          if (prev < weeksLived) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1 / weeksLived); // Distribui o preenchimento pelo tempo desejado (3 segundos)
      return () => clearInterval(interval);
    }
  }, [weeksLived]);

  const weeks = Array.from({ length: totalWeeks }, (_, i) => i < displayedWeeks);

  return (
    <div className="calendar">
      {weeks.map((lived, i) => (
        <div
          key={i}
          className={`week ${lived ? 'lived' : 'not-lived'}`}
        ></div>
      ))}
    </div>
  );
};

export default LifeCalendar;
