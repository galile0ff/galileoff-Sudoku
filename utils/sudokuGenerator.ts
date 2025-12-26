// 6x6 Sudoku Generator (Mock)
// Basit bir algoritma ile geçerli bir 6x6 sudoku üretir ve bazı hücreleri gizler.

const BLANK = 0;

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
    // Satır ve Sütun kontrolü
    for (let x = 0; x < 6; x++) {
        if (grid[row][x] === num || grid[x][col] === num) return false;
    }

    // 2x3 Kutu kontrolü
    const startRow = row - (row % 2);
    const startCol = col - (col % 3);
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) return false;
        }
    }

    return true;
}

function solveSudoku(grid: number[][]): boolean {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
            if (grid[row][col] === BLANK) {
                // 1-6 arası sayıları dene (rastgele sıra ile daha iyi olurdu ama şimdilik düz)
                const nums = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
                for (const num of nums) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) return true;
                        grid[row][col] = BLANK;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

export function generateSudoku(difficulty: 'easy' | 'medium' | 'hard') {
    // Boş grid oluştur
    const grid = Array(6).fill(0).map(() => Array(6).fill(BLANK));

    // Rastgele doldur
    solveSudoku(grid);
    const solution = grid.map(row => [...row]);

    // Zorluğa göre hücre sil
    let attempts = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25;

    while (attempts > 0) {
        let row = Math.floor(Math.random() * 6);
        let col = Math.floor(Math.random() * 6);
        while (grid[row][col] === BLANK) {
            row = Math.floor(Math.random() * 6);
            col = Math.floor(Math.random() * 6);
        }
        grid[row][col] = BLANK;
        attempts--;
    }

    // Frontend'in beklediği format (0 yerine null)
    const formattedGrid = grid.map(row => row.map(cell => cell === 0 ? null : cell));

    return {
        grid: formattedGrid,
        solution: solution,
        difficulty
    };
}
