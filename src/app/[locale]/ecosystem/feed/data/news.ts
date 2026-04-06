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
    title: "Uzbekistan launched the largest solar pumping station in Central Asia",
    summary: "The new 50 MW station will provide irrigation for 12,000 hectares of agricultural land in the Kashkadarya region. The project is funded by the World Bank ($120M). CO2 emissions reduction: 45,000 tons per year.",
    source: "Uzbekistan Daily / World Bank",
    date: "2 hours ago",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    likes: 3245,
    comments: 412,
    tags: ["Uzbekistan", "solar energy", "irrigation", "WorldBank"]
  },
  {
    id: "uz-2",
    type: "alert",
    scope: "central-asia",
    title: "Aral Sea: water level dropped 15% in the last year",
    summary: "NASA satellite data shows catastrophic acceleration of drying. UN experts warn of a humanitarian crisis for 3.5 million people in the region. Urgent international intervention is required.",
    source: "NASA Earth Observatory / UNEP",
    date: "5 hours ago",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    likes: 1892,
    comments: 445,
    tags: ["Aral Sea", "eco crisis", "NASA", "UN", "Uzbekistan", "Kazakhstan"]
  },
  {
    id: "uz-3",
    type: "success",
    scope: "uzbekistan",
    title: "Tashkent Water Summit 2026: $2.5B investment in water infrastructure",
    summary: "The international summit gathered delegates from 42 countries. Agreements signed for wastewater treatment plant modernization, smart meter deployment, and creation of a regional water monitoring center with LoopOrb participation.",
    source: "Ministry of Water Resources, Uzbekistan",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800",
    likes: 4567,
    comments: 678,
    tags: ["Tashkent", "summit", "investment", "LoopOrb"]
  },
  {
    id: "uz-4",
    type: "research",
    scope: "central-asia",
    title: "New desalination technology: graphene membranes in Ashgabat pilot project",
    summary: "Turkmen scientists jointly with MIT launched a pilot facility with 1,000 m3/day capacity. Energy consumption reduced by 70% compared to reverse osmosis. Cost: $0.45/m3 vs $0.85 traditional.",
    source: "Turkmenistan Academy of Sciences",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    likes: 2156,
    comments: 198,
    tags: ["Turkmenistan", "desalination", "MIT", "graphene", "technology"]
  },

  // China
  {
    id: "cn-1",
    type: "alert",
    scope: "china",
    title: "Dam breach in Guangdong province: 200,000 people evacuated",
    summary: "Record rainfall (450mm in 24 hours) caused a dam breach on a tributary of the Pearl River. The water crisis is compounded by agricultural land contamination. Damage estimate: $340M.",
    source: "China Daily / CCTV",
    date: "3 hours ago",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800",
    likes: 5234,
    comments: 892,
    tags: ["China", "flood", "dam", "crisis", "Guangdong"]
  },
  {
    id: "cn-2",
    type: "project",
    scope: "china",
    title: "South-to-North Water Diversion: Phase III completed at $80B cost",
    summary: "The largest hydrological project in history reached full capacity. 45 m3/sec of water is transferred from south to north. Environmentalists raise alarms about declining Yangtze levels and river fauna mortality.",
    source: "South China Morning Post",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1563212107-9399b910a129?w=800",
    likes: 3456,
    comments: 567,
    tags: ["China", "water diversion", "Yangtze", "ecology"]
  },
  {
    id: "cn-3",
    type: "research",
    scope: "china",
    title: "AI drought forecasting: 94% accuracy at 6 months ahead",
    summary: "Tsinghua University presented a machine learning model for drought prediction in the Yellow River basin. The system is integrated with China's National Water Resources Monitoring Center.",
    source: "Nature Climate Change / Tsinghua",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    likes: 2876,
    comments: 234,
    tags: ["China", "AI", "machine learning", "drought", "forecast"]
  },

  // India
  {
    id: "in-1",
    type: "alert",
    scope: "india",
    title: "Ganges: pollution levels reach critical mark after Kumbh Mela",
    summary: "After mass bathing of 150 million pilgrims, coliform bacteria concentration exceeded safe limits by 5,000 times. The dead zone expanded 80km downstream of Allahabad. The Environment Minister declared a state of emergency.",
    source: "The Hindu / CPCB India",
    date: "4 hours ago",
    image: "https://images.unsplash.com/photo-1561361058-24e6f9c6c06d?w=800",
    likes: 6789,
    comments: 1234,
    tags: ["India", "Ganges", "pollution", "crisis", "ecology"]
  },
  {
    id: "in-2",
    type: "project",
    scope: "india",
    title: "Namami Gange: $4B cleanup project shows first results",
    summary: "Sewage discharge reduced by 60% in 12 cities. 5 new treatment plants with 1,200 MLD capacity launched. Ganges dolphins are returning to river sections downstream of Varanasi.",
    source: "NMCG / Ministry of Jal Shakti",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800",
    likes: 4321,
    comments: 567,
    tags: ["India", "NamamiGange", "cleanup", "ecology", "dolphins"]
  },
  {
    id: "in-3",
    type: "policy",
    scope: "india",
    title: "India: new Water Act 2026 sets water pricing",
    summary: "Parliament passed a paid water use law for industry and agriculture. Goal: reduce losses from current 40% to 15% by 2030. First 50 liters per day for households remain free.",
    source: "Lok Sabha / PRS India",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?w=800",
    likes: 5678,
    comments: 890,
    tags: ["India", "law", "water policy", "tariffs"]
  },

  // Israel
  {
    id: "il-1",
    type: "success",
    scope: "israel",
    title: "Israel achieves 95% water self-sufficiency through desalination",
    summary: "Sorek B - the world's largest desalination plant (624,000 m3/day) reached full capacity. Israel now exports water technologies to 100+ countries. LoopOrb selects Tel Aviv for regional HQ.",
    source: "Israel Water Authority / Mekorot",
    date: "6 hours ago",
    image: "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=800",
    likes: 7890,
    comments: 1234,
    tags: ["Israel", "desalination", "Sorek", "technology", "LoopOrb"]
  },
  {
    id: "il-2",
    type: "research",
    scope: "israel",
    title: "Weizmann Institute: solar desalination with 85% efficiency",
    summary: "The new nanofiltration-based system operates without an external energy source. Pilot project in Eilat showed cost of $0.28/m3. Scaling planned for Bedouin communities in the Negev.",
    source: "Weizmann Institute of Science",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    likes: 3456,
    comments: 456,
    tags: ["Israel", "Weizmann", "desalination", "solar energy"]
  },
  {
    id: "il-3",
    type: "project",
    scope: "israel",
    title: "Sea of Galilee restoration: water level rose 3 meters",
    summary: "The 10-year Kinneret restoration plan is showing results. Industrial water extraction banned, drip irrigation implemented on 85% of farms. Tourist traffic increased by 25%.",
    source: "Israel Nature and Parks Authority",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1523527921542-06469d29e624?w=800",
    likes: 2345,
    comments: 345,
    tags: ["Israel", "Kinneret", "restoration", "eco-tourism"]
  },

  // Middle East
  {
    id: "me-1",
    type: "alert",
    scope: "middle-east",
    title: "Tigris and Euphrates: record low levels in 100 years",
    summary: "Dam construction in Turkey (Ilisu Dam) reduced water flow to Iraq by 40%. 7 million Iraqis left without access to drinking water. Experts warn of an impending water war.",
    source: "UNESCO / Iraqi Ministry of Water Resources",
    date: "3 hours ago",
    image: "https://images.unsplash.com/photo-1565058688648-856b3b1c4b9c?w=800",
    likes: 8901,
    comments: 1567,
    tags: ["Iraq", "Turkey", "Tigris", "Euphrates", "crisis", "UN"]
  },
  {
    id: "me-2",
    type: "project",
    scope: "middle-east",
    title: "NEOM The Line: fully autonomous water system for $5B",
    summary: "The Saudi megaproject unveiled a zero-liquid discharge concept. 100% of wastewater will be recycled. Use of atmospheric water generators and solar desalination. Launch: 2028.",
    source: "NEOM / ACWA Power",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800",
    likes: 4567,
    comments: 789,
    tags: ["Saudi Arabia", "NEOM", "TheLine", "smart city", "water supply"]
  },
  {
    id: "me-3",
    type: "policy",
    scope: "middle-east",
    title: "UAE launches Water Security Strategy 2036",
    summary: "Goals: 21% demand reduction, increase recycled water share to 95%, strategic 7-day supply for the entire population. Investment: $25B. LoopOrb selected as technology partner.",
    source: "UAE Ministry of Energy and Infrastructure",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    likes: 3456,
    comments: 567,
    tags: ["UAE", "Dubai", "water security", "strategy", "LoopOrb"]
  },

  // Africa
  {
    id: "af-1",
    type: "success",
    scope: "africa",
    title: "Great Green Wall: 18 million hectares of degradation halted",
    summary: "The African Union land restoration project is delivering results. In Senegal and Mali, groundwater levels rose by 15 meters. Acacia plantations create a sustainable water source for 12 million people.",
    source: "African Union / UNCCD",
    date: "4 hours ago",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
    likes: 5678,
    comments: 890,
    tags: ["Africa", "Great Green Wall", "restoration", "African Union"]
  },
  {
    id: "af-2",
    type: "alert",
    scope: "africa",
    title: "Lake Chad shrunk 90% since 1960",
    summary: "The UN called for international aid. 30 million people in Chad, Nigeria, Niger, and Cameroon face famine. Water conflicts intensify Boko Haram activity in the region.",
    source: "FAO / UN OCHA",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    likes: 4321,
    comments: 678,
    tags: ["Chad", "Lake Chad", "humanitarian crisis", "FAO", "UN"]
  },

  // Global
  {
    id: "gl-1",
    type: "research",
    scope: "global",
    title: "IPCC: 5 billion people will face water scarcity by 2050",
    summary: "New IPCC report predicts river flow decline of 20-40% in arid regions. Himalayan glaciers losing 50% mass by 2100. Permafrost melting threatens Arctic water contamination.",
    source: "IPCC AR7 Working Group II",
    date: "6 hours ago",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    likes: 9876,
    comments: 2345,
    tags: ["IPCC", "climate change", "water scarcity", "global"]
  },
  {
    id: "gl-2",
    type: "project",
    scope: "global",
    title: "LoopOrb + World Bank: $500M water body restoration fund",
    summary: "Historic partnership to fund 50+ river cleanup and lake restoration projects in 40 countries. First projects: Aral Sea, Ganges, Lake Chad, Dead Sea. Launch: April 1, 2026.",
    source: "LoopOrb Official / World Bank",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=800",
    likes: 8901,
    comments: 1234,
    tags: ["LoopOrb", "WorldBank", "fund", "restoration", "global"]
  },
  {
    id: "gl-3",
    type: "research",
    scope: "global",
    title: "Nature: underground oceans discovered, 3x the volume of surface waters",
    summary: "Deep mantle rocks contain 3-5 ocean equivalents of water at depths of 410-660km. This changes understanding of the hydrological cycle. Extraction is technologically impossible but important for climate models.",
    source: "Nature Geoscience",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    likes: 6789,
    comments: 890,
    tags: ["Nature", "science", "groundwater", "mantle", "discovery"]
  },
  {
    id: "gl-4",
    type: "policy",
    scope: "global",
    title: "UN Water Conference 2026: transboundary rivers convention adopted",
    summary: "195 countries signed an agreement on joint management of 300+ transboundary basins. Mandatory arbitration venue for dispute resolution. Water as a human right included in the main text.",
    source: "UN Water / General Assembly",
    date: "3 days ago",
    image: "https://images.unsplash.com/photo-1520962922320-2038eebab146?w=800",
    likes: 7890,
    comments: 1234,
    tags: ["UN", "UNWater", "convention", "transboundary", "human rights"]
  },
  {
    id: "gl-5",
    type: "success",
    scope: "global",
    title: "Amazon: Brazil's Supreme Court recognizes the river as a legal entity",
    summary: "Landmark ruling grants the Amazon the right to 'healthy existence'. A conservation council with indigenous representatives created. 15 major polluters fined $340M.",
    source: "Supremo Tribunal Federal, Brazil",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800",
    likes: 12345,
    comments: 2345,
    tags: ["Brazil", "Amazon", "law", "nature", "ecology"]
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
