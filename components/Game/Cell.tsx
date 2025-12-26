import { ActionIcon } from '@mantine/core';
import { motion } from 'framer-motion';

interface CellProps {
  value: number | null;
  isValid: boolean;
  isActive: boolean;
  isInitial: boolean;
  onClick: () => void;
  row: number;
  col: number;
}

export const Cell = ({ value, isValid, isActive, isInitial, onClick, row, col }: CellProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: (row * 6 + col) * 0.01 }}
    >
      <ActionIcon
        variant={isActive ? "filled" : "light"}
        size="xl"
        radius="md"
        onClick={onClick}
        style={{
          // Responsive sizing
          width: 'clamp(2.5rem, 11vw, 3.5rem)',
          height: 'clamp(2.5rem, 11vw, 3.5rem)',
          fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',

          fontWeight: isInitial ? 700 : 400,
          // Active: White border + Glow, Inactive: Thin subtle border
          border: isActive
            ? '1px solid rgba(255, 255, 255, 1)'
            : '1px solid rgba(255, 255, 255, 0.1)',

          backgroundColor: isActive
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.01)',

          backdropFilter: 'blur(12px)',

          color: isInitial
            ? '#ffffff'
            : !isValid
              ? '#ff4d4d'
              : '#a0a0a0',

          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

          boxShadow: isActive
            ? '0 0 20px 2px rgba(255, 255, 255, 0.15), inset 0 0 10px rgba(255,255,255,0.05)'
            : 'none',

          transform: isActive ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {value || ''}
      </ActionIcon>
    </motion.div>
  );
};
