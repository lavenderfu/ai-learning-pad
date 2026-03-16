import { anthropic } from '@ai-sdk/anthropic';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

// System prompt forces the AI to output exactly the format we need
const systemPrompt = `你是一个专业的3岁幼儿教育专家。
请根据用户提供的主题，生成3道适合3岁儿童的互动选择题。
要求：
1. 题目必须要简单直白，符合3岁认知。
2. 选项必须是单字或个位数数字，不能太长。
3. 必须提供一个正确选项和两个干扰选项。`;

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Missing topic' }, { status: 400 });
    }

    // Call Anthropic API using ai-sdk
    const result = await generateObject({
      model: anthropic('claude-3-haiku-20240307'),
      system: systemPrompt,
      prompt: `请为这个主题生成题目: ${topic}`,
      schema: z.object({
        questions: z.array(
          z.object({
            id: z.number().describe('Question ID (1, 2, 3)'),
            text: z.string().describe('The question text, e.g., 哪个是数字 "4"？'),
            options: z.array(
              z.object({
                id: z.number(),
                value: z.string().describe('The option text (single char or number)'),
                isCorrect: z.boolean()
              })
            ).length(3).describe('Exactly 3 options')
          })
        ).length(3).describe('Exactly 3 questions')
      }),
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}
