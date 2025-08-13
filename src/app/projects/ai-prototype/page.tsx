'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Cpu, Sparkles, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

export default function AIPrototypePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const steps = [
    'Initializing AI Model',
    'Loading Training Data',
    'Processing Neural Networks',
    'Optimizing Parameters',
    'Running Inference',
    'Generating Results'
  ];

  useEffect(() => {
    if (isRunning && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isRunning, progress]);

  useEffect(() => {
    setCurrentStep(Math.floor((progress / 100) * steps.length));
  }, [progress, steps.length]);

  const startAnimation = () => {
    setIsRunning(true);
    setProgress(0);
    setCurrentStep(0);
  };

  const stopAnimation = () => {
    setIsRunning(false);
  };

  const resetAnimation = () => {
    setIsRunning(false);
    setProgress(0);
    setCurrentStep(0);
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw neural network nodes
      const nodes = 8;
      const nodeRadius = 4;
      const spacing = canvas.width / (nodes + 1);
      
      for (let i = 0; i < nodes; i++) {
        const x = spacing * (i + 1);
        const y = canvas.height / 2 + Math.sin(Date.now() * 0.001 + i) * 20;
        
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isRunning ? `hsl(${200 + progress * 1.5}, 70%, 60%)` : '#94a3b8';
        ctx.fill();
        
        // Draw connections
        if (i < nodes - 1) {
          ctx.beginPath();
          ctx.moveTo(x + nodeRadius, y);
          ctx.lineTo(x + spacing - nodeRadius, canvas.height / 2 + Math.sin(Date.now() * 0.001 + i + 1) * 20);
          ctx.strokeStyle = isRunning ? `hsl(${200 + progress * 1.5}, 70%, 60%)` : '#cbd5e1';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, progress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Prototype
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Interactive AI-powered interface prototype with machine learning components and intelligent interactions
          </p>
          
          {/* Test Deployment Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white border border-green-400/30"
          >
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            Test Deployment Active
          </motion.div>
          
          {/* Deployment Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-2 text-xs text-gray-400"
          >
            🚀 Firebase deployment verified - {new Date().toLocaleDateString()}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Control Panel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Control Panel
              </h3>
              
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <button
                    onClick={startAnimation}
                    disabled={isRunning}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </button>
                  <button
                    onClick={stopAnimation}
                    disabled={!isRunning}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </button>
                  <button
                    onClick={resetAnimation}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Panel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-blue-400" />
                Processing Status
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-300">Current Step</div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center">
                      <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-sm">{steps[currentStep] || 'Ready'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Neural Network Visualization */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-400" />
                Neural Network
              </h3>
              
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={200}
                  className="w-full h-48 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isRunning && progress === 0 && (
                    <div className="text-center text-gray-400">
                      <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Click Start to begin AI processing</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {isRunning ? Math.floor(Math.random() * 100 + 85) : 0}
                  </div>
                  <div className="text-sm text-gray-400">Accuracy %</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {isRunning ? Math.floor(Math.random() * 50 + 20) : 0}
                  </div>
                  <div className="text-sm text-gray-400">Latency ms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {isRunning ? Math.floor(Math.random() * 1000 + 500) : 0}
                  </div>
                  <div className="text-sm text-gray-400">Requests/s</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {isRunning ? Math.floor(Math.random() * 10 + 1) : 0}
                  </div>
                  <div className="text-sm text-gray-400">Active Models</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
            <span className="mr-2">View Project Details</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
