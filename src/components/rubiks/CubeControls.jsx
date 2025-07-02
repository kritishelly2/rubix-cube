import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Shuffle, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const moves = [
  "U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: "easeOut",
      staggerChildren: 0.1 
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const CubeControls = ({ applyMove, scramble, solve }) => {
  const { toast } = useToast();

  const handleSolveClick = () => {
    solve();
    toast({
      title: "Cube Solved!",
      description: "The cube has been reset to its initial state.",
    });
  };
  
  const handleScrambleClick = () => {
    scramble();
    toast({
      title: "Cube Scrambled!",
      description: "Good luck solving it!",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mt-4"
    >
      <Card className="bg-card/50 backdrop-blur-sm border-border/30">
        <CardHeader>
          <CardTitle className="text-center text-xl">Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 mb-6">
            <Button onClick={handleScrambleClick} variant="secondary" className="gap-2">
              <Shuffle size={18} /> Scramble
            </Button>
            <Button onClick={handleSolveClick} className="gap-2 bg-green-600 hover:bg-green-700">
              <Wand2 size={18} /> Solve
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {moves.map(move => (
              <motion.div key={move} variants={itemVariants}>
                <Button
                  onClick={() => applyMove(move)}
                  className="w-full font-mono text-lg"
                  variant="outline"
                >
                  {move}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CubeControls;