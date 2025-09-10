// src/data/categories.ts

export type Category = {
  name: string;
  path: string;
  description: string;
  examples?: string[];
  details?: { title?: string; subtitle?: string; items: string[] }[];
  image?: string;
};

// Main categories from PDF
export const CATEGORIES: Category[] = [
  {
    name: "Brand Identity & Strategy",
    path: "BrandIdentity",
    description:
      "Crafting and scaling brand foundations for long-term impact. Every effective brand is driven by an underlying strategy.",
    examples: [
      "Brand strategy",
      "Brand naming",
      "Logo design",
      "Visual identity systems",
      "Brand guidelines"
    ],
    image: "https://res.cloudinary.com/ducp6qhg5/image/upload/v1757486418/brand_f9derd.png", // A team collaborating around a whiteboard, representing strategy and planning.
    details: [
      {
        title: "Core Services",
        items: [
          "Brand strategy (vision, mission, values, positioning)",
          "Brand naming (company, product, campaign names)",
          "Logo design (wordmarks, symbols, monograms)",
          "Visual identity systems (color palettes, typography, iconography, patterns)",
          "Brand guidelines (style guides, usage rules, tone of voice)",
          "Corporate branding (B2B brand systems, corporate decks, reports)",
          "Personal branding (executive branding, speaker decks, content presence)"
        ]
      }
    ]
  },
  {
    name: "Creative Design",
    path: "CreativeDesign",
    description:
      "From packaging to presentations, we design visuals that resonate across touchpoints.",
    examples: ["Graphic design", "Packaging", "Event branding"],
    image: "https://images.unsplash.com/photo-1572044162444-24c9562b55da", // A designer's desk with various creative tools, symbolizing the design process.
    details: [
      {
        title: "Services",
        items: [
          "Graphic design (illustrations, infographics, custom artwork)",
          "Packaging design (FMCG, luxury, e-commerce unboxing experiences)",
          "Merchandise design (T-shirts, stationery, swag kits, gift boxes)",
          "Print & editorial design (brochures, annual reports, magazines, book covers)",
          "Presentation design (pitch decks, investor decks, keynote slides)",
          "Event branding (stage backdrops, banners, standees, booth design)",
          "Environmental branding (office branding, retail signage, interiors)"
        ]
      }
    ]
  },
  {
    name: "Digital Presence",
    path: "DigitalPresence",
    description:
      "Websites, apps, and immersive experiences that make your brand come alive online.",
    examples: ["Website design", "App UI/UX", "Interactive experiences"],
    image: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf", // A multi-monitor setup displaying web design layouts, representing a strong digital focus.
    details: [
      {
        title: "Digital Services",
        items: [
          "Website design & development (corporate, e-commerce, landing pages, microsites)",
          "App UI/UX design (mobile, desktop, SaaS products)",
          "Interactive experiences (animations, scroll-triggered visuals, storytelling sites)",
          "Emailers, newsletters, digital brochures",
          "AR/VR brand activations"
        ]
      }
    ]
  },
  {
    name: "Social Media & Content",
    path: "SocialMedia",
    description:
      "Content-first design systems to drive engagement across platforms.",
    examples: ["Content calendars", "Social posts", "Motion graphics"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7", // A collection of social media app icons, directly communicating the theme.
    details: [
      {
        title: "Content Services",
        items: [
          "Social media branding (profile design, highlight covers, banners)",
          "Content calendars & campaign strategy",
          "Social media creatives (carousels, posts, stories)",
          "Reel/short-form video design (hooks, storyboards, editing templates)",
          "Motion graphics & animations (explainer videos, brand stings, kinetic typography)",
          "Influencer collabs & campaign storytelling"
        ]
      }
    ]
  },
  {
    name: "Marketing & Communication",
    path: "Marketing",
    description:
      "Campaigns and communication assets that spread your story with clarity.",
    examples: ["Ad campaigns", "Copywriting", "PR kits"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", // A dashboard with charts and graphs, representing marketing analytics and data-driven campaigns.
    details: [
      {
        title: "Marketing Services",
        items: [
          "Ad campaign design (Google Ads, Meta Ads, LinkedIn campaigns)",
          "Media kits & press kits",
          "Pitch & PR materials",
          "Copywriting (taglines, slogans, brand storytelling, ad copy)",
          "SEO-optimized blog and article content",
          "Lead generation campaign assets",
          "Email marketing templates"
        ]
      }
    ]
  },
  {
    name: "Multimedia & Production",
    path: "Multimedia",
    description:
      "Photography, video, and audio that tell powerful brand stories.",
    examples: ["Photography", "Videography", "Audio branding"],
    image: "https://images.unsplash.com/photo-1574717547378-676107c14648", // A professional camera on a tripod in a studio setting, symbolizing production.
    details: [
      {
        title: "Production Services",
        items: [
          "Photography (product shots, headshots, lifestyle shoots)",
          "Videography (brand films, explainer videos, testimonial reels)",
          "Creative direction for shoots (moodboards, styling, sets)",
          "Audio branding (jingles, sonic identities, podcasts intros/outros)",
          "Storyboarding & scriptwriting (ads, reels, campaigns, presentations)"
        ]
      }
    ]
  },
  {
    name: "Strategy & Consulting",
    path: "Consulting",
    description:
      "Insights and frameworks to guide brand growth and marketing success.",
    examples: ["Brand audits", "Campaign planning", "Growth consulting"],
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b", // A chess board, a classic metaphor for strategic thinking and planning.
    details: [
      {
        title: "Consulting Services",
        items: [
          "Market research & competitor benchmarking",
          "Customer persona development",
          "Campaign planning & positioning strategy",
          "Brand audits (visual, digital, communication)",
          "Growth consulting (branding → marketing → sales funnel alignment)"
        ]
      }
    ]
  },
  {
    name: "Extended Experiences",
    path: "ExtendedExperiences",
    description:
      "Beyond branding — experiences that inspire employees, investors, and communities.",
    examples: ["Employer branding", "CSR campaigns", "Festival branding"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", // A diverse group of people in a workshop, representing community and employee engagement.
    details: [
      {
        title: "Extensions",
        items: [
          "Employer branding (HR decks, recruitment campaigns, culture films)",
          "Investor branding (pitch narratives, IPO branding, financial reports)",
          "CSR branding (impact reports, NGO campaigns)",
          "Festival & occasion branding (Diwali/New Year campaigns, gifting)",
          "Brand collaborations & co-branded experiences"
        ]
      }
    ]
  },

  // ---------------- Industry Verticals ----------------

  {
    name: "Corporate & Business",
    path: "CorporateBusiness",
    description: "Building strong identities and strategies for businesses of all scales.",
    examples: ["Startups", "SMBs", "Enterprises"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40", // A professional business meeting in a modern office, representing the corporate world.
    details: [
      {
        title: "Industries",
        items: [
          "Startups & Entrepreneurs",
          "Small & Medium Businesses (SMBs)",
          "Large Enterprises & Multinationals",
          "B2B & B2C Companies",
          "Professional Services (consultants, law firms, accountants, etc.)"
        ]
      }
    ]
  },
  {
    name: "Consumer & Lifestyle",
    path: "ConsumerLifestyle",
    description: "Designing lifestyle brands that resonate with everyday consumers.",
    examples: ["Fashion & Apparel", "Food & Beverages", "E-commerce"],
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06", // A stylish retail display of consumer products, capturing the essence of lifestyle brands.
    details: [
      {
        title: "Industries",
        items: [
          "Fashion & Apparel",
          "Luxury & Jewelry",
          "Beauty & Cosmetics",
          "Food & Beverages (restaurants, packaged foods, cafes, cloud kitchens)",
          "E-commerce & Retail Chains",
          "Home Decor & Furniture",
          "Travel & Hospitality (hotels, resorts, tourism boards, airlines)"
        ]
      }
    ]
  },
  {
    name: "Education & Learning",
    path: "Education",
    description: "Transforming education and learning experiences through branding and design.",
    examples: ["Universities", "EdTech platforms", "NGOs in education"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", // A university lecture hall filled with students, symbolizing education.
    details: [
      {
        title: "Industries",
        items: [
          "Schools, Colleges, Universities",
          "EdTech Platforms & Coaching Institutes",
          "NGOs working in education",
          "Skill Development & Training Programs"
        ]
      }
    ]
  },
  {
    name: "Healthcare & Wellness",
    path: "Healthcare",
    description: "Healthcare brands that build trust, care, and wellbeing.",
    examples: ["Hospitals", "Pharma", "Wellness brands"],
    image: "https://images.unsplash.com/photo-1538688423619-a83d0f24b7d4", // A clean, modern image of a stethoscope, representing healthcare and trust.
    details: [
      {
        title: "Industries",
        items: [
          "Hospitals & Clinics",
          "Pharma Companies",
          "HealthTech & MedTech Startups",
          "Fitness & Gyms",
          "Wellness, Ayurveda & Alternative Therapies",
          "Mental Health & Counseling"
        ]
      }
    ]
  },
  {
    name: "Social Impact & NGOs",
    path: "SocialImpact",
    description: "Design for change — brands that drive positive social impact.",
    examples: ["Non-profits", "CSR Projects", "Sustainability"],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c", // Hands holding a plant seedling, symbolizing growth, care, and social impact.
    details: [
      {
        title: "Industries",
        items: [
          "Non-profits & Foundations",
          "Government Schemes & Initiatives",
          "CSR Projects",
          "Environmental & Sustainability Projects"
        ]
      }
    ]
  },
  {
    name: "Technology & Digital",
    path: "Technology",
    description: "Innovating for the future with technology-first branding.",
    examples: ["SaaS", "AI companies", "FinTech"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", // A team working collaboratively with laptops and technology, representing innovation.
    details: [
      {
        title: "Industries",
        items: [
          "IT Companies & SaaS Brands",
          "AI & Data Companies",
          "FinTech, InsurTech, HealthTech",
          "Mobile Apps & Platforms",
          "Hardware & Consumer Electronics"
        ]
      }
    ]
  },
  {
    name: "Media & Entertainment",
    path: "MediaEntertainment",
    description: "Entertainment brands that inform, engage, and inspire.",
    examples: ["Film", "OTT", "Gaming"],
    image: "https://images.unsplash.com/photo-1603145733316-7460142e283d", // A person watching a movie on a large screen, representing media and entertainment.
    details: [
      {
        title: "Industries",
        items: [
          "Film & TV Production Houses",
          "OTT Platforms & Streaming Apps",
          "Music Labels & Artists",
          "Publishing & Magazines",
          "Sports Teams & Leagues",
          "Gaming & Esports"
        ]
      }
    ]
  },
  {
    name: "Industrial & Infrastructure",
    path: "IndustrialInfrastructure",
    description: "Branding industries powering infrastructure and innovation.",
    examples: ["Real Estate", "Construction", "Automotive"],
    image: "https://images.unsplash.com/photo-1581094371970-2a799f493701", // A modern architectural structure, symbolizing construction and infrastructure.
    details: [
      {
        title: "Industries",
        items: [
          "Real Estate & Property Developers",
          "Construction & Architecture Firms",
          "Manufacturing (FMCG, Industrial Goods, Consumer Goods)",
          "Logistics & Supply Chain",
          "Automotive & EV Brands"
        ]
      }
    ]
  },
  {
    name: "Energy & Environment",
    path: "EnergyEnvironment",
    description: "Brands creating a sustainable energy future.",
    examples: ["Renewables", "Oil & Gas", "Cleantech"],
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7", // Wind turbines against a clear sky, representing renewable energy and sustainability.
    details: [
      {
        title: "Industries",
        items: [
          "Renewable Energy Companies (solar, wind, hydro)",
          "Oil & Gas Corporations",
          "Cleantech Startups",
          "Sustainability & Recycling Brands"
        ]
      }
    ]
  },
  {
    name: "Finance & Investment",
    path: "Finance",
    description: "Financial brands that inspire trust and growth.",
    examples: ["Banks", "VCs", "FinTech"],
    image: "https://images.unsplash.com/photo-1600985160538-35b912380536", // Abstract image of stock market data on a screen, representing finance and investment.
    details: [
      {
        title: "Industries",
        items: [
          "Banks & Financial Institutions",
          "Investment Firms & VCs",
          "Insurance Companies",
          "FinTech Startups",
          "Wealth Management & Advisory"
        ]
      }
    ]
  },
  {
    name: "Government & Public Sector",
    path: "Government",
    description: "Public sector initiatives and campaigns for citizens.",
    examples: ["Smart Cities", "Tourism Boards", "Awareness Campaigns"],
    image: "https://images.unsplash.com/photo-1560520655-5431e2b5a5c3", // A grand government building, symbolizing the public sector and governance.
    details: [
      {
        title: "Industries",
        items: [
          "City Branding & Smart City Projects",
          "Tourism Boards",
          "Public Awareness Campaigns",
          "State & Central Govt. Initiatives"
        ]
      }
    ]
  },
  {
    name: "Events & Lifestyle",
    path: "EventsLifestyle",
    description: "Experiential branding for events and celebrations.",
    examples: ["Event Management", "Exhibitions", "Weddings"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", // A lively concert or festival scene, representing events and experiential branding.
    details: [
      {
        title: "Industries",
        items: [
          "Event Management Companies",
          "Exhibitions & Conferences",
          "Weddings & Luxury Events",
          "Festivals & Cultural Shows"
        ]
      }
    ]
  },
  {
    name: "Niche & Emerging",
    path: "NicheEmerging",
    description: "Future-focused niches and emerging categories.",
    examples: ["Agritech", "Space", "Influencers"],
    image: "https://images.unsplash.com/photo-1614728263952-84ea256ec346", // An abstract, futuristic image representing emerging technologies and niche markets.
    details: [
      {
        title: "Industries",
        items: [
          "Agritech & Farming Startups",
          "Space & Aerospace Companies",
          "Pet Care & Veterinary",
          "Adventure & Outdoor Brands",
          "Influencers & Personal Brands",
          "Spiritual & Religious Organizations"
        ]
      }
    ]
  }
];