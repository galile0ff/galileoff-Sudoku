"use client";

import { useState, useEffect } from 'react';
import { Container, Stack, Title, Button, Group, LoadingOverlay, Text } from '@mantine/core';
import { Board } from '@/components/Game/Board';
import { Controls } from '@/components/Game/Controls';
import { IconRefresh, IconCheck } from '@tabler/icons-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function GamePage() {
    const [grid, setGrid] = useState<(number | null)[][]>([]);
    const [initialGrid, setInitialGrid] = useState<(number | null)[][]>([]);
    const [solution, setSolution] = useState<(number | null)[][]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCell, setActiveCell] = useState<[number, number] | null>(null);
    const [message, setMessage] = useState<string>("");

    const fetchPuzzle = async () => {
        setLoading(true);
        setMessage("");
        setActiveCell(null);
        try {
            const res = await fetch('/api/puzzle');
            const data = await res.json();
            setGrid(data.grid);
            // Derin kopya al ki referans karışmasın
            setInitialGrid(data.grid.map((row: any[]) => [...row]));
            setSolution(data.solution);
        } catch (error) {
            console.error("Bulmaca yüklenemedi", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPuzzle();
    }, []);

    const handleCellClick = (row: number, col: number) => {
        if (initialGrid[row][col] === null) {
            setActiveCell([row, col]);
        }
    };

    const handleNumberInput = (num: number) => {
        if (activeCell) {
            const [r, c] = activeCell;
            const newGrid = grid.map(row => [...row]);
            newGrid[r][c] = num;
            setGrid(newGrid);
        }
    };

    const handleErase = () => {
        if (activeCell) {
            const [r, c] = activeCell;
            const newGrid = grid.map(row => [...row]);
            newGrid[r][c] = null;
            setGrid(newGrid);
        }
    };

    const checkSolution = () => {
        let isCorrect = true;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                if (grid[i][j] !== solution[i][j]) {
                    isCorrect = false;
                    break;
                }
            }
        }

        if (isCorrect) {
            setMessage("Tebrikler! Doğru Çözüm 🎉");
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffffff', '#a8a8a8', '#636363']
            });

            // Sonucu Kaydet
            const result = {
                date: new Date().toISOString(),
                difficulty: 'random', // İlerde API'den gerçek zorluk gelecek
                completed: true
            };

            const savedHistory = localStorage.getItem('sudoku-history');
            const history = savedHistory ? JSON.parse(savedHistory) : [];
            history.push(result);
            localStorage.setItem('sudoku-history', JSON.stringify(history));

        } else {
            setMessage("Henüz bitmedi veya hatalar var.");
        }
    };

    return (
        <Container size="xs" py="xl" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative Lights (Background) */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }}
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }}
            />

            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 3, backgroundOpacity: 0.1 }}
                loaderProps={{ color: 'white', type: 'bars' }}
            />

            <Stack align="center" gap="lg" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header Area */}
                <Group justify="space-between" w="100%" px="xs" align="center">
                    <Stack gap={0}>
                        <Title order={3} c="white" style={{ textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 200, fontSize: '1.5rem' }}>
                            galileoff.
                        </Title>
                        <Text c="dimmed" size="xs" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
                            sudoku 6x6
                        </Text>
                    </Stack>

                    <Button
                        variant="light"
                        color="gray"
                        size="xs"
                        radius="xl"
                        onClick={fetchPuzzle}
                        leftSection={<IconRefresh size={14} />}
                        style={{
                            color: 'rgba(255,255,255,0.8)',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        YENİ
                    </Button>
                </Group>

                {/* Game Board Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ margin: '1rem 0' }}
                >
                    {grid.length > 0 && (
                        <Board
                            grid={grid}
                            initialGrid={initialGrid}
                            activeCell={activeCell}
                            onCellClick={handleCellClick}
                        />
                    )}
                </motion.div>

                {/* Status Message */}
                <div style={{ height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatePresence mode='wait'>
                        {message && (
                            <motion.div
                                key={message}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Text
                                    c={message.includes("Tebrikler") ? "white" : "red.2"}
                                    size="lg"
                                    fw={600}
                                    style={{
                                        textShadow: message.includes("Tebrikler") ? '0 0 20px rgba(255,255,255,0.6)' : '0 0 15px rgba(255,100,100,0.3)',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    {message}
                                </Text>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Controls
                        onNumberClick={handleNumberInput}
                        onErase={handleErase}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ width: '100%' }}
                >
                    <Button
                        fullWidth
                        size="lg"
                        radius="xl"
                        variant="gradient"
                        gradient={{ from: 'rgba(255,255,255,0.1)', to: 'rgba(255,255,255,0.05)', deg: 45 }}
                        onClick={checkSolution}
                        style={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            marginTop: '1.5rem',
                            letterSpacing: '2px',
                            fontWeight: 300,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                        }}
                        styles={{
                            root: { transition: 'transform 0.2s', ':active': { transform: 'scale(0.98)' } }
                        }}
                    >
                        KONTROL ET
                    </Button>
                </motion.div>
            </Stack>
        </Container>
    );
}
