import { Container, Title, Text, Button, Paper, Center } from '@mantine/core';

export default function Home() {
  return (
    <Center h="100vh" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Lights */}
      <div style={{ position: 'absolute', top: '15%', left: '5%', width: 'clamp(200px, 50vw, 300px)', height: 'clamp(200px, 50vw, 300px)', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 'clamp(250px, 60vw, 400px)', height: 'clamp(250px, 60vw, 400px)', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />

      <Paper
        p={0}
        radius="xl"
        w="90%"
        maw={380}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 2rem)', textAlign: 'center' }}>
          <Title order={1} mb="xs" c="white" style={{ fontSize: 'clamp(2.5rem, 10vw, 3rem)', fontWeight: 100, letterSpacing: '-2px', lineHeight: 1 }}>
            6x6
          </Title>
          <Title order={2} mb="xl" c="white" style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)', fontWeight: 400, letterSpacing: '6px', textTransform: 'uppercase', opacity: 0.8 }}>
            Sudoku
          </Title>

          <Text mb={40} c="dimmed" size="sm" style={{ letterSpacing: '0.5px' }}>
            Minimalist Zeka Oyunu
          </Text>

          <Button
            fullWidth
            size="xl"
            radius="xl"
            variant="filled"
            color="white"
            component="a"
            href="/game"
            style={{
              backgroundColor: 'white',
              color: 'black',
              height: 'clamp(50px, 12vw, 60px)',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
            styles={{
              root: { ':hover': { transform: 'scale(1.02)' } }
            }}
          >
            OYUNA BAŞLA
          </Button>
        </div>
      </Paper>
    </Center>
  );
}
