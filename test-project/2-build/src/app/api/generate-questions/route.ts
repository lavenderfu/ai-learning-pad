import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

// 兼容 360 智脑的自定义 provider
const customModel = createOpenAI({
  baseURL: 'https://api.360.cn/v1',
  apiKey: process.env.API_KEY_360,
  compatibility: 'compatible', // 增加兼容性标志，处理国产模型返回格式的一些小差异
});

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

    // Call 360 API using ai-sdk openai compatible mode
    const result = await generateObject({
      model: customModel('360gpt-pro'), // 换一个更通用稳定的360模型名称
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
  } catch (error: any) {
    console.error('Error generating questions:', error);
    // Return detailed error for debugging
    return NextResponse.json(
      {
        error: 'Failed to generate questions',
        details: error.message || String(error),
        name: error.name
      },
      { status: 500 }
    );
  }
}
