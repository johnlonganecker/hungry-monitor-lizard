import React, { useState, useEffect } from 'react';

const MonitorLizardGame = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [eatingAnimation, setEatingAnimation] = useState(false);
  const [targetPerson, setTargetPerson] = useState(null);
  const [message, setMessage] = useState('');
  const [mouthOpen, setMouthOpen] = useState(false);
  const [tailAngle, setTailAngle] = useState(0);
  const [evaded, setEvaded] = useState(false);

  // Function to play Windows 95 tada sound
  const playTadaSound = () => {
    try {
      // Create a button element to trigger sound on user interaction
      const soundButton = document.createElement('button');
      soundButton.style.display = 'none';
      document.body.appendChild(soundButton);

      // When clicked, play the sound
      soundButton.onclick = () => {
        // Windows 95 tada sound in base64 (shortened for brevity)
        const audio = new Audio('data:audio/wav;base64,UklGRvwZAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YdgZAACBgIF/gn6Cf4B+gn+DgIKAgX6AgYOChIGCgYGBgoOChIGDgoOEgoOBgYCCgoKDgYJ/gH9/gH+AgICAgYCBgIGAgH+AgH+AgICAf4CBgIGBgYCBgYGAgYGAgIGAgIF/gIB/gH+AgH+Af4B/f4B/gIB/gH+AgH+AgH+AgH+AgH+AgH+AgIB/gIB/gICAf4CAf4CAgH+AgH+AgICAgH+AgICAgICAgH+AgICAgICAgICAgIB/gICAgH+AgICAgICAgIGAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAgYCBgIGAgYCBgIGAgIGAgYCBgIGAgYCBgIGAgYCBgIGAgIGAgYCBgH+AgICBgIGAgYCAgICAgIGAgYCAgICAgICAgICAgICAgICAgIB/gICAgICAgIB/gICAgICAgH+Af4CAgH+Af4B/gH+Af4B/gH+Af4B/gH+AgICAgICAgICAgIGBgoGCgoKDgoOChIKEgoSChIKEgoOCg4KDgoKCgoKCgYKBgoGCgYKBgoGCgYGBgYGBgYCBgIGAgYCBgIGAgYCAgICBgIGAgYCAgICAgICAgICAgH+Af4B/gH9/f39/f3+Af3+Af4B/gH+Af4B/gH+AgICAgICAgICAgYCBgYGCgYKCgoKDg4ODhIOEg4SDhIOEg4SDhIODgoOCg4KCgoKBgoGBgYGAgICBgIGAgH+Af4B/gH9/f39/fn5+fn19fX19fX19fX19fn5+fn9/f3+AgICAgYGBgoKCg4ODhISEhYWFhoaGhoeHh4eIh4iHiIeIhoeFh4WGhIWDhYKDgYKAgH9/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllZWFdXV1dXV1hYWVlaW1xdXl9gYWJjZGVmaGlqa2xtbm9xcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/gICAgYCBgYGBgoKCgoKCg4KDg4ODgYGCgoKCgoKCgoKCgYKCgoGCgYKBgoGCgIGAgICBgICAgH+Af4B/gH+Af4B/gH+Af4B/gH6Af4B/gH+Af4B/gH+Af4B/f4B/gH+Af4B/gH+AgH+AgICAgICAgICAgICAgIB/gICAgICAgH+Af4B/gH+Af4B/gH+Af4B/gICAgICAgICAgYGBgYGBgYKBgoKCgoKCgoOCg4KDgoOCg4KDgoKCgoKCgoKBgoGCgYGBgYGAgYCBgIGAgYCBgIGAgYCBgICAgICAgICAgICAgIB/gICAf4B/gH+Af4B/gH9/f39/f39/f39/f39/f39/f39/f39/f35/fn9+f35/fn9+f35/fn9+f35/fn9/f39/f39/f3+Af4CAf4CAgICAgICAgYCBgIGAgYGBgYGBgoGCgYKBgoKCgoKCgoOCg4KDgoOChIKEgYKCgoKCgoGBgYGBgIGAgYCBgIB/gH+Af4B/f39/f39+fn5+fn5+fn5+fn5+fn5+fn9/f3+AgICAgICAgYGBgYKCgoKDg4OEhISEhYWFhYaGhoaGh4aHhoeGh4aGhoaFhoWFhYWEhISEg4SDg4ODgoKCgYGBgICAgH9/f359fX18fHx7e3t6enp6eXl5eXl5eXl5eXl5enp6e3t7fHx8fX5+f3+AgIGBgoKDg4SFhYaGh4eIiIiJiYqKiouLi4uMi4yLjIuMi4yLi4uKi4qKiomJiIiIh4eGhoWFhIODgoKBgIB/fn58fHt7enl4eHd2dnV1dHRzc3JycnFxcXBwcHBwcHBwcHFxcXJyc3N0dHV1dnd4eHl6e3t8fX5/f4CAgYKDhISFhoaHiImJiouLjI2Njo+PkJCRkZKTk5SUlJWVlpaWl5eXmJiYmJiZmJmYmZiZmJiYl5eXlpaVlZSUk5KSkZCPj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTU1JSUVFQUFBQUFBQUFFRUlJTU1RVVldYWVpbXF1eX2BhYmNlZmdoaWprbG5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/gICAgICBgIGBgYGCgYKBgoGCgYKBgoGBgYGBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCAgICAgICAgICAgICAgICAgIB/gH+AgH+AgH+AgH+AgH+AgH+AgH+AgH+AgH+AgH+AgH+AgH+AgH+Af4B/gH+Af4B/gH9/gH+Af4B/gH+Af4CBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgYCBgIGAgX+AgICAgICAgICAgH+AgH+Af4B/gH+Af4B/gH9/f39/f39/f39/f39/f39/f39/f35/fn9+f35/fn9+f35/fn9+f35/fn9/f39/f39/f3+Af4CAf4CAgICAgICAgYCBgIGAgYGBgYGBgoGCgYKBgoKCgoKCgoOCg4KDgoOChIKEgYKCgoKCgoGBgYGBgIGAgYCBgIB/gH+Af4B/f39/f39+fn5+fn5+fn5+fn5+fn5+fn9/f3+AgICAgICAgYGBgYKCgoKDg4OEhISEhYWFhYaGhoaGh4aHhoeGh4aGhoaFhoWFhYWEhISEg4SDg4ODgoKCgYGBgICAgH9/f359fX18fHx7e3t6enp6eXl5eXl5eXl5eXl5enp6e3t7fHx8fX5+f3+AgIGBgoKDg4SFhYaGh4eIiIiJiYqKiouLi4uMi4yLjIuMi4yLi4uKi4qKiomJiIiIh4eGhoWFhIODgoKBgIB/fn58fHt7enl4eHd2dnV1dHRzc3JycnFxcXBwcHBwcHBwcHFxcXJyc3N0dHV1dnd4eHl6e3t8fX5/f4CAgYKDhISFhoaHiImJiouLjI2Njo+PkJCRkZKTk5SUlJWVlpaWl5eXmJiYmJiZmJmYmZiZmJiYl5eXlpaVlZSUk5KSkZCPj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTU1JSUVFQUFBQUFBQUFFRUlJTU1RVVldYWVpbXF1eX2BhYmNlZmdoaWprbG5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj');
        audio.play();
      };

      // Trigger the click
      soundButton.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(soundButton);
      }, 2000);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // Function to add a new person
  const addPerson = () => {
    if (newName.trim() === '') {
      setMessage('Please enter a name');
      return;
    }

    // Add new person and recalculate positions in circle
    const newPeople = [...people, {
      id: Date.now(),
      name: newName,
      angle: 0, // Placeholder, will be calculated
    }];

    // Recalculate positions for all people
    const updatedPeople = arrangeInCircle(newPeople);

    setPeople(updatedPeople);
    setNewName('');
    setMessage('');
  };

  // Function to arrange people in a circle
  const arrangeInCircle = (peopleArray) => {
    const count = peopleArray.length;
    if (count === 0) return [];

    return peopleArray.map((person, index) => {
      // Calculate position in circle
      const angle = (index / count) * 2 * Math.PI;
      return {
        ...person,
        angle: angle,
      };
    });
  };

  // Tail wagging animation
  useEffect(() => {
    const tailInterval = setInterval(() => {
      setTailAngle(prev => (prev + 5) % 20 - 10); // Wag between -10 and 10 degrees
    }, 200);

    return () => clearInterval(tailInterval);
  }, []);

  // Update positions when people are added or removed
  useEffect(() => {
    if (people.length > 0 && !eatingAnimation) {
      setPeople(arrangeInCircle(people));
    }
  }, [people.length]);

  // Function to remove a specific person
  const removePerson = (id) => {
    setPeople(people.filter(person => person.id !== id));
  };

  // Function to eat a random person
  const eatRandomPerson = () => {
    if (people.length === 0) {
      setMessage('No people to eat!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * people.length);
    const victim = people[randomIndex];

    setTargetPerson(victim);
    setEatingAnimation(true);
    setMessage(`${victim.name} is being hunted!`);

    // 50% chance of evading
    const willEvade = Math.random() < 0.5;
    setEvaded(willEvade);

    // Start mouth animation
    let mouthAnimationCount = 0;
    const mouthAnimation = setInterval(() => {
      setMouthOpen(prev => !prev);
      mouthAnimationCount++;

      // Stop after several mouth movements
      if (mouthAnimationCount >= 6) {
        clearInterval(mouthAnimation);
      }
    }, 300);

    // After animation completes, determine outcome
    setTimeout(() => {
      if (willEvade) {
        // Person evaded!
        playTadaSound(); // Play Windows 95 tada sound when evading
        setMessage(`${victim.name} evaded the lizard! *Windows 95 sound*`);
        setMouthOpen(false);
        setTimeout(() => {
          setEatingAnimation(false);
          setTargetPerson(null);
          setEvaded(false);
        }, 1000);
      } else {
        // Person gets eaten
        setEatingAnimation(false);
        removePerson(victim.id);
        setMessage(`${victim.name} was eaten!`);
        setTargetPerson(null);
        setMouthOpen(false);
        setEvaded(false);
      }
    }, 2000);
  };

  // Calculate position based on angle
  const getPositionFromAngle = (angle, radius = 35) => {
    // Center is at (50%, 50%)
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Monitor Lizard Game</h1>

      {/* Game area */}
      <div className="relative w-full h-80 bg-green-200 rounded-lg mb-6 overflow-hidden border-2 border-green-600">
        {/* Monitor lizard - starts in center but moves to target */}
        <div
          className="absolute transition-all"
          style={{
            left: eatingAnimation && targetPerson ? `${getPositionFromAngle(targetPerson.angle).x}%` : '50%',
            top: eatingAnimation && targetPerson ? `${getPositionFromAngle(targetPerson.angle).y}%` : '50%',
            transform: 'translate(-50%, -50%)',
            transitionDuration: '1500ms' // Exact 1.5 seconds for movement
          }}
        >
                      <svg viewBox="-50 0 150 60" className="w-32 h-20">
            {/* Longer tail on the left side with wagging animation */}
            <g transform={`rotate(${tailAngle}, 0, 20)`}>
              <path d="M0,20 C-10,25 -20,15 -30,20 C-35,22 -40,18 -45,20" fill="none" stroke="#4d7c0f" strokeWidth="5" strokeLinecap="round" />
            </g>

            <path
              d="M90,30 C95,10 75,0 60,10 C50,0 30,0 20,10 C10,5 0,10 0,20 C0,40 10,50 30,50 C50,60 60,50 70,50 C80,50 85,45 90,40 C95,35 95,30 90,30"
              fill="#4d7c0f"
              stroke="#374151"
              strokeWidth="2"
              className={eatingAnimation ? 'animate-pulse' : ''}
            />
            <circle cx="80" cy="20" r="3" fill="black" /> {/* Eye */}

            {/* Desktop Computer Monitor in the middle of the lizard */}
            <rect x="30" y="15" width="40" height="28" fill="#333333" rx="2" /> {/* Monitor casing */}
            <rect x="33" y="18" width="34" height="22" fill="#87CEEB" /> {/* Screen */}
            <rect x="45" y="43" width="10" height="5" fill="#444444" /> {/* Monitor stand neck */}
            <rect x="38" y="48" width="24" height="3" fill="#555555" rx="1" /> {/* Monitor stand base */}

            {/* Power button */}
            <circle cx="50" cy="45" r="1" fill="#999999" />

            {/* Screen bezel details */}
            <rect x="49" y="17" width="2" height="1" fill="#555555" /> {/* Webcam */}

            {/* Screen content - simple code-like lines */}
            <line x1="36" y1="22" x2="63" y2="22" stroke="#333333" strokeWidth="1" />
            <line x1="36" y1="26" x2="58" y2="26" stroke="#333333" strokeWidth="1" />
            <line x1="36" y1="30" x2="60" y2="30" stroke="#333333" strokeWidth="1" />
            <line x1="36" y1="34" x2="55" y2="34" stroke="#333333" strokeWidth="1" />
            <line x1="36" y1="38" x2="64" y2="38" stroke="#333333" strokeWidth="1" />


            {/* Mouth - animated between open and closed, more realistic */}
            {mouthOpen ?
              <path d="M65,40 Q70,50 75,40 Z" fill="#630c0c" stroke="#2c4a1b" strokeWidth="1.5" /> :
              <path d="M65,40 Q70,42 75,40" fill="none" stroke="#2c4a1b" strokeWidth="1.5" />
            }

            {/* Longer tail on the left side with wagging animation - more detailed */}
            <g transform={`rotate(${tailAngle}, -5, 20)`}>
              <path d="M-5,20 C-15,25 -25,15 -35,20 C-40,22 -45,18 -50,20" fill="none" stroke="#3b6e22" strokeWidth="5" strokeLinecap="round" />
              <path d="M-10,18 Q-15,16 -20,18" stroke="#2c4a1b" strokeWidth="0.8" fill="none" />
              <path d="M-20,18 Q-25,16 -30,18" stroke="#2c4a1b" strokeWidth="0.8" fill="none" />
              <path d="M-30,18 Q-35,16 -40,18" stroke="#2c4a1b" strokeWidth="0.8" fill="none" />
              <path d="M-40,18 Q-45,16 -50,18" stroke="#2c4a1b" strokeWidth="0.8" fill="none" />
            </g>

            <path d="M20,50 L15,55 M30,50 L35,55 M60,50 L55,55 M70,50 L75,55"
                  stroke="#374151" strokeWidth="2" /> {/* Legs */}
          </svg>
        </div>

        {/* Stick figures in a circle */}
        {people.map(person => {
          const { x, y } = getPositionFromAngle(person.angle);

          // Calculate if this person is being eaten
          const isBeingEaten = eatingAnimation && targetPerson?.id === person.id;

          // Person stays in place while being eaten
          const posX = x;
          const posY = y;

          return (
            <div
              key={person.id}
              className="absolute flex flex-col items-center justify-center transition-all duration-1000"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: 'translate(-50%, -50%)',
                opacity: isBeingEaten ? '0.5' : '1',
                scale: isBeingEaten ? '0.8' : '1',
                animation: isBeingEaten && evaded ? 'bounce 0.5s ease infinite' : 'none',
              }}
            >
              <style jsx>{`
                @keyframes bounce {
                  0%, 100% { transform: translate(-50%, -50%); }
                  50% { transform: translate(-50%, -60%); }
                }
              `}</style>
              <svg viewBox="0 0 30 50" className="w-6 h-12">
                <circle cx="15" cy="10" r="6" fill="none" stroke="black" strokeWidth="2" /> {/* Head */}
                <line x1="15" y1="16" x2="15" y2="35" stroke="black" strokeWidth="2" /> {/* Body */}
                <line x1="15" y1="35" x2="8" y2="45" stroke="black" strokeWidth="2" /> {/* Left leg */}
                <line x1="15" y1="35" x2="22" y2="45" stroke="black" strokeWidth="2" /> {/* Right leg */}
                <line x1="15" y1="25" x2="8" y2="20" stroke="black" strokeWidth="2" /> {/* Left arm */}
                <line x1="15" y1="25" x2="22" y2="20" stroke="black" strokeWidth="2" /> {/* Right arm */}
              </svg>
              <span className="text-xs font-semibold mt-1 bg-white px-1 rounded">{person.name}</span>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter name"
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={15}
          />
        </div>
        <button
          onClick={addPerson}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Add Person
        </button>
        <button
          onClick={eatRandomPerson}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          disabled={eatingAnimation || people.length === 0}
        >
          Eat Random Person
        </button>
      </div>

      {/* Message display */}
      {message && (
        <div className="w-full p-2 bg-yellow-100 border border-yellow-300 rounded mb-4 text-center">
          {message}
        </div>
      )}

      {/* People list */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">People ({people.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {people.map(person => (
            <div key={person.id} className="p-2 bg-white border border-gray-300 rounded flex justify-between items-center">
              <span>{person.name}</span>
              <button
                onClick={() => removePerson(person.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitorLizardGame;
