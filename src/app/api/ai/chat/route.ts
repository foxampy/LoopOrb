import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth/api";

// System prompt for VOD AI
const SYSTEM_PROMPT = `You are VOD AI, the intelligent assistant for LoopOrb - a water resource management ecosystem.

Your personality:
- Professional yet approachable
- Passionate about water conservation and sustainability
- Knowledgeable about blockchain, IoT, and water technology
- Always helpful and encouraging

Key knowledge areas:
1. Three-token system: VOD (commodity), VODeco (governance), VODcredit (reputation)
2. VOD-Lab hardware for water quality verification
3. Investment projects, especially Uzbekistan PPP pumping stations
4. DAO governance structure
5. Water crisis facts and solutions

When answering:
- Be concise but informative
- Use formatting (bold, lists) for readability
- If unsure, acknowledge limitations and suggest where to find more info
- Encourage users to participate in the ecosystem
- Always respond in the same language as the user's query

Current date: March 2026`;

// Simple response generator (fallback when OpenAI is not available)
function generateLocalResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  // Token-related queries
  if (lowerMsg.includes('token') || lowerMsg.includes('вод') || lowerMsg.includes('токен')) {
    if (lowerMsg.includes('vodeco')) {
      return `**VODeco** — governance token экосистемы.

• Назначение: голосование в DAO, управление проектами
• Стейкинг: чем больше VODeco в стейке, тем выше сила голоса
• Эмиссия: ограниченная, связана с репутацией

Хотите узнать как приобрести VODeco или как участвовать в голосованиях DAO?`;
    }
    if (lowerMsg.includes('vodcredit') || lowerMsg.includes('репутац')) {
      return `**VODcredit** — Soulbound Token (SBT) репутации.

• Не передаётся — привязан к вашему аккаунту
• Начисляется за: валидацию данных, участие в проектах, научные публикации
• Влияет на: доступ к привилегированным проектам, силу голоса в экспертных вопросах

Репутация = доверие экосистемы к вам как к эксперту.`;
    }
    return `**Три токена экосистемы LoopOrb:**

1. **VOD** 💧 — commodity token
   • Обеспечен 1 м³ реальной воды
   • Эмитируется только после верификации
   • Торгуется как цифровой актив

2. **VODeco** 🌊 — governance token  
   • Для голосований в DAO
   • Стейкинг для участия
   • Управление проектами

3. **VODcredit** ⭐ — reputation SBT
   • Непередаваемый
   • За вклад в экосистему
   • Повышает доверие

Какой токен интересует подробнее?`;
  }
  
  // Hardware queries
  if (lowerMsg.includes('hardware') || lowerMsg.includes('lab') || lowerMsg.includes('оборудован')) {
    return `**VOD-Lab Hardware:**

🏭 **VOD-Lab Pro** — $13,400
• 100+ параметров воды
• Edge AI верификация
• Автоматическая калибровка
• Для стационарных станций

📱 **VOD-Lab Node** — $8,900  
• 50 основных параметров
• Портативный формат
• Быстрая замена картриджей
• Для мобильного мониторинга

🔬 **Технологии:**
• Спектрофотометрия
• Электрохимические сенсоры
• AI-анализ изображений
• Блокчейн-анкоринг данных

Хотите инвестировать в ноду или узнать спецификации?`;
  }
  
  // Uzbekistan projects
  if (lowerMsg.includes('uzbekistan') || lowerMsg.includes('узбекистан') || lowerMsg.includes('проект')) {
    return `**Uzbekistan PPP Projects** 🇺🇿

Инвестиции в модернизацию насосных станций:

📍 **Станции:**
• Station #2, Jizzakh — $6.2M, 18% IRR
• Korovulbozor, Bukhara — $8.1M, 22% IRR  
• Jondor, Bukhara — $12M, 20% IRR
• PS #3, Navoi — $9.5M, 17% IRR
• Dekhkanabad, Kashkadarya — $7.2M, 15% IRR

💰 **Общие показатели:**
• Total investment: $45M
• Концессия: 10 лет
• Доходность: 15-22% IRR
• ESG Impact: 2.5M человек получат чистую воду

Хотите посмотреть детали проектов в TokenHub?`;
  }
  
  // DAO queries
  if (lowerMsg.includes('dao') || lowerMsg.includes('голосован') || lowerMsg.includes('управлен')) {
    return `**DAO Governance LoopOrb** 🏛️

**Уровни решений:**

1. **Constitutional** (66% кворум)
   • Изменения устава DAO
   • Ключевые параметры системы

2. **Economic** (51% кворум)  
   • Распределение treasury
   • Экономические параметры

3. **Project** (40% кворум)
   • Финансирование проектов
   • Приоритизация инициатив

4. **Operational** (делегировано)
   • Технические решения
   • Рабочие группы

**Как участвовать:**
• Стейкайте VODeco
• Создавайте предложения
• Голосуйте за проекты

Текущие активные голосования есть в разделе DAO.`;
  }
  
  // General greeting
  if (lowerMsg.includes('привет') || lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return `Привет! 👋 Я VOD AI, ваш помощник в экосистеме LoopOrb.

Я могу рассказать о:
• 💧 Токеномике (VOD, VODeco, VODcredit)
• 🔬 Оборудовании VOD-Lab
• 🌍 Проектах (Uzbekistan PPP и другие)
• 🏛️ DAO и голосованиях
• 📊 Инвестициях и ROI

Что вас интересует?`;
  }
  
  // Default response
  return `Спасибо за вопрос! 🤔

Я VOD AI, помощник экосистемы LoopOrb. Моя специализация:
• Водные ресурсы и экология
• Блокчейн и токеномика
• Инвестиционные проекты
• IoT и мониторинг

К сожалению, я пока не могу ответить на этот конкретный вопрос. Попробуйте спросить о:
- Токенах (VOD, VODeco, VODcredit)
- Оборудовании VOD-Lab
- Проектах Uzbekistan
- DAO управлении

Или посетите наш Litepaper для подробной информации!`;
}

// POST /api/ai/chat - Chat with VOD AI
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiKey) {
      // Use local response generator as fallback
      const response = generateLocalResponse(message);
      
      return NextResponse.json({
        success: true,
        data: {
          response,
          source: "local",
          timestamp: new Date().toISOString()
        }
      });
    }

    // Call OpenAI API
    try {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.slice(-5), // Keep last 5 messages for context
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!openaiResponse.ok) {
        throw new Error("OpenAI API error");
      }

      const aiData = await openaiResponse.json();
      const aiResponse = aiData.choices[0]?.message?.content || generateLocalResponse(message);

      return NextResponse.json({
        success: true,
        data: {
          response: aiResponse,
          source: "openai",
          timestamp: new Date().toISOString()
        }
      });

    } catch (openaiError) {
      // Fallback to local response
      const response = generateLocalResponse(message);
      
      return NextResponse.json({
        success: true,
        data: {
          response,
          source: "local_fallback",
          timestamp: new Date().toISOString()
        }
      });
    }

  } catch (error) {
    console.error("AI Chat error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
