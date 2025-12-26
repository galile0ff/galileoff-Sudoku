"use client";

import { useState, useEffect } from 'react';
import { Paper, Group, Stack, Text, ThemeIcon, UnstyledButton, Transition } from '@mantine/core';
import { IconHome, IconDeviceGamepad2, IconChartBar } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dock() {
    const pathname = usePathname();
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Sayfa genelinde tıklamayı algıla ve menüyü kapat
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if (isExpanded) {
                setIsExpanded(false);
            }
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [isExpanded]);

    // Scroll algılama (Kullanıcı bunu kaldırmamı istemedi, kalabilir veya click ile çakışırsa kaldırabiliriz)
    // Click odaklı istendiği için scroll'u şimdilik pasife alıyorum, sadece click odaklansın.
    /*
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Aşağı scroll yapılıyorsa ve expanded ise küçült
            if (currentScrollY > lastScrollY && currentScrollY > 50 && isExpanded) {
                setIsExpanded(false);
            }
            // En tepeye çıkıldıysa büyüt
            if (currentScrollY < 20 && !isExpanded) {
                setIsExpanded(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isExpanded]);
    */

    const navItems = [
        { label: 'Ana Sayfa', icon: IconHome, path: '/' },
        { label: 'Oyna', icon: IconDeviceGamepad2, path: '/game' },
        { label: 'Analiz', icon: IconChartBar, path: '/analysis' },
    ];

    const activeItem = navItems.find(item => item.path === pathname) || navItems[0];

    return (
        <div style={{ position: 'fixed', bottom: '24px', left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: isExpanded ? 'center' : 'flex-start', paddingLeft: isExpanded ? 0 : '24px', pointerEvents: 'none' }}>
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="expanded-dock"
                        initial={{ y: 50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{ pointerEvents: 'auto' }}
                        onClick={(e) => e.stopPropagation()} // Dock'a tıklayınca kapanmasını engelle
                    >
                        <Paper
                            radius="xl"
                            p="xs"
                            style={{
                                backgroundColor: 'rgba(20, 20, 20, 0.6)', // Daha koyu, App Store tarzı
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                                display: 'flex',
                                gap: '8px'
                            }}
                        >
                            {navItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <UnstyledButton
                                        key={item.path}
                                        onClick={() => router.push(item.path)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '12px 20px',
                                            borderRadius: '50px',
                                            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                            transition: 'all 0.2s ease',
                                            position: 'relative',
                                        }}
                                    >
                                        <Stack align="center" gap={4}>
                                            <item.icon
                                                size={24}
                                                style={{
                                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                                                    filter: isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none'
                                                }}
                                            />
                                            <Text size="10px" fw={600} c={isActive ? 'white' : 'dimmed'}>
                                                {item.label}
                                            </Text>
                                        </Stack>
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    borderRadius: '50px',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    pointerEvents: 'none'
                                                }}
                                            />
                                        )}
                                    </UnstyledButton>
                                );
                            })}
                        </Paper>
                    </motion.div>
                ) : (
                    <motion.div
                        key="collapsed-dock"
                        initial={{ scale: 0, x: -50 }}
                        animate={{ scale: 1, x: 0 }}
                        exit={{ scale: 0, x: -50 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{ pointerEvents: 'auto' }}
                        onClick={(e) => {
                            e.stopPropagation(); // Global click'i engelle
                            setIsExpanded(true);
                        }}
                    >
                        <Paper
                            radius="50%"
                            style={{
                                width: 56,
                                height: 56,
                                backgroundColor: 'rgba(20, 20, 20, 0.6)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <activeItem.icon size={26} color="white" />
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
