import { SimpleGrid, Box, Paper } from '@mantine/core';
import { Cell } from './Cell';

interface BoardProps {
    grid: (number | null)[][];
    initialGrid: (number | null)[][];
    activeCell: [number, number] | null;
    onCellClick: (row: number, col: number) => void;
}

export const Board = ({ grid, initialGrid, activeCell, onCellClick }: BoardProps) => {
    // 3x2'lik bir ana grid oluşturuyoruz (Her biri 2x3'lük bir Sudoku bölgesi)
    // Ancak görsel olarak 6x6'lık tek grid ama araları açık göstermek daha kolay olabilir.
    // Burada 6x6'lık grid kullanıp, border'larla bölgeleri ayıracağız.

    return (
        <Paper
            p="md"
            radius="xl"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
                padding: '8px'
            }}
        >
            <Box style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '4px',
                // Bu stiller grid'i bloklara ayırır (Görsel hile)
                // 3. sütundan sonra (2. index) büyük boşluk
                // 2. satırdan sonra ve 4. satırdan sonra büyük boşluk
            }}>
                {grid.map((row, rowIndex) => (
                    row.map((cellValue, colIndex) => {
                        // Blok Ayrımı için Dinamik Marginler
                        // Sütunlar: 0,1,2 | 3,4,5 => Index 2'den sonra boşluk
                        const addRightMargin = colIndex === 2;

                        // Satırlar: 0,1 | 2,3 | 4,5 => Index 1 ve 3'ten sonra boşluk
                        const addBottomMargin = rowIndex === 1 || rowIndex === 3;

                        return (
                            <Box
                                key={`${rowIndex}-${colIndex}`}
                                style={{
                                    marginRight: addRightMargin ? '16px' : '0',
                                    marginBottom: addBottomMargin ? '16px' : '0',
                                }}
                            >
                                <Cell
                                    row={rowIndex}
                                    col={colIndex}
                                    value={cellValue}
                                    isInitial={initialGrid[rowIndex][colIndex] !== null}
                                    isValid={true}
                                    isActive={activeCell?.[0] === rowIndex && activeCell?.[1] === colIndex}
                                    onClick={() => onCellClick(rowIndex, colIndex)}
                                />
                            </Box>
                        );
                    })
                ))}
            </Box>
        </Paper>
    );
};
