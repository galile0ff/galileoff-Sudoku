import { NextResponse } from 'next/server';
import { generateSudoku } from '@/utils/sudokuGenerator';

export async function GET(request: Request) {
    // URL parametrelerini al (difficulty)
    // const { searchParams } = new URL(request.url);
    // const difficulty = searchParams.get('difficulty') || 'easy';

    // Şimdilik rastgele bir zorluk seçelim
    const levels = ['easy', 'medium', 'hard'] as const;
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];

    const puzzle = generateSudoku(randomLevel);

    // Gecikme simülasyonu (gerçekçi hissettirmek için)
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(puzzle);
}
