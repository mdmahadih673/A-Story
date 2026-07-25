import React, { useEffect, useRef } from 'react';
import { ParticleType } from '../types';

interface CanvasParticlesProps {
  type: ParticleType;
  density: 'off' | 'low' | 'medium' | 'high';
}

export const CanvasParticles: React.FC<CanvasParticlesProps> = ({ type, density }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (density === 'off') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const densityMultiplier = density === 'low' ? 0.4 : density === 'medium' ? 0.8 : 1.3;
    const particleCount = Math.floor(60 * densityMultiplier);

    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      rotation: number;
      vRot: number;
      color: string;
      phase: number;
    }

    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const pType = type;
      let pSize = Math.random() * 3 + 1;
      let vx = (Math.random() - 0.5) * 0.5;
      let vy = (Math.random() - 0.5) * 0.5;
      let color = 'rgba(255, 255, 255, 0.8)';
      let alpha = Math.random() * 0.5 + 0.2;

      if (pType === 'golden_dust') {
        pSize = Math.random() * 2.5 + 1;
        vx = (Math.random() - 0.5) * 0.4;
        vy = -Math.random() * 0.4 - 0.1;
        color = '#fef08a'; // yellow-200
      } else if (pType === 'cherry_blossoms') {
        pSize = Math.random() * 6 + 4;
        vx = Math.random() * 1.2 + 0.5;
        vy = Math.random() * 1.5 + 0.8;
        color = '#fbcfe8'; // pink-200
      } else if (pType === 'sun_dapples') {
        pSize = Math.random() * 18 + 8;
        vx = (Math.random() - 0.5) * 0.2;
        vy = -Math.random() * 0.3 - 0.1;
        color = '#fde68a'; // amber-200
        alpha = Math.random() * 0.25 + 0.05;
      } else if (pType === 'autumn_leaves') {
        pSize = Math.random() * 7 + 4;
        vx = (Math.random() - 0.5) * 0.8;
        vy = Math.random() * 1.2 + 0.5;
        color = Math.random() > 0.5 ? '#f97316' : '#eab308';
      } else if (pType === 'fireflies_stars') {
        pSize = Math.random() * 3.5 + 1.5;
        vx = (Math.random() - 0.5) * 0.6;
        vy = (Math.random() - 0.5) * 0.6;
        color = Math.random() > 0.3 ? '#fef08a' : '#a7f3d0';
      } else if (pType === 'cozy_rain' || pType === 'mist_rain') {
        pSize = Math.random() * 1.5 + 0.8;
        vx = -Math.random() * 0.5 - 0.2;
        vy = Math.random() * 12 + 10;
        color = '#93c5fd'; // blue-300
      } else if (pType === 'flower_petals') {
        pSize = Math.random() * 5 + 2;
        vx = (Math.random() - 0.5) * 0.6;
        vy = -Math.random() * 0.8 - 0.3;
        color = Math.random() > 0.5 ? '#f472b6' : '#fde047';
      } else if (pType === 'candle_embers') {
        pSize = Math.random() * 2.5 + 1;
        vx = (Math.random() - 0.5) * 0.4;
        vy = -Math.random() * 1.2 - 0.4;
        color = '#fdba74'; // orange-300
      } else if (pType === 'cosmic_stardust') {
        pSize = Math.random() * 2.5 + 1;
        vx = (Math.random() - 0.5) * 0.3;
        vy = (Math.random() - 0.5) * 0.3;
        color = Math.random() > 0.4 ? '#e0e7ff' : '#ddd6fe';
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: pSize,
        vx,
        vy,
        alpha,
        maxAlpha: alpha,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.03,
        color,
        phase: Math.random() * Math.PI * 2
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      particles.forEach((p) => {
        p.rotation += p.vRot;
        p.phase += 0.02;

        if (type === 'fireflies_stars') {
          // pulsing firefly opacity
          p.alpha = (Math.sin(p.phase) * 0.4 + 0.5) * p.maxAlpha;
          p.x += p.vx + Math.sin(p.phase) * 0.3;
          p.y += p.vy + Math.cos(p.phase) * 0.3;
        } else if (type === 'cherry_blossoms' || type === 'autumn_leaves') {
          p.x += p.vx + Math.sin(p.phase) * 0.6;
          p.y += p.vy;
        } else if (type === 'cozy_rain' || type === 'mist_rain') {
          p.x += p.vx;
          p.y += p.vy;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;

        if (type === 'cherry_blossoms') {
          // Draw petal oval shape
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'autumn_leaves') {
          // Draw leaf shape
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size, 0, 0, -p.size);
          ctx.fill();
        } else if (type === 'cozy_rain' || type === 'mist_rain') {
          // Draw rain streak
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.moveTo(0, 0);
          ctx.lineTo(p.vx * 4, p.vy * 1.5);
          ctx.stroke();
        } else {
          // Glowing circle
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.size > 2.5) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
          }
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, density]);

  if (density === 'off') return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
};
