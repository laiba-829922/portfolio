import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (!context) return;

    const preference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrame = 0;
    let previousTime = 0;

    function draw(delta = 0) {
      context.clearRect(0, 0, width, height);

      const connectionDistance = width < 768 ? 100 : 140;

      for (const particle of particles) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        const margin = 35;

        if (particle.x < -margin) {
          particle.x = width + margin;
        }

        if (particle.x > width + margin) {
          particle.x = -margin;
        }

        if (particle.y < -margin) {
          particle.y = height + margin;
        }

        if (particle.y > height + margin) {
          particle.y = -margin;
        }

        // Moving dot
        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2,
        );

        context.fillStyle = 'rgba(204, 232, 168, 0.6)';
        context.fill();

        // Outlined circle
        if (particle.ring) {
          context.beginPath();
          context.arc(
            particle.x,
            particle.y,
            particle.ringRadius,
            0,
            Math.PI * 2,
          );

          context.strokeStyle = 'rgba(166, 196, 210, 0.22)';
          context.lineWidth = 1;
          context.stroke();
        }
      }

      // Lines between nearby particles
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];

          const distance = Math.hypot(
            first.x - second.x,
            first.y - second.y,
          );

          if (distance >= connectionDistance) {
            continue;
          }

          const opacity =
            (1 - distance / connectionDistance) * 0.15;

          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);

          context.strokeStyle =
            `rgba(182, 208, 195, ${opacity})`;

          context.lineWidth = 0.7;
          context.stroke();
        }
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const ratio = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = width < 768 ? 28 : 55;

      particles = Array.from(
        { length: count },
        (_, index) => ({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 1.8,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          ring: index % 9 === 0,
          ringRadius: 10 + Math.random() * 18,
        }),
      );

      draw();
    }

    function animate(time) {
      const delta = previousTime
        ? Math.min((time - previousTime) / 16.67, 2)
        : 1;

      previousTime = time;

      draw(delta);

      animationFrame =
        window.requestAnimationFrame(animate);
    }

    function updateAnimation() {
      window.cancelAnimationFrame(animationFrame);
      previousTime = 0;

      if (!document.hidden && !preference.matches) {
        animationFrame =
          window.requestAnimationFrame(animate);
      } else {
        draw();
      }
    }

    resize();
    updateAnimation();

    window.addEventListener('resize', resize);

    document.addEventListener(
      'visibilitychange',
      updateAnimation,
    );

    if (preference.addEventListener) {
      preference.addEventListener(
        'change',
        updateAnimation,
      );
    } else {
      preference.addListener(updateAnimation);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);

      window.removeEventListener('resize', resize);

      document.removeEventListener(
        'visibilitychange',
        updateAnimation,
      );

      if (preference.removeEventListener) {
        preference.removeEventListener(
          'change',
          updateAnimation,
        );
      } else {
        preference.removeListener(updateAnimation);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-background"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}