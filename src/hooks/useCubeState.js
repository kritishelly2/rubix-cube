import { useState, useEffect, useCallback } from 'react';

const FACES = { U: 'U', D: 'D', L: 'L', R: 'R', F: 'F', B: 'B' };
const COLORS = { U: 'W', D: 'Y', L: 'O', R: 'R', F: 'G', B: 'B' };

const getInitialCubeState = () => {
  const cubies = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        if (x === 1 && y === 1 && z === 1) continue; 
        cubies.push({
          x, y, z,
          colors: {
            U: y === 2 ? COLORS.U : 'X',
            D: y === 0 ? COLORS.D : 'X',
            L: x === 0 ? COLORS.L : 'X',
            R: x === 2 ? COLORS.R : 'X',
            F: z === 2 ? COLORS.F : 'X',
            B: z === 0 ? COLORS.B : 'X',
          },
        });
      }
    }
  }
  return cubies;
};

const useCubeState = () => {
  const [cubeState, setCubeState] = useState(getInitialCubeState());
  const [history, setHistory] = useState([]);

  const applyMove = useCallback((move) => {
    const prime = move.includes("'");
    const face = move.charAt(0);

    setCubeState(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      let cubiesToRotate;

      switch (face) {
        case 'U': cubiesToRotate = newState.filter(c => c.y === 2); break;
        case 'D': cubiesToRotate = newState.filter(c => c.y === 0); break;
        case 'L': cubiesToRotate = newState.filter(c => c.x === 0); break;
        case 'R': cubiesToRotate = newState.filter(c => c.x === 2); break;
        case 'F': cubiesToRotate = newState.filter(c => c.z === 2); break;
        case 'B': cubiesToRotate = newState.filter(c => c.z === 0); break;
        default: return prevState;
      }

      cubiesToRotate.forEach(cubie => {
        const { x, y, z, colors } = cubie;
        let newX = x, newY = y, newZ = z;
        let newColors = { ...colors };

        const rotate = (c1, c2, c3, c4) => {
            if (prime) [newColors[c1], newColors[c2], newColors[c3], newColors[c4]] = [colors[c4], colors[c1], colors[c2], colors[c3]];
            else [newColors[c1], newColors[c2], newColors[c3], newColors[c4]] = [colors[c2], colors[c3], colors[c4], colors[c1]];
        };

        if (face === 'U' || face === 'D') {
            const dir = (face === 'U' ? 1 : -1) * (prime ? -1 : 1);
            newX = 1 + (x - 1) * Math.cos(dir * Math.PI / 2) - (z - 1) * Math.sin(dir * Math.PI / 2);
            newZ = 1 + (x - 1) * Math.sin(dir * Math.PI / 2) + (z - 1) * Math.cos(dir * Math.PI / 2);
            rotate('F', 'R', 'B', 'L');
        } else if (face === 'L' || face === 'R') {
            const dir = (face === 'R' ? 1 : -1) * (prime ? -1 : 1);
            newY = 1 + (y - 1) * Math.cos(dir * Math.PI / 2) - (z - 1) * Math.sin(dir * Math.PI / 2);
            newZ = 1 + (y - 1) * Math.sin(dir * Math.PI / 2) + (z - 1) * Math.cos(dir * Math.PI / 2);
            rotate('F', 'U', 'B', 'D');
        } else if (face === 'F' || face === 'B') {
            const dir = (face === 'F' ? 1 : -1) * (prime ? -1 : 1);
            newX = 1 + (x - 1) * Math.cos(dir * Math.PI / 2) - (y - 1) * Math.sin(dir * Math.PI / 2);
            newY = 1 + (x - 1) * Math.sin(dir * Math.PI / 2) + (y - 1) * Math.cos(dir * Math.PI / 2);
            rotate('U', 'R', 'D', 'L');
        }
        
        const originalCubie = newState.find(c => c.x === Math.round(newX) && c.y === Math.round(newY) && c.z === Math.round(newZ));
        if(originalCubie) {
            originalCubie.colors = newColors;
        }
      });
      
      return newState;
    });
    setHistory(prev => [...prev, move]);
  }, []);

  const scramble = useCallback(() => {
    solve();
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scrambleSequence = [];
    for (let i = 0; i < 20; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scrambleSequence.push(move + modifier);
    }
    
    scrambleSequence.forEach(move => {
        if (move.includes('2')) {
            applyMove(move.charAt(0));
            applyMove(move.charAt(0));
        } else {
            applyMove(move);
        }
    });
    setHistory([]);
  }, [applyMove]);

  const solve = () => {
    setCubeState(getInitialCubeState());
    setHistory([]);
  };

  return { cubeState, applyMove, scramble, solve, history };
};

export default useCubeState;