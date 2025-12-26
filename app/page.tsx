"use client";

import { Title, Text, Button, Paper, Center, Stack, Group, ThemeIcon } from '@mantine/core';
import { IconPlayerPlay, IconChartBar, IconBrain, IconTrophy } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Loader from '@/components/UI/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Center h="100vh" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Decorative Lights (Background) - Consistent with Game Page */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }}
      />

      {/* Main Content Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ zIndex: 1, width: '100%', maxWidth: '420px', padding: '0 1rem' }}
      >
        <Paper
          radius={32}
          p="xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)', // Daha şeffaf, gerçek glassmorphism
            backdropFilter: 'blur(30px)', // Blur artırıldı
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Inner decorative subtle grid */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

          <Stack align="center" gap="xl" style={{ position: 'relative' }}>

            {/* Logo / Brand Area */}
            <Stack align="center" gap={6}>
              <Group gap={8}>
                <ThemeIcon size={28} radius="md" color="white" variant="white">
                  <IconBrain size={18} color="black" />
                </ThemeIcon>
                <Text size="sm" fw={600} style={{ letterSpacing: '3px', textTransform: 'uppercase' }} c="dimmed">
                  GALILEOFF
                </Text>
              </Group>

              <div style={{ position: 'relative', marginTop: '1rem' }}>
                <Text
                  fw={900}
                  c="white"
                  style={{
                    fontSize: '4.5rem',
                    lineHeight: 0.9,
                    letterSpacing: '-4px',
                    background: 'linear-gradient(to bottom right, #fff, #999)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center'
                  }}
                >
                  6<span style={{ color: '#444', WebkitTextFillColor: '#444' }}>x</span>6
                </Text>
                <Text
                  size="xl"
                  fw={300}
                  c="dimmed"
                  ta="center"
                  style={{ letterSpacing: '8px', marginLeft: '8px' }}
                >
                  SUDOKU
                </Text>
              </div>
            </Stack>

            <Stack w="100%" gap="md" mt="sm">
              <Button
                component="a"
                href="/game"
                fullWidth
                size="xl"
                radius="xl"
                color="white"
                rightSection={<IconPlayerPlay size={20} />}
                styles={{
                  root: {
                    backgroundColor: 'white',
                    color: 'black',
                    height: '64px',
                    transition: 'transform 0.2s',
                    ':hover': { transform: 'scale(1.02)' }
                  },
                  label: { fontSize: '1.1rem', fontWeight: 700, letterSpacing: '1px' }
                }}
              >
                OYUNA BAŞLA
              </Button>

              <Group grow>
                <Button
                  component="a"
                  href="/analysis"
                  size="lg"
                  radius="xl"
                  variant="default"
                  leftSection={<IconChartBar size={20} />}
                  styles={{
                    root: {
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      height: '56px',
                      ':hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    },
                    label: { fontWeight: 500 }
                  }}
                >
                  ANALİZ
                </Button>
                {/* Gelecekte eklenebilecek ayarlar butonu vb. için yer tutucu veya 2. bir aksiyon */}
                <Button
                  size="lg"
                  radius="xl"
                  variant="default"
                  disabled
                  styles={{
                    root: {
                      backgroundColor: 'transparent',
                      border: '1px dashed rgba(255,255,255,0.1)',
                      color: 'dimmed',
                      height: '56px',
                    }
                  }}
                >
                  YAKINDA
                </Button>
              </Group>
            </Stack>

            <Text size="xs" c="dimmed" mt="xs" style={{ opacity: 0.5 }}>
              v1.0.0 • galile0ff
            </Text>
          </Stack>
        </Paper>
      </motion.div>
    </Center>
  );
}
