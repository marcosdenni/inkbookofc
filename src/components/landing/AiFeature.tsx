import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RAW = "oi confirma a tattoo amanha as 14h e nao esquece de trazer o dinheiro";
const OPTIMIZED = "Olá! 👋 Estamos esperando por você amanhã.\n\n💉 Sessão confirmada às 14h.\n\nLembre-se:\n✓ Descanse bem hoje à noite\n✓ Evite bebidas alcoólicas\n✓ Traga o valor restante em dinheiro ou Pix\n\nAté amanhã! 🙌";

export default function AiFeature() {
  const [phase, setPhase] = useState<'idle' | 'raw' | 'optimizing' | 'done'>('idle');
  const [typed, setTyped] = useState('');
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let t1: any, t2: any, t3: any;

    const run = () => {
      setPhase('raw');
      setTyped('');
      t1 = setTimeout(() => {
        setPhase('optimizing');
        let i = 0;
        t2 = setInterval(() => {
          i++;
          setTyped(OPTIMIZED.substring(0, i));
          if (i >= OPTIMIZED.length) {
            clearInterval(t2);
            setPhase('done');
            t3 = setTimeout(run, 7000);
          }
        }, 30);
      }, 2800);
    };

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { run(); obs.disconnect(); }
    }, { threshold: 0.4 });

    const el = document.getElementById('ai-anchor');
    if (el) obs.observe(el);
    return () => { clearTimeout(t1); clearInterval(t2); clearTimeout(t3); obs.disconnect(); };
  }, []);

  return (
    <section id="ai-anchor" style={{
      background: '#080808',
      padding: '10rem 0',
      borderTop: '1px solid rgba(255,255,255,0.03)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '10%', right: '-15%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(201,162,77,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 3rem' }}>
        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: '5rem' }}>
          <p style={{
            fontSize: '0.8rem', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: '#C9A24D', marginBottom: '1.5rem',
          }}>Inteligência Artificial</p>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2.8rem, 4.5vw, 5rem)',
            lineHeight: 0.95, color: '#fff', marginBottom: '1.5rem',
          }}>
            Sua comunicação,<br/>
            <span style={{
              background: 'linear-gradient(135deg, #C9A24D, #E8CC7A, #C9A24D)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>elevada pela IA.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.4)' }}>
            Mensagens profissionais com um clique. Em vez de copiar e colar, deixe a IA elevar sua autoridade automaticamente.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* Left: Live demo animation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}>
              {/* Top bar */}
              <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(201,162,77,0.1)',
                  border: '1px solid rgba(201,162,77,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem',
                }}>✨</div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>InkBook AI</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Otimizador de Mensagens</div>
                </div>
                <AnimatePresence>
                  {phase === 'optimizing' && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{
                        marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 600,
                        color: '#C9A24D', background: 'rgba(201,162,77,0.1)',
                        borderRadius: 20, padding: '4px 12px',
                        display: 'flex', alignItems: 'center', gap: 6,
                      }}
                    >
                      <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}>⟳</motion.span>
                      Reescrevendo...
                    </motion.div>
                  )}
                  {phase === 'done' && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      style={{
                        marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 600,
                        color: '#27AE60', background: 'rgba(39,174,96,0.1)',
                        borderRadius: 20, padding: '4px 12px',
                      }}
                    >✓ Pronto</motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem', minHeight: 200 }}>
                <AnimatePresence mode="wait">
                  {phase === 'raw' && (
                    <motion.div
                      key="raw"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: 12, padding: '1.25rem',
                        fontFamily: 'monospace', fontSize: '0.95rem',
                        color: 'rgba(255,255,255,0.35)',
                        lineHeight: 1.6,
                      }}
                    >
                      {RAW}
                    </motion.div>
                  )}

                  {(phase === 'optimizing' || phase === 'done') && (
                    <motion.div key="opt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {/* Shimmer */}
                      {phase === 'optimizing' && (
                        <motion.div
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                          style={{
                            position: 'absolute', top: 0, left: 0,
                            width: '40%', height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(201,162,77,0.12), transparent)',
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                      <div style={{
                        background: 'rgba(201,162,77,0.04)',
                        border: `1px solid ${phase === 'done' ? 'rgba(201,162,77,0.25)' : 'rgba(201,162,77,0.12)'}`,
                        borderRadius: 12, padding: '1.25rem',
                        fontSize: '0.98rem', color: '#f0f0f0', lineHeight: 1.7,
                        whiteSpace: 'pre-wrap', position: 'relative', overflow: 'hidden',
                      }}>
                        {typed}
                        {phase === 'optimizing' && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6 }}
                            style={{ borderRight: '2px solid #C9A24D', marginLeft: 2 }}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right: Real screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}>
              <img
                src="/imagens/Captura de Tela (853).png"
                alt="Modal de Otimização com IA do InkBook"
                style={{ display: 'block', width: '100%', height: 'auto' }}
                loading="lazy"
              />
            </div>
            <div style={{
              position: 'absolute', bottom: '-1rem', right: '-1rem',
              background: 'rgba(12,12,12,0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(39,174,96,0.25)',
              borderRadius: 12, padding: '1rem 1.5rem',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#27AE60', lineHeight: 1 }}>+340%</span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>Taxa de resposta ao cliente</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
