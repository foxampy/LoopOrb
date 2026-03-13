import { NextRequest } from "next/server";
import { successResponse, errorResponse, getPaginationParams, paginatedResponse } from "@/lib/api";

const demoPosts = [
  {
    id: "post1",
    content: "Только что добавил новые данные об озере Иссыл-Куль! Качество воды отличное, pH на уровне 7.2. 🌊💧 #мониторинг #кыргызстан",
    images: [],
    author: { id: "1", name: "Айбек Токтомбаев", avatar: null, role: "SCIENTIST" },
    project: { id: "3", name: "Иссыл-Куль: чистая вода", slug: "issyk-kul-monitoring" },
    _count: { comments: 12, likes: 45 },
    createdAt: "2026-02-20T08:30:00Z",
  },
  {
    id: "post2",
    content: "Наш проект 'Возрождение Арала' достиг 20% от цели! Благодарим всех инвесторов за поддержку. Вместе мы сможем вернуть жизнь этому региону. 🌱",
    images: [],
    author: { id: "2", name: "Профессор Светлана Каримова", avatar: null, role: "SCIENTIST" },
    project: { id: "2", name: "Возрождение Арала", slug: "aral-restoration" },
    _count: { comments: 28, likes: 156 },
    createdAt: "2026-02-19T15:45:00Z",
  },
  {
    id: "post3",
    content: "Интересный факт: ежедневно в мире используется около 4 трлн литров пресной воды. 70% из них уходят на сельское хозяйство. Сохранение воды - наш общий долг! 💧",
    images: [],
    author: { id: "3", name: "LoopOrb Official", avatar: null, role: "ADMIN" },
    project: null,
    _count: { comments: 8, likes: 234 },
    createdAt: "2026-02-18T10:00:00Z",
  },
  {
    id: "post4",
    content: "Сегодня получил награду 'Эколог недели' за активное добавление данных! Спасибо сообществу за поддержку. Присоединяйтесь к нам! 🏆",
    images: [],
    author: { id: "4", name: "Мария Петрова", avatar: null, role: "CITIZEN" },
    project: null,
    _count: { comments: 5, likes: 67 },
    createdAt: "2026-02-17T18:20:00Z",
  },
];

export async function GET(req: NextRequest) {
  try {
    const { page, limit } = getPaginationParams(req);

    const total = demoPosts.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = demoPosts.slice(start, end);

    return successResponse(paginatedResponse(paginated, total, page, limit));
  } catch (error) {
    console.error("Get feed error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newPost = {
      id: "post" + Date.now(),
      ...body,
      author: { id: "demo", name: "Demo User", avatar: null, role: "INVESTOR" },
      _count: { comments: 0, likes: 0 },
      createdAt: new Date().toISOString(),
    };
    
    return successResponse({ post: newPost }, 201);
  } catch (error) {
    console.error("Create post error:", error);
    return errorResponse("Internal server error", 500);
  }
}
