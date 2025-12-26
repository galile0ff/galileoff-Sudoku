import { Group, Button, ActionIcon } from '@mantine/core';
import { IconEraser, IconBulb } from '@tabler/icons-react';

interface ControlsProps {
    onNumberClick: (num: number) => void;
    onErase: () => void;
    onHint?: () => void;
}

export const Controls = ({ onNumberClick, onErase, onHint }: ControlsProps) => {
    return (
        <Group justify="center" mt="xl" gap="sm">
            {[1, 2, 3, 4, 5, 6].map((num) => (
                <Button
                    key={num}
                    variant="light"
                    size="lg"
                    radius="xl"
                    onClick={() => onNumberClick(num)}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        color: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        width: 'clamp(2.5rem, 10vw, 3.5rem)',
                        height: 'clamp(2.5rem, 10vw, 3.5rem)',
                        padding: 0,
                        fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                        fontWeight: 300,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s'
                    }}
                >
                    {num}
                </Button>
            ))}

            <ActionIcon
                variant="subtle"
                size="xl"
                radius="xl"
                color="red.2"
                onClick={onErase}
                style={{ width: '50px', height: '50px' }}
            >
                <IconEraser size={28} />
            </ActionIcon>
        </Group>
    );
};
