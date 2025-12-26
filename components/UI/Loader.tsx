import { Center, Text, Stack } from '@mantine/core';
import { motion } from 'framer-motion';

export default function Loader({ fullScreen = true }: { fullScreen?: boolean }) {
    return (
        <Center style={{
            height: fullScreen ? '100vh' : '100%',
            width: '100%',
            position: fullScreen ? 'fixed' : 'relative',
            top: 0,
            left: 0,
            zIndex: 999
        }}>
            <Stack align="center" gap="sm">
                <motion.div
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.95, 1.05, 0.95],
                        textShadow: [
                            "0 0 15px rgba(255,255,255,0.1)",
                            "0 0 30px rgba(255,255,255,0.4)",
                            "0 0 15px rgba(255,255,255,0.1)"
                        ]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        c="white"
                        fw={200} // Daha ince font
                        style={{
                            fontSize: '4rem',
                            letterSpacing: '-2px',
                            lineHeight: 1,
                            // System fontlarını kullan, monospace değil
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                            paddingBottom: '8px', // Görsel dengeleme
                            paddingRight: '4px'
                        }}
                    >
                        ƪ(˘⌣˘)ʃ
                    </Text>
                </motion.div>
            </Stack>
        </Center>
    );
}
