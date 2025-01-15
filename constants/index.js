import {
  BarChart,
  BarChart2,
  LinkIcon,
  PieChart,
  Share2,
  Smartphone,
} from "lucide-react";

export const reviews = [
  {
    name: "Nikhil Garg",
    position: "Founder & CEO at Bytecube",
    image: "/images/reviewPhoto1.jpeg",
    message:
      "As a business owner, LinkToIt helps me track which platforms are driving the most engagement.",
  },
  {
    name: "Priya Patel",
    position: "E-commerce Owner",
    image: "/images/reviewPhoto2.jpeg",
    message:
      "The custom short links have significantly improved our click-through rates. Highly recommended!",
  },
  {
    name: "Ravi Iyer",
    position: "Marketing Manager",
    image: "/images/reviewPhoto3.jpeg",
    message:
      "LinkToIt has transformed our digital marketing efforts. The insights we get are invaluable!",
  },
];

export const features = [
  {
    title: "Cross-Platform Analytics",
    icon: BarChart2,
    description:
      "Track your link performance across multiple social media platforms in one centralized dashboard.",
  },
  {
    title: "Custom Short Links",
    icon: LinkIcon,
    description:
      "Create branded, memorable short links that enhance your marketing campaigns and improve click-through rates.",
  },
  {
    title: "Advanced Reporting",
    icon: PieChart,
    description:
      "Generate detailed reports with key insights and suggestions to optimize your link performance.",
  },
  {
    title: "Social Media Integration",
    icon: Share2,
    description:
      "Seamlessly share your links across multiple social media platforms.",
  },
  {
    title: "Mobile App",
    icon: Smartphone,
    description:
      "Manage your links on-the-go with our user-friendly mobile application.",
  },
  {
    title: "Campaign Traffic Insights",
    icon: BarChart,
    description:
      "Track which campaigns drive the most traffic and uncover the keywords that resonate with your audience.",
  },
];

export const workflow = [
  {
    title: "Create Short Links",
    step: 1,
    description:
      "Input your long URL and generate a custom short link in seconds.",
  },
  {
    title: "Share Across Platforms",
    step: 2,
    description:
      "Distribute your short links on various social media and marketing channels.",
  },
  {
    title: "Track & Optimize",
    step: 3,
    description:
      "Monitor performance and use insights to improve your link engagement strategies.",
  },
];

export const plans = [
  {
    name: "Basic",
    description: "Best for individual content creators",
    monthlyPrice: 399,
    yearlyPrice: 3999,
    features: ["Analytics", "Link redirects", "1 Workspace", "10 links"],
    popular: false,
  },
  {
    name: "Professional",
    description: "Best for startups and brands",
    monthlyPrice: 799,
    yearlyPrice: 7999,
    features: ["Analytics", "Link redirects", "3 Workspaces", "25 links"],
    popular: true,
  },
  {
    name: "Business",
    description: "Best for business and agencies",
    monthlyPrice: 1199,
    yearlyPrice: 11999,
    features: ["Analytics", "Link redirects", "5 Workspaces", "100 links"],
    popular: false,
  },
];

export const timeframes = [
  { value: "thisWeek", label: "This Week" },
  { value: "thisMonth", label: "This Month" },
  { value: "monthly", label: "Monthly" },
  { value: "daily", label: "Daily" },
];

export const socialMediaPlatforms = [
  {
    platform: "Facebook",
    color: "#1877F2",
    match: "facebook",
  },
  {
    platform: "Twitter",
    color: "#1DA1F2",
    match: "twitter",
  },
  {
    platform: "Instagram",
    color: "#E4405F",
    match: "instagram",
  },
  {
    platform: "LinkedIn",
    color: "#0A66C2",
    match: "linkedin",
  },
  {
    platform: "YouTube",
    color: "#FF0000",
    match: "youtube",
  },
  {
    platform: "Github",
    color: "#0B8300",
    match: "github",
  },
  {
    platform: "Snapchat",
    color: "#FFFC00",
    match: "snapchat",
  },
  {
    platform: "Pinterest",
    color: "#E60023",
    match: "pinterest",
  },
  {
    platform: "Reddit",
    color: "#FF4500",
    match: "reddit",
  },
  {
    platform: "TikTok",
    color: "#000000",
    match: "tiktok",
  },
  {
    platform: "WhatsApp",
    color: "#25D366",
    match: "whatsapp",
  },
  {
    platform: "Telegram",
    color: "#0088CC",
    match: "telegram",
  },
  {
    platform: "Discord",
    color: "#5865F2",
    match: "discord",
  },
  {
    platform: "WeChat",
    color: "#7BB32E",
    match: "wechat",
  },
  {
    platform: "Medium",
    color: "#00AB6C",
    match: "medium",
  },
  {
    platform: "Twitch",
    color: "#9146FF",
    match: "twitch",
  },
  {
    platform: "Flickr",
    color: "#FF0084",
    match: "flickr",
  },
  {
    platform: "Tumblr",
    color: "#36465D",
    match: "tumblr",
  },
  {
    platform: "Threads",
    color: "#000000",
    match: "threads",
  },
  {
    platform: "Dribbble",
    color: "#EA4C89",
    match: "dribbble",
  },
  {
    platform: "VK",
    color: "#4680C2",
    match: "vk",
  },
  {
    platform: "Dropbox",
    color: "#0061FF",
    match: "dropbox",
  },
  {
    platform: "LeetCode",
    color: "#FFA116",
    match: "leetcode",
  },
  {
    platform: "GitLab",
    color: "#FCA121",
    match: "gitlab",
  },
  {
    platform: "Spotify",
    color: "#1DB954",
    match: "spotify",
  },
  {
    platform: "SoundCloud",
    color: "#FF5500",
    match: "soundcloud",
  },
  {
    platform: "Upwork",
    color: "#6FDA44",
    match: "upwork",
  },
  {
    platform: "Slack",
    color: "#4A154B",
    match: "slack",
  },
  {
    platform: "Substack",
    color: "#FF6719",
    match: "substack",
  },
  {
    platform: "X",
    color: "#000000",
    match: "x",
  },
];
