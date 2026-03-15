// Fresh regional and global water news - Updated March 2026

export interface NewsItem {
  id: string;
  type: 'alert' | 'project' | 'research' | 'success' | 'policy';
  scope: 'global' | 'uzbekistan' | 'china' | 'india' | 'israel' | 'central-asia' | 'middle-east' | 'africa';
  title: string;
  summary: string;
  source: string;
  date: string;
  image: string;
  likes: number;
  comments: number;
  tags: string[];
}

export const worldNews: NewsItem[] = [
  // Uzbekistan & Central Asia
  {
    id: "uz-1",
    type: "project",
    scope: "uzbekistan",
    title: "Узбекистан запустил крупнейшую солнечную насосную станцию в Центральной Азии",
    summary: "Новая станция мощностью 50 МВт обеспечит ирригацию 12,000 гектаров сельскохозяйственных земель в Кашкадарьинской области. Проект финансируется Всемирным банком ($120M). Снижение выбросов CO2: 45,000 тонн в год.",
    source: "Uzbekistan Daily / World Bank",
    date: "2 часа назад",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    likes: 3245,
    comments: 412,
    tags: ["Узбекистан", "солнечнаяэнергия", "ирригация", "WorldBank"]
  },
  {
    id: "uz-2",
    type: "alert",
    scope: "central-asia",
    title: "Аральское море: уровень воды снизился на 15% за последний год",
    summary: "Спутниковые данные NASA показывают катастрофическое ускорение высушивания. Эксперты ООН предупреждают о гуманитарном кризисе для 3.5 млн человек в регионе. Требуется экстренное международное вмешательство.",
    source: "NASA Earth Observatory / UNEP",
    date: "5 часов назад",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    likes: 1892,
    comments: 445,
    tags: ["Аральскоеморе", "экокризис", "НАСА", "ООН", "Узбекистан", "Казахстан"]
  },
  {
    id: "uz-3",
    type: "success",
    scope: "uzbekistan",
    title: "Tashkent Water Summit 2026: $2.5B инвестиций в водную инфраструктуру",
    summary: "Международный саммит собрал делегатов из 42 стран. Подписаны соглашения на модернизацию очистных сооружений, внедрение smart-метров и создание регионального центра мониторинга воды с участием LoopOrb.",
    source: "Ministry of Water Resources, Uzbekistan",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800",
    likes: 4567,
    comments: 678,
    tags: ["Ташкент", "саммит", "инвестиции", "LoopOrb"]
  },
  {
    id: "uz-4",
    type: "research",
    scope: "central-asia",
    title: "Новая технология опреснения: графеновые мембраны в пилотном проекте Ашхабада",
    summary: "Туркменские ученые совместно с MIT запустили пилотную установку производительностью 1000 м³/сутки. Энергопотребление снижено на 70% по сравнению с обратным осмосом. Стоимость: $0.45/м³ против $0.85 традиционно.",
    source: "Turkmenistan Academy of Sciences",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    likes: 2156,
    comments: 198,
    tags: ["Туркменистан", "опреснение", "MIT", "графен", "технологии"]
  },

  // China
  {
    id: "cn-1",
    type: "alert",
    scope: "china",
    title: "Прорыв дамбы в провинции Гуандун: 200,000 человек эвакуированы",
    summary: "Из-за рекордных осадков (450мм за 24 часа) произошел прорыв плотины на притоке Жемчужной реки. Водный кризис усугубляется загрязнением сельскохозяйственных угодий. Оценка ущерба: $340M.",
    source: "China Daily / CCTV",
    date: "3 часа назад",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800",
    likes: 5234,
    comments: 892,
    tags: ["Китай", "наводнение", "дамба", "кризис", "Гуандун"]
  },
  {
    id: "cn-2",
    type: "project",
    scope: "china",
    title: "South-to-North Water Diversion: завершен этап III стоимостью $80B",
    summary: "Крупнейший в истории гидрологический проект достиг полной мощности. 45 м³/сек воды перебрасывается с юга на север. Экологи бьют тревогу из-за снижения уровня Янцзы и гибели речной фауны.",
    source: "South China Morning Post",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1563212107-9399b910a129?w=800",
    likes: 3456,
    comments: 567,
    tags: ["Китай", "переброскаводы", "Янцзы", "экология"]
  },
  {
    id: "cn-3",
    type: "research",
    scope: "china",
    title: "AI-прогнозирование засух: точность 94% за 6 месяцев",
    summary: "Tsinghua University представила модель на базе машинного обучения для прогнозирования засух в бассейне Хуанхэ. Система интегрирована с Национальным центром мониторинга водных ресурсов Китая.",
    source: "Nature Climate Change / Tsinghua",
    date: "2 дня назад",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    likes: 2876,
    comments: 234,
    tags: ["Китай", "AI", "машинноеобучение", "засуха", "прогноз"]
  },

  // India
  {
    id: "in-1",
    type: "alert",
    scope: "india",
    title: "Ганг: уровень загрязнения достиг критической отметки после Kumbh Mela",
    summary: "После массового купания 150 млн паломников концентрация колиформных бактерий превысила ПДК в 5000 раз. Мертвая зона расширилась на 80км ниже Аллахабада. Министр окружающей среды объявил чрезвычайное положение.",
    source: "The Hindu / CPCB India",
    date: "4 часа назад",
    image: "https://images.unsplash.com/photo-1561361058-24e6f9c6c06d?w=800",
    likes: 6789,
    comments: 1234,
    tags: ["Индия", "Ганг", "загрязнение", "кризис", "экология"]
  },
  {
    id: "in-2",
    type: "project",
    scope: "india",
    title: "Namami Gange: $4B проект очистки дал первые результаты",
    summary: "В 12 городах сбросы сточных вод сократились на 60%. Запущены 5 новых очистных сооружений производительностью 1,200 MLD. Дельфины Ганга возвращаются в участки реки ниже Варанаси.",
    source: "NMCG / Ministry of Jal Shakti",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800",
    likes: 4321,
    comments: 567,
    tags: ["Индия", "NamamiGange", "очистка", "экология", "дельфины"]
  },
  {
    id: "in-3",
    type: "policy",
    scope: "india",
    title: "Индия: новый Water Act 2026 устанавливает цену на воду",
    summary: "Парламент принял закон о платном водопользовании для промышленности и сельского хозяйства. Цель: сокращение потерь с текущих 40% до 15% к 2030. Первые 50 литров в сутки для домохозяйств остаются бесплатными.",
    source: "Lok Sabha / PRS India",
    date: "2 дня назад",
    image: "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?w=800",
    likes: 5678,
    comments: 890,
    tags: ["Индия", "закон", "воднаяполитика", "тарифы"]
  },

  // Israel
  {
    id: "il-1",
    type: "success",
    scope: "israel",
    title: "Израиль достиг 95% водного самообеспечения за счет опреснения",
    summary: "Sorek B - крупнейшая в мире опреснительная станция (624,000 м³/сутки) вышла на полную мощность. Израиль теперь экспортирует водные технологии в 100+ стран. LoopOrb выбирает Тель-Авив для regional HQ.",
    source: "Israel Water Authority / Mekorot",
    date: "6 часов назад",
    image: "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=800",
    likes: 7890,
    comments: 1234,
    tags: ["Израиль", "опреснение", "Sorek", "технологии", "LoopOrb"]
  },
  {
    id: "il-2",
    type: "research",
    scope: "israel",
    title: "Weizmann Institute: солнечное опреснение с КПД 85%",
    summary: "Новая система на основе нанофильтрации работает без внешнего источника энергии. Пилотный проект в Эйлате показал себестоимость $0.28/м³. Планируется масштабирование для Bedouin communities в Негеве.",
    source: "Weizmann Institute of Science",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    likes: 3456,
    comments: 456,
    tags: ["Израиль", "Weizmann", "опреснение", "солнечнаяэнергия"]
  },
  {
    id: "il-3",
    type: "project",
    scope: "israel",
    title: "Sea of Galilee restoration: уровень воды вырос на 3 метра",
    summary: "10-летний план восстановления Кинерета дает результаты. Запрещен отбор воды для промышленности, внедрены системы капельного орошения на 85% ферм. Туристический поток вырос на 25%.",
    source: "Israel Nature and Parks Authority",
    date: "2 дня назад",
    image: "https://images.unsplash.com/photo-1523527921542-06469d29e624?w=800",
    likes: 2345,
    comments: 345,
    tags: ["Израиль", "Кинерет", "восстановление", "экотуризм"]
  },

  // Middle East
  {
    id: "me-1",
    type: "alert",
    scope: "middle-east",
    title: "Тигр и Евфрат: рекордно низкий уровень за 100 лет",
    summary: "Строительство плотин в Турции (Плотина Илису) сократило поступление воды в Ирак на 40%. 7 млн иракцев остались без доступа к питьевой воде. Эксперты предупреждают о грядущей водной войне.",
    source: "UNESCO / Iraqi Ministry of Water Resources",
    date: "3 часа назад",
    image: "https://images.unsplash.com/photo-1565058688648-856b3b1c4b9c?w=800",
    likes: 8901,
    comments: 1567,
    tags: ["Ирак", "Турция", "Тигр", "Евфрат", "кризис", "ООН"]
  },
  {
    id: "me-2",
    type: "project",
    scope: "middle-east",
    title: "NEOM The Line: полностью автономная водная система за $5B",
    summary: "Саудовский мегапроект представил концепцию zero-liquid discharge. 100% сточных вод будет перерабатываться. Использование атмосферных генераторов воды и солнечного опреснения. Запуск: 2028.",
    source: "NEOM / ACWA Power",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800",
    likes: 4567,
    comments: 789,
    tags: ["СаудовскаяАравия", "NEOM", "TheLine", "умныйгород", "водоснабжение"]
  },
  {
    id: "me-3",
    type: "policy",
    scope: "middle-east",
    title: "ОАЭ запускает Water Security Strategy 2036",
    summary: "Цели: сокращение спроса на 21%, увеличение доли рециклированной воды до 95%, стратегический запас на 7 дней для всего населения. Инвестиции: $25B. LoopOrb selected as technology partner.",
    source: "UAE Ministry of Energy and Infrastructure",
    date: "2 дня назад",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    likes: 3456,
    comments: 567,
    tags: ["ОАЭ", "Дубай", "воднаябезопасность", "стратегия", "LoopOrb"]
  },

  // Africa
  {
    id: "af-1",
    type: "success",
    scope: "africa",
    title: "Великая Зеленая Стена: остановлена деградация 18 млн гектаров",
    summary: "Проект Африканского союза по восстановлению земель приносит результаты. В Сенегале и Мали уровень грунтовых вод вырос на 15 метров. Плантации акации создают устойчивый источник воды для 12 млн человек.",
    source: "African Union / UNCCD",
    date: "4 часа назад",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
    likes: 5678,
    comments: 890,
    tags: ["Африка", "ВеликаяЗеленаяСтена", "восстановление", "АфриканскийСоюз"]
  },
  {
    id: "af-2",
    type: "alert",
    scope: "africa",
    title: "Озеро Чад сократилось на 90% с 1960 года",
    summary: "ВОО призвала к международной помощи. 30 млн человек в Чаде, Нигерии, Нигере и Камеруне сталкиваются с голодом. Конфликты за воду усиливают активность Boko Haram в регионе.",
    source: "FAO / UN OCHA",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    likes: 4321,
    comments: 678,
    tags: ["Чад", "озероЧад", "гумкризис", "ФАО", "ООН"]
  },

  // Global
  {
    id: "gl-1",
    type: "research",
    scope: "global",
    title: "IPCC: к 2050 году 5 млрд человек будут испытывать дефицит воды",
    summary: "Новый доклад МГЭИК прогнозирует снижение стока рек на 20-40% в засушливых регионах. Гималайские ледники теряют 50% массы к 2100. Таяние вечной мерзлоты угрожает загрязнением арктических вод.",
    source: "IPCC AR7 Working Group II",
    date: "6 часов назад",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    likes: 9876,
    comments: 2345,
    tags: ["IPCC", "МГЭИК", "изменениеклимата", "водныйдефицит", "глобальное"]
  },
  {
    id: "gl-2",
    type: "project",
    scope: "global",
    title: "LoopOrb + World Bank: фонд восстановления водных объектов на $500M",
    summary: "Историческое партнерство для финансирования 50+ проектов по очистке рек и восстановлению озер в 40 странах. Первые проекты: Аральское море, Ганг, озеро Чад, Мертвое море. Запуск: 1 апреля 2026.",
    source: "LoopOrb Official / World Bank",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=800",
    likes: 8901,
    comments: 1234,
    tags: ["LoopOrb", "WorldBank", "фонд", "восстановление", "глобальное"]
  },
  {
    id: "gl-3",
    type: "research",
    scope: "global",
    title: "Nature: обнаружены подземные океаны объемом в 3 раза больше поверхностных",
    summary: "Глубинные мантийные породы содержат 3-5 океанов эквивалентной воды на глубине 410-660км. Это меняет понимание гидрологического цикла. Извлечение технологически невозможно, но важно для моделей климата.",
    source: "Nature Geoscience",
    date: "2 дня назад",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    likes: 6789,
    comments: 890,
    tags: ["Nature", "наука", "подземныеводы", "мания", "открытие"]
  },
  {
    id: "gl-4",
    type: "policy",
    scope: "global",
    title: "UN Water Conference 2026: принята конвенция о трансграничных реках",
    summary: "195 стран подписали соглашение о совместном управлении 300+ трансграничных бассейнов. Обязательная арбитражная площадка для разрешения споров. Water as a human right включен в основной текст.",
    source: "UN Water / General Assembly",
    date: "3 дня назад",
    image: "https://images.unsplash.com/photo-1520962922320-2038eebab146?w=800",
    likes: 7890,
    comments: 1234,
    tags: ["ООН", "UNWater", "конвенция", "трансграничные", "правозакон"]
  },
  {
    id: "gl-5",
    type: "success",
    scope: "global",
    title: "Амазонка: Верховный суд Бразилии признал реку юридическим лицом",
    summary: "Прецедентное решение дает Амазонке право на 'здоровое существование'. Создан совет охраны с представителями коренных народов. 15 крупных загрязнителей оштрафованы на $340M.",
    source: "Supremo Tribunal Federal, Brazil",
    date: "2 дня назад",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800",
    likes: 12345,
    comments: 2345,
    tags: ["Бразилия", "Амазонка", "право", "природа", "экология"]
  }
];

// Filter news by scope
export function getNewsByScope(scope: string): NewsItem[] {
  if (scope === 'all') return worldNews;
  return worldNews.filter(news => news.scope === scope || news.scope === 'global');
}

// Get trending tags
export function getTrendingTags(): { tag: string; count: number }[] {
  const tagCounts: Record<string, number> = {};
  worldNews.forEach(news => {
    news.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));
}
