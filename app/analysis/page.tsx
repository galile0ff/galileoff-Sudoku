"use client";

import { useEffect, useState } from 'react';
import { Container, Title, Text, Paper, Group, Stack, SimpleGrid, RingProgress, Center, Button, ThemeIcon, Progress, Avatar, Grid, Badge, Tooltip } from '@mantine/core';
import { IconTrophy, IconCalendarStats, IconArrowLeft, IconFlame, IconChartBar, IconClock, IconStar, IconMedal, IconBolt, IconBrain, IconLock } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { AreaChart } from '@mantine/charts';

export default function AnalysisPage() {
    const [stats, setStats] = useState({ totalSolved: 0, streak: 0, winRate: 100, xp: 0, level: 1 });
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem('sudoku-history');
        if (savedHistory) {
            const history = JSON.parse(savedHistory);
            const totalSolved = history.length;
            // Basit RPG Level Mantığı: Her bulmaca 100 XP. Level = XP / 500 + 1
            const xp = totalSolved * 100;
            const level = Math.floor(xp / 500) + 1;
            const currentLevelKp = xp % 500;

            setStats({
                totalSolved,
                streak: totalSolved, // Mock streak
                winRate: 100,
                xp: currentLevelKp,
                level
            });

            // Chart Data
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i));
                return {
                    date: d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
                    Solved: Math.floor(Math.random() * 5) + (i === 6 ? history.length : 0)
                };
            });
            setChartData(last7Days);
        } else {
            const mockData = Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
                Solved: 0
            }));
            setChartData(mockData);
        }
    }, []);

    return (
        <Container size="sm" py="xl" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient Background Lights */}
            <div style={{ position: 'absolute', top: '-20%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(120, 119, 198, 0.15) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

            <Stack gap="lg" style={{ position: 'relative', zIndex: 1 }}>

                {/* Top Navigation */}
                <Group justify="space-between" align="center">
                    <Button
                        component="a"
                        href="/"
                        variant="subtle"
                        color="gray"
                        size="sm"
                        leftSection={<IconArrowLeft size={18} />}
                        style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                        styles={{ root: { ':hover': { color: 'white' } } }}
                    >
                        Ana Menü
                    </Button>
                    <Text size="xs" fw={700} c="dimmed" style={{ letterSpacing: '2px' }}>PROFİL & İSTATİSTİK</Text>
                </Group>

                {/* Profile / Level Card (Bento Large) */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Paper
                        p="xl"
                        radius="xl"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                        }}
                    >
                        <Group align="flex-start" justify="space-between">
                            <Stack gap={4}>
                                <Text size="xs" c="blue.3" fw={700} style={{ letterSpacing: '1px' }}>MEVCUT SEVİYE</Text>
                                <Title c="white" style={{ fontSize: '3.5rem', lineHeight: 1, fontWeight: 800 }}>
                                    LVL {stats.level}
                                </Title>
                                <Text c="dimmed" size="sm">Sonraki seviyeye: {500 - stats.xp} XP</Text>
                            </Stack>
                            <ThemeIcon size={60} radius="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                                <IconTrophy size={32} />
                            </ThemeIcon>
                        </Group>

                        <Stack mt="xl" gap={6}>
                            <Group justify="space-between">
                                <Text size="xs" fw={700} c="white">XP İLERLEMESİ</Text>
                                <Text size="xs" fw={700} c="dimmed">{stats.xp} / 500 XP</Text>
                            </Group>
                            <Progress
                                value={(stats.xp / 500) * 100}
                                size="lg"
                                radius="xl"
                                striped
                                animated
                                color="blue"
                                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                            />
                        </Stack>
                    </Paper>
                </motion.div>

                {/* Stats Grid (Bento Small) */}
                <Grid gutter="md">
                    {/* Total Solved */}
                    <Grid.Col span={6}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <Paper p="lg" radius="xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                                <Stack gap={0} align="center" justify="center" h="100%">
                                    <RingProgress
                                        size={90}
                                        thickness={8}
                                        roundCaps
                                        sections={[{ value: 100, color: 'grape' }]}
                                        label={<Center><IconStar size={28} color="#cc5de8" /></Center>}
                                    />
                                    <Text size="xl" fw={800} mt="xs" c="white">{stats.totalSolved}</Text>
                                    <Text size="xs" c="dimmed" fw={600} style={{ textTransform: 'uppercase' }}>Çözülen</Text>
                                </Stack>
                            </Paper>
                        </motion.div>
                    </Grid.Col>

                    {/* Streak */}
                    <Grid.Col span={6}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <Paper p="lg" radius="xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                                <Stack gap="xs" h="100%" justify="space-between">
                                    <Group justify="space-between">
                                        <Text size="sm" c="orange.4" fw={700}>SERİ</Text>
                                        <IconFlame size={20} color="#fd7e14" />
                                    </Group>
                                    <div>
                                        <Title order={2} c="white">{stats.streak}</Title>
                                        <Text size="xs" c="dimmed">Gün Boyunca</Text>
                                    </div>
                                    <Progress value={Math.min(stats.streak * 10, 100)} size="sm" color="orange" radius="xl" />
                                </Stack>
                            </Paper>
                        </motion.div>
                    </Grid.Col>

                    {/* Chart - Wide */}
                    <Grid.Col span={12}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <Paper p="lg" radius="xl" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <Text size="xs" c="dimmed" mb="lg" fw={700} style={{ letterSpacing: '1px' }}>AKTİVİTE GRAFİĞİ</Text>
                                <AreaChart
                                    h={160}
                                    data={chartData}
                                    dataKey="date"
                                    series={[{ name: 'Solved', color: 'cyan.5' }]}
                                    curveType="natural"
                                    gridAxis="none"
                                    tickLine="none"
                                    textColor="rgba(255,255,255,0.3)"
                                    withDots={true}
                                    withYAxis={false}
                                />
                            </Paper>
                        </motion.div>
                    </Grid.Col>

                    {/* Achievements - Wide */}
                    <Grid.Col span={12}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <Paper p="lg" radius="xl" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <Group justify="space-between" mb="lg">
                                    <Group gap="xs">
                                        <ThemeIcon variant="light" color="yellow" size="sm" radius="md">
                                            <IconTrophy size={14} />
                                        </ThemeIcon>
                                        <Text size="sm" c="white" fw={700} style={{ letterSpacing: '1px' }}>BAŞARIMLAR</Text>
                                    </Group>
                                    <Badge variant="gradient" gradient={{ from: 'yellow', to: 'orange' }} size="sm">3 / 4 Kazanıldı</Badge>
                                </Group>

                                <SimpleGrid cols={4} spacing="md">
                                    <AchievementBadge
                                        icon={IconBolt}
                                        color="yellow"
                                        label="Hızlı Çözücü"
                                        description="Bir bulmacayı 2 dakikanın altında çöz."
                                        unlocked={true}
                                    />
                                    <AchievementBadge
                                        icon={IconBrain}
                                        color="grape"
                                        label="Zeka Küpü"
                                        description="Hiç hata yapmadan bir bulmaca tamamla."
                                        unlocked={true}
                                    />
                                    <AchievementBadge
                                        icon={IconFlame}
                                        color="orange"
                                        label="Seri Katil"
                                        description="3 gün üst üste oyuna gir ve bulmaca çöz."
                                        unlocked={true}
                                    />
                                    <AchievementBadge
                                        icon={IconMedal}
                                        color="cyan"
                                        label="Usta"
                                        description="Toplam 100 bulmaca çözerek ustalığını kanıtla."
                                        unlocked={false}
                                    />
                                </SimpleGrid>
                            </Paper>
                        </motion.div>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    );
}

function AchievementBadge({ icon: Icon, color, label, description, unlocked }: { icon: any, color: string, label: string, description: string, unlocked: boolean }) {
    return (
        <Tooltip
            label={
                <Stack gap={2} p={4}>
                    <Text size="xs" fw={700} c={unlocked ? color + '.2' : 'dimmed'}>{label} {unlocked ? '(Kazanıldı)' : '(Kilitli)'}</Text>
                    <Text size="xs" c="dimmed" style={{ maxWidth: 150, whiteSpace: 'normal' }}>{description}</Text>
                </Stack>
            }
            multiline
            withArrow
            position="top"
            transitionProps={{ duration: 200, transition: 'slide-up' }}
            color="dark.8"
        >
            <Paper
                p="xs"
                radius="lg"
                style={{
                    backgroundColor: unlocked ? `var(--mantine-color-${color}-9)` : 'rgba(255,255,255,0.03)',
                    background: unlocked ? `linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))` : undefined,
                    border: unlocked ? `1px solid var(--mantine-color-${color}-4)` : '1px solid rgba(255,255,255,0.05)',
                    cursor: 'default',
                    opacity: unlocked ? 1 : 0.5,
                    transition: 'all 0.3s'
                }}
            >
                <Stack align="center" gap={8}>
                    <ThemeIcon
                        variant={unlocked ? 'filled' : 'transparent'}
                        color={color}
                        size={40}
                        radius="md"
                        style={{ boxShadow: unlocked ? '0 4px 12px rgba(0,0,0,0.2)' : 'none' }}
                    >
                        {unlocked ? <Icon size={24} /> : <IconLock size={20} />}
                    </ThemeIcon>
                    <Text size="xs" ta="center" c={unlocked ? 'white' : 'dimmed'} fw={700} style={{ lineHeight: 1.2, fontSize: '0.7rem' }}>
                        {label}
                    </Text>
                </Stack>
            </Paper>
        </Tooltip>
    );
}
