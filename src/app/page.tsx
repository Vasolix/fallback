"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home as HomeIcon, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    
    const newParticles = [...Array(6)].map(() => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 50,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.1 
          }}
          className="mb-8"
        >
          <AlertTriangle className="w-24 h-24 mx-auto text-destructive mb-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-6xl font-bold text-foreground mb-4">
            404
          </h1>
          
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Environnement de dev inexistant
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            L&apos;environnement de développement que vous recherchez semble avoir disparu dans les méandres du code...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Button 
            size="lg" 
            className="gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
            Recharger
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            onClick={() => window.history.back()}
          >
            <HomeIcon className="w-4 h-4" />
            Retour
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-sm text-muted-foreground">
            <p>Erreur de routage ou environnement mal configuré</p>
            <p className="mt-2 font-mono text-xs">
              ERR_DEV_ENV_NOT_FOUND
            </p>
          </div>
        </motion.div>

        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                initial={{ 
                  x: particle.x, 
                  y: particle.y
                }}
                animate={{ 
                  y: -50,
                  x: particle.x + (Math.random() - 0.5) * 200
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: particle.delay
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
