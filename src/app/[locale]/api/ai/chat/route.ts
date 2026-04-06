import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth/api";

// System prompt for VOD AI
const SYSTEM_PROMPT = `You are VOD AI, the intelligent assistant for LoopOrb - a water resource management ecosystem currently in active development.

About LoopOrb:
- LoopOrb is a decentralized platform for monitoring, managing, and investing in water resources
- Developed by FoxampyLab, building on experience since 2003
- Currently in Foundation/ALPHA phase, raising seed round funding
- Combines IoT, blockchain, AI, and community to solve the water crisis

Key concepts to explain:
1. Three-token system:
   - VOD: Commodity token backed by 1 m³ of verified water
   - VODeco: Governance token for DAO voting (fixed supply of 1 billion)
   - VODcredit: Non-transferable reputation token (Soulbound Token)

2. VOD-Lab Hardware:
   - VOD-Lab Pro ($13,400): 100+ water parameters, Edge AI verification
   - VOD-Lab Node ($8,900): 50 parameters, portable format

3. Investment projects:
   - Uzbekistan PPP pumping stations ($45M total investment)
   - 10-year concession, 15-22% IRR
   - Real infrastructure modernization

4. DAO Governance:
   - Community-driven decision making
   - Constitutional (66%), Economic (51%), Project (40%), Operational (delegated) levels

5. Staking:
   - UNITY token staking with tier system
   - Explorer (8-12%), Guardian (12-18%), Validator (18-32% APY)

Your personality:
- Professional yet approachable
- Passionate about water conservation and sustainability
- Knowledgeable about blockchain, IoT, and water technology
- Always helpful and encouraging
- Honest about the project being in development

When answering:
- Be concise but informative
- Use formatting (bold, lists) for readability
- If unsure, acknowledge limitations and suggest where to find more info
- Encourage users to participate in the ecosystem
- Always respond in the same language as the user's query
- Be transparent that the platform is in development and features are being built

Current date: April 2026
Project status: Seed round, active development of ALPHA phase`;

// Simple response generator (fallback when OpenAI is not available)
function generateLocalResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  // Token-related queries
  if (lowerMsg.includes('token') || lowerMsg.includes('vod') || lowerMsg.includes('токен')) {
    if (lowerMsg.includes('vodeco')) {
      return `**VODeco** is the governance token of the LoopOrb ecosystem.

**Purpose:** Voting in DAO, project management
**Staking:** More VODeco staked = higher voting power
**Supply:** Fixed at 1 billion tokens

Want to know how to get VODeco or how to participate in DAO voting?`;
    }
    if (lowerMsg.includes('vodcredit') || lowerMsg.includes('репутац') || lowerMsg.includes('reputation')) {
      return `**VODcredit** is a Soulbound Token (SBT) for reputation.

**Non-transferable** - tied to your account
**Earned for:** Data validation, project participation, scientific publications
**Benefits:** Access to privileged projects, higher voting weight in expert matters

Reputation = the ecosystem's trust in you as an expert.`;
    }
    return `**LoopOrb has three tokens:**

1. **VOD** - Commodity Token
   - Backed by 1 m³ of real verified water
   - Issued only after volume verification
   - Trades as a digital asset

2. **VODeco** - Governance Token
   - For DAO voting and governance
   - Staking required for participation
   - Fixed supply of 1 billion

3. **VODcredit** - Reputation SBT
   - Non-transferable
   - Earned for ecosystem contributions
   - Increases trust and voting weight

Which token would you like to learn more about?`;
  }

  // Hardware queries
  if (lowerMsg.includes('hardware') || lowerMsg.includes('lab') || lowerMsg.includes('оборудован') || lowerMsg.includes('device')) {
    return `**VOD-Lab Hardware:**

**VOD-Lab Pro** - $13,400
- 100+ water parameters
- Edge AI verification
- Automatic calibration
- For stationary monitoring stations

**VOD-Lab Node** - $8,900
- 50 key parameters
- Portable format
- Quick cartridge replacement
- For mobile monitoring

**Technologies:**
- Spectrophotometry
- Electrochemical sensors
- AI image analysis
- Blockchain data anchoring

Interested in investing in a node or want technical specs?`;
  }

  // Uzbekistan projects
  if (lowerMsg.includes('uzbekistan') || lowerMsg.includes('узбекистан') || lowerMsg.includes('проект') || lowerMsg.includes('project')) {
    return `**Uzbekistan PPP Projects**

Investment in pumping station modernization:

**Stations:**
- Station #2, Jizzakh - $6.2M, 18% IRR
- Korovulbozor, Bukhara - $8.1M, 22% IRR
- Jondor, Bukhara - $12M, 20% IRR
- PS #3, Navoi - $9.5M, 17% IRR
- Dekhkanabad, Kashkadarya - $7.2M, 15% IRR

**Key metrics:**
- Total investment: $45M
- Concession period: 10 years
- Returns: 15-22% IRR
- ESG Impact: 2.5M people get clean water

Want to explore project details in TokenHub?`;
  }

  // DAO queries
  if (lowerMsg.includes('dao') || lowerMsg.includes('голосован') || lowerMsg.includes('управлен') || lowerMsg.includes('governance') || lowerMsg.includes('voting')) {
    return `**DAO Governance in LoopOrb**

**Decision levels:**

1. **Constitutional** (66% quorum, 30 days)
   - DAO charter changes
   - Key system parameters

2. **Economic** (51% quorum, 7 days)
   - Treasury distribution
   - Economic parameters

3. **Project** (40% quorum, 14 days)
   - Project funding
   - Initiative prioritization

4. **Operational** (delegated, 3 days)
   - Technical decisions
   - Working groups

**How to participate:**
- Stake VODeco tokens
- Create proposals
- Vote for projects

Active votes are available in the DAO section once launched.`;
  }

  // Staking queries
  if (lowerMsg.includes('stak') || lowerMsg.includes('стейк') || lowerMsg.includes('apy') || lowerMsg.includes('yield')) {
    return `**UNITY Token Staking**

**Staking tiers:**

1. **Explorer** - 8-12% APY
   - Entry-level tier
   - Minimal lock period

2. **Guardian** - 12-18% APY
   - Mid-level commitment
   - Better returns

3. **Validator** - 18-32% APY
   - Maximum commitment
   - Highest returns
   - Network validation role

Staking helps secure the network while earning passive income. More details will be available when the staking module launches.`;
  }

  // General greeting
  if (lowerMsg.includes('привет') || lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return `Hi there! I'm VOD AI, your assistant for the LoopOrb ecosystem.

I can tell you about:
- **Tokenomics** (VOD, VODeco, VODcredit)
- **VOD-Lab** hardware for water testing
- **Projects** (Uzbekistan PPP and more)
- **DAO** governance and voting
- **Staking** and investment returns

What would you like to know?`;
  }

  // Default response
  return `Thanks for your question!

I'm VOD AI, assistant for the LoopOrb ecosystem. My expertise covers:
- Water resources and ecology
- Blockchain and tokenomics
- Investment projects
- IoT and monitoring

I can't answer that specific question yet, but try asking about:
- Tokens (VOD, VODeco, VODcredit)
- VOD-Lab hardware
- Uzbekistan projects
- DAO governance and staking

Or visit our Litepaper for detailed information!`;
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
