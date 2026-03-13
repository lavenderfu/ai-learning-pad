/**
 * 智创平台 - 运营配置文件
 * 运营人员可通过修改此文件来配置页面内容
 */

const CONFIG = {
    // ==================== 顶部公告栏配置 ====================
    notices: [
        { text: "🔥 新品首发：AI宠物翻译器上线，快来听听毛孩子的心声！", link: "#" },
        { text: "🎉 创作挑战赛：参与漫剧创作，赢取万元现金大奖！", link: "#" },
        { text: "✨ 升级通知：智能修图功能大升级，支持更高清画质导出。", link: "#" },
        { text: "💰 赚钱攻略：邀请好友注册，立享点数和现金双重返利！", link: "#" }
    ],

    // ==================== 顶部通栏配置 ====================
    header: {
        logo: {
            text: "智创",
            icon: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
        },
        actions: [
            {
                id: "customer-service",
                type: "hover-qr",
                icon: '<svg viewBox="0 0 1024 1024" width="20" height="20"><path fill="#07C160" d="M685.2 468.9c0-107.6-106.8-194.8-238.4-194.8-131.7 0-238.5 87.2-238.5 194.8 0 60.1 33.3 113.8 84.8 150.3l-21.7 66.8 79.2-40.4c30.2 8.5 62.4 13.1 96.2 13.1 131.6 0 238.4-87.2 238.4-194.8zM446.8 610.9v0c-30.8 0-59.5-4.4-86.8-12.4l-64.8 33 17.5-54.3c-41-29.4-67.4-72.6-67.4-120.3 0-88.6 90-160.5 201.5-160.5 111.4 0 201.5 71.9 201.5 160.5 0 88.6-90.1 160.5-201.5 160.5zm392.2-70c0-93.5-92.8-169.3-207.2-169.3-8.8 0-17.5.5-26 1.4 13.8 28.5 21.6 60.2 21.6 93.6 0 20.3-2.6 40-7.3 58.7 13.7 136.2-94.2 238.9-228.6 238.9-20.9 0-41-2.4-60.1-6.8 20.5 59.9 91.8 103.7 175.7 103.7 27.6 0 53.6-4.1 77.8-11.4l64.1 32.7-17.6-53.5c41.6-28.7 67.6-70.5 67.6-117z"/></svg>',
                text: "客服",
                qrText: "扫码添加客服"
            },
            {
                id: "signin",
                type: "signin",
                icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#f59e0b" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-3h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/></svg>',
                text: "签到",
                points: 20
            },
            {
                id: "login",
                type: "login",
                text: "登录/注册"
            }
        ]
    },

    // ==================== 左侧菜单配置 ====================
    sideMenu: [
        {
            id: "home",
            text: "首页",
            icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
            href: "index.html",
            anchor: "#section-hero",
            enabled: true
        },
        {
            id: "inspiration",
            text: "灵感广场",
            icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>',
            href: "index.html",
            anchor: "#section-inspiration",
            enabled: true
        },
        {
            id: "assets",
            text: "我的资产",
            icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>',
            href: "assets.html",
            enabled: false,
            disabledText: "coming soon"
        },
        {
            id: "account",
            text: "账户管理",
            icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
            href: "account.html",
            enabled: true
        }
    ],

    // ==================== 主功能卡片配置 ====================
    mainFeatures: [
        {
            id: "comic",
            title: "漫剧创作",
            description: "剧本生成、智能分镜、一键视频合成，轻松做漫剧。",
            image: "", // 卡片封面图片URL
            buttonText: "开始创作",
            buttonLink: "#", // 按钮跳转链接
            cardLink: "#"    // 卡片整体跳转链接
        },
        {
            id: "novel",
            title: "小说创作",
            description: "灵感爆发，自动生成大纲与章节，续写修改更懂你。",
            image: "",
            buttonText: "开始创作",
            buttonLink: "#",
            cardLink: "#"
        },
        {
            id: "video",
            title: "解说视频创作",
            description: "解说文案、高能混剪、爆款解说素材一秒出片。",
            image: "",
            buttonText: "开始创作",
            buttonLink: "#",
            cardLink: "#"
        }
    ],

    // ==================== 特色功能卡片配置 ====================
    extraFeatures: [
        {
            id: "prompt",
            title: "提示词提取",
            description: "上传参考图，反推精准提示词",
            icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#1976d2" d="M22.5 11l-3.3-3.3c-.4-.4-1-.4-1.4 0l-2.8 2.8-1.4-1.4c-.4-.4-1-.4-1.4 0l-2.8 2.8c-.4.4-.4 1 0 1.4l3.3 3.3c.4.4 1 .4 1.4 0l2.8-2.8 1.4 1.4c.4.4 1 .4 1.4 0l2.8-2.8c.4-.4.4-1 0-1.4zm-14-1C7.1 10 6 8.9 6 7.5S7.1 5 8.5 5 11 6.1 11 7.5 9.9 10 8.5 10zm-4-8C2.5 2 1 3.5 1 5.5S2.5 9 4.5 9 8 7.5 8 5.5 6.5 2 4.5 2zm18 18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-4h20v4zm-16-1.5c0-.8-.7-1.5-1.5-1.5S2 17.7 2 18.5 2.7 20 3.5 20 5 19.3 5 18.5z"/></svg>',
            iconBg: "#e3f2fd",
            link: "#"
        },
        {
            id: "ppt",
            title: "AI PPT",
            description: "输入主题，快速生成专业演示",
            icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#d84315" d="M3 3h18v18H3z" opacity=".3"/><path fill="#d84315" d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>',
            iconBg: "#fbe9e7",
            link: "#"
        },
        {
            id: "emoji",
            title: "自制表情包",
            description: "个性化形象，搞笑配文生成",
            icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#f57c00" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>',
            iconBg: "#fff3e0",
            link: "#"
        },
        {
            id: "guzi",
            title: "AI 谷子",
            description: "二次元周边设计，同人图生成",
            icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#8e24aa" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2ZM20 22.51V24H4V22.51H20Z"/></svg>',
            iconBg: "#f3e5f5",
            link: "#"
        },
        {
            id: "photo",
            title: "AI 证件照",
            description: "一键换底换装，生成最美证件照",
            icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="#0097a7" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm11 8h-9v-2h9v2zm0-4h-9v-2h9v2zm0-4h-9V7h9v2z"/></svg>',
            iconBg: "#e0f7fa",
            link: "#"
        }
    ],

    // ==================== 灵感广场Tab配置 ====================
    inspirationTabs: [
        { id: "tab-comic", text: "漫剧", active: true },
        { id: "tab-novel", text: "小说", active: false },
        { id: "tab-ad", text: "解说视频", active: false },
        { id: "tab-photo", text: "提示词提取", active: false },
        { id: "tab-ppt", text: "AI PPT", active: false },
        { id: "tab-emoji", text: "自制表情包", active: false },
        { id: "tab-guzi", text: "AI谷子", active: false },
        { id: "tab-pet", text: "AI证件照", active: false }
    ],

    // ==================== 灵感广场作品数据 ====================
    inspirationWorks: [
        { id: 1, title: "赛博朋克风女战士", height: "120%", bgColor: "#eceff1", category: "tab-comic" },
        { id: 2, title: "小说《星辰》推广图", height: "75%", bgColor: "#cfd8dc", category: "tab-novel" },
        { id: 3, title: "悬疑漫剧分镜#1", height: "150%", bgColor: "#b0bec5", category: "tab-comic" },
        { id: 4, title: "极简产品海报", height: "100%", bgColor: "#90a4ae", category: "tab-ad" }
    ],

    // ==================== 如何赚钱配置 ====================
    moneyGuide: {
        floatingButton: {
            icon: '<svg viewBox="0 0 24 24" width="32" height="32"><path fill="#fff" d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>',
            text: "如何赚钱"
        },
        modalTitle: "创作者变现指南",
        tabs: [
            { id: "m-comic", text: "漫剧/小说", active: true },
            { id: "m-ad", text: "推广素材", active: false },
            { id: "m-other", text: "其他特色功能", active: false }
        ],
        content: {
            "m-comic": [
                {
                    title: "平台内分成（阅读/打赏）",
                    description: "在平台内发布您的漫剧和小说，开启付费章节或接受读者打赏，享受高比例收益分成。"
                },
                {
                    title: "多平台分发赚收益",
                    description: "将生成的漫剧视频导出至抖音、快手、B站等短视频平台，通过视频播放量、接商单变现。"
                },
                {
                    title: "小说推文授权",
                    description: "通过平台专属链接生成推文授权，在外部平台引流，新用户充值可获最高60%佣金。"
                }
            ],
            "m-ad": [
                {
                    title: "接取官方悬赏任务",
                    description: "在任务大厅接取品牌方发布的素材制作需求，提交被采纳后直接获得现金奖励（通常单条50-500元不等）。"
                },
                {
                    title: "出售通用模板",
                    description: "制作高质量、高转化的推广视频模板，上架平台模板库，其他用户使用您的模板将为您带来持续的分成收益。"
                }
            ],
            "m-other": [
                {
                    title: "代做服务（电商/闲鱼等）",
                    description: "利用AI证件照、智能修图、AI PPT等功能，在电商平台或二手交易平台开设店铺，提供代做服务接单赚差价。"
                },
                {
                    title: "周边定制售卖",
                    description: "使用「AI谷子」、「自制表情包」生成二次元周边或创意图，联系厂家定制实体商品（如钥匙扣、立牌、手机壳等）进行售卖。"
                },
                {
                    title: "宠物账号运营",
                    description: "利用「AI宠物翻译器」生成有趣图文，运营宠物垂类自媒体账号，通过接广告、带货变现。"
                }
            ]
        }
    },

    // ==================== 创作点规则配置 ====================
    pointsRules: {
        modalTitle: "创作点规则",
        sections: [
            {
                title: "1. 什么是创作点？",
                content: "创作点是智创平台内的通用消耗型资产。您在使用平台提供的AI创作功能（如漫剧生成、智能修图、AI提示词提取等）时，将根据不同功能消耗相应数量的创作点。"
            },
            {
                title: "2. 如何获取创作点？",
                content: "",
                list: [
                    { label: "每日签到：", text: "每天登录平台并签到，可免费领取基础创作点（每日限1次）。" },
                    { label: "账号充值：", text: "在账户管理页面通过充值购买不同额度的创作点套餐。" },
                    { label: "活动奖励：", text: "参与平台不定期举办的创作挑战赛或推广活动可获得奖励点数。" }
                ]
            },
            {
                title: "3. 创作点消耗标准",
                content: "",
                list: [
                    { label: "图片生成：", text: "普通画质 2点/张，高清画质 5点/张。" },
                    { label: "视频生成：", text: "漫剧/解说视频基础消耗 10点/分钟。" },
                    { label: "文本生成：", text: "小说续写、提示词提取等 1点/次。" }
                ]
            },
            {
                title: "4. 补充说明",
                content: "创作点一旦充值成功，不予退款或转让。若账号被封禁，账号内剩余的创作点将被清零。系统将优先消耗有有效期的赠送点数，再消耗充值的永久点数。"
            }
        ]
    },

    // ==================== 充值配置 ====================
    recharge: {
        modalTitle: "创作点充值",
        packages: [
            { points: 490, price: 7, bonus: 0 },
            { points: 1400, price: 20, bonus: 0 },
            { points: 2100, price: 30, bonus: 0 },
            { points: 3500, price: 50, bonus: 100 },
            { points: 7000, price: 100, bonus: 100 },
            { points: 14000, price: 200, bonus: 100 }
        ],
        tips: '温馨提示：购买的创作点有效期为1年，客服邮箱：<a href="mailto:xxx@360.cn" style="color: var(--text-muted); text-decoration: underline;">xxx@360.cn</a>',
        buttonText: "购买创作点",
        activityBadge: "限时活动" // 设为空字符串则不显示活动角标
    },

    // ==================== 作品详情弹窗配置 ====================
    workDetail: {
        modalTitle: "作品详情",
        defaultWork: {
            title: "赛博朋克风女战士",
            tags: ["漫剧创作", "二次元"],
            promptTitle: "创作提示词",
            prompt: "一个拥有机械义肢的女性战士，赛博朋克城市背景，霓虹灯光，雨夜，高细节，8k分辨率，电影级光影，机甲风...",
            ctaText: "喜欢这个风格？立即使用相同参数生成你的作品！",
            buttonText: "一键同款创作"
        }
    }
};

// 导出配置（支持模块化引入）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
