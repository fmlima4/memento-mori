import React, { useState, useEffect } from 'react';
import LifeCalendar from './LifeCalendar';
import './App.css';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [expectedEndDate, setExpectedEndDate] = useState('');
  const [weeksLived, setWeeksLived] = useState(0);
  const [totalWeeks, setTotalWeeks] = useState(0);

  useEffect(() => {
    const storedBirthDate = localStorage.getItem('birthDate');
    const storedExpectedEndDate = localStorage.getItem('expectedEndDate');

    if (storedBirthDate && storedExpectedEndDate) {
      setBirthDate(storedBirthDate);
      setExpectedEndDate(storedExpectedEndDate);
      calculateWeeks(storedBirthDate, storedExpectedEndDate);
    }
  }, []);

  const calculateWeeks = (birth, end) => {
    const birthDate = new Date(birth);
    const endDate = new Date(end);
    const now = new Date();

    const totalWeeks = Math.round((endDate - birthDate) / (1000 * 60 * 60 * 24 * 7));
    const weeksLived = Math.round((now - birthDate) / (1000 * 60 * 60 * 24 * 7));

    setTotalWeeks(totalWeeks);
    setWeeksLived(weeksLived);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('birthDate', birthDate);
    localStorage.setItem('expectedEndDate', expectedEndDate);
    calculateWeeks(birthDate, expectedEndDate);
  };

  const percentageLived = totalWeeks > 0 ? ((weeksLived / totalWeeks) * 100).toFixed(2) : 0;

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-8">
      <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: 'Dancing Script, cursive' }}>Memento Mori</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <div className="flex flex-wrap justify-center space-x-4">
          <label className="flex flex-col items-start">
            <span>Data de Nascimento:</span>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1 p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
          <label className="flex flex-col items-start">
            <span>Data <strong>Estimada</strong> de Morte:</span>
            <input
              type="date"
              value={expectedEndDate}
              onChange={(e) => setExpectedEndDate(e.target.value)}
              className="mt-1 p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Calcular
        </button>
      </form>
      <LifeCalendar weeksLived={weeksLived} totalWeeks={totalWeeks} />
      <div className="summary mt-8 text-lg">
        <p>Total de semanas: {totalWeeks}</p>
        <p>Semanas vividas: {weeksLived} ({percentageLived}%)</p>
      </div>
    </div>
  );
}

export default App;
