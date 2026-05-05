import { useState, useRef, useEffect, useCallback } from "react"
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useI18n, type Locale } from "@/lib/i18n"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const EMAIL = "15322390847@163.com"
const WECHAT = "18689485626"
const GITHUB = "https://github.com/oliver-Lee668"

// Bilingual response engine
function generateResponse(input: string, locale: Locale): string {
  const lower = input.toLowerCase()
  const isEn = locale === "en"

  // Greetings
  if (/^(你好|hi|hello|hey|嗨|喂|greetings)/.test(lower)) {
    return isEn
      ? `Hi! 👋 I'm Li Li's AI assistant. I can help you learn about his project experience, tech skills, and collaboration options.\n\nTry asking me:\n• What projects has Li Li done?\n• What's his tech stack?\n• How to contact / collaborate?`
      : `你好！👋 我是李立的 AI 助手。我可以帮你了解李立的项目经验、技术能力和合作方式。\n\n你可以试试问我：\n• 做过哪些项目？\n• 技术栈有哪些？\n• 怎么联系/合作？`
  }

  // About projects
  if (/项目|作品|案例|做过什么|portfolio|project|work/.test(lower)) {
    return isEn
      ? `Li Li has completed 2 core AI projects:\n\n🤖 **AI Customer Service**\nAn LLM-based intelligent customer service system supporting multi-turn dialogue, intent recognition, and sentiment analysis. Boosted efficiency by 300% and satisfaction by 40%. Tech: LLM, RAG, React, Node.js, Python, Vector DB. Handles 100K+ daily conversations, saving 80% labor costs.\n\n💼 **AI Sales Assistant**\nAn AI-driven sales enablement platform with smart lead scoring, script recommendations, and customer profiling. Boosted sales by 200%. Tech: GPT-4, Python, React, PostgreSQL, LangChain.\n\nBoth projects have demo videos — scroll to the Projects section to watch!`
      : `李立目前完成了 2 个核心 AI 项目：\n\n🤖 **AI 智能客服**\n基于大语言模型的智能客服系统，支持多轮对话、意图识别、情感分析。帮助企业客服效率提升300%，客户满意度提高40%。技术栈：LLM、RAG、React、Node.js、Python、向量数据库。日均处理10万+对话，节省80%人工成本。\n\n💼 **AI 销售助手**\nAI驱动的智能销售赋能平台，通过智能线索评分、话术推荐、客户画像分析等功能帮助销售团队业绩提升200%。技术栈：GPT-4、Python、React、PostgreSQL、LangChain。\n\n两个项目都有演示视频，你可以滚动到"项目作品"区域查看详情。`
  }

  // AI customer service
  if (/客服|customer service/.test(lower)) {
    return isEn
      ? `🤖 **AI Customer Service System**\n\nAn intelligent customer service system built on LLMs with multi-turn dialogue, intent recognition, and sentiment analysis.\n\nKey highlights:\n• 95%+ contextual understanding accuracy\n• Enterprise RAG knowledge base, sub-second response\n• Real-time sentiment analysis with smart human handoff\n• 100K+ daily conversations, 80% labor cost savings\n\nClick "Demo Video" on the page to see it in action!`
      : `🤖 **AI 智能客服系统**\n\n基于大语言模型的智能客服系统，支持多轮对话、意图识别、情感分析。\n\n核心亮点：\n• 多轮对话上下文理解，准确率达95%+\n• 企业知识库 RAG 检索增强，秒级响应\n• 实时情感分析与智能转人工\n• 日均处理10万+对话，节省80%人工成本\n\n点击页面中的"演示视频"可以看到实际效果！`
  }

  // AI sales assistant
  if (/销售|sales/.test(lower)) {
    return isEn
      ? `💼 **AI Sales Assistant**\n\nAn AI-driven sales enablement platform with lead scoring, script recommendations, and customer profiling.\n\nKey highlights:\n• AI-powered lead scoring for high-value customers\n• Real-time script recommendations for better conversion\n• Auto-generated customer profiles for precision marketing\n• Sales dashboard with AI-driven revenue forecasting\n\nA truly effective AI product for sales teams!`
      : `💼 **AI 销售助手**\n\nAI驱动的智能销售赋能平台，通过智能线索评分、话术推荐、客户画像分析等功能帮助销售团队业绩提升200%。\n\n核心亮点：\n• AI 智能线索评分，优先跟进高价值客户\n• 实时话术推荐，提升成交转化率\n• 客户画像自动生成，精准营销触达\n• 销售数据看板，AI 驱动业绩预测\n\n这是一款真正帮助销售团队提效的 AI 产品！`
  }

  // Skills / tech stack
  if (/技术|技能|skill|stack|会什么|能力|擅长|tech/.test(lower)) {
    return isEn
      ? `Li Li has a comprehensive tech stack:\n\n🧠 **AI**: LLM/GPT/Claude, RAG, Prompt Engineering, LangChain/LlamaIndex, Vector DB\n\n💻 **Frontend**: React/Next.js, TypeScript, TailwindCSS, Vue.js, Mini Programs\n\n⚙️ **Backend**: Node.js/Python, Go/Java, RESTful API, Microservices, Docker/K8s\n\n🗄️ **Data**: PostgreSQL/MySQL, Redis/MongoDB, Elasticsearch, Pinecone/Milvus\n\nThis means Li Li can independently deliver projects from product planning to technical implementation.`
      : `李立的技术栈非常全面：\n\n🧠 **AI 技术**：LLM/GPT/Claude、RAG检索增强、Prompt Engineering、LangChain/LlamaIndex、向量数据库\n\n💻 **前端**：React/Next.js、TypeScript、TailwindCSS、Vue.js、微信小程序\n\n⚙️ **后端**：Node.js/Python、Go/Java、RESTful API、微服务架构、Docker/K8s\n\n🗄️ **数据**：PostgreSQL/MySQL、Redis/MongoDB、Elasticsearch、Pinecone/Milvus\n\n这意味着李立可以独立承接从产品规划到技术实现的完整项目交付。`
  }

  // Cooperation
  if (/合作|兼职|外包|雇|招|hire|work|价格|费用|报价|collaborat|freelance/.test(lower)) {
    return isEn
      ? `Li Li is open for collaboration in the following ways:\n\n📦 **Project Outsourcing** — End-to-end AI project delivery, from requirements to production\n\n🎯 **Tech Consulting** — Technical consulting and solution design for AI transformation\n\n💻 **Remote Freelance** — Long-term project participation as a freelance contributor\n\nFor details and pricing, reach out via email or WeChat. Usually replies within 24 hours.`
      : `李立目前开放合作，支持以下方式：\n\n📦 **项目外包** - 承接 AI 相关项目的完整交付，从需求分析到上线运维\n\n🎯 **技术顾问** - 为企业 AI 转型提供技术咨询和方案设计\n\n💻 **远程兼职** - 以兼职形式参与长期项目的开发和维护\n\n具体合作细节和报价可以通过邮件或微信沟通，李立通常24小时内回复。`
  }

  // Contact info
  if (/联系|contact|邮箱|email|微信|wechat|github/.test(lower)) {
    return isEn
      ? `📬 Contact Information:\n\n📧 Email: ${EMAIL}\n💬 WeChat: ${WECHAT}\n🔗 GitHub: ${GITHUB}\n\nUsually replies within 24 hours. You can also scroll to the Contact section to send an email directly.`
      : `📬 联系方式：\n\n📧 邮箱：${EMAIL}\n💬 微信：${WECHAT}\n🔗 GitHub：${GITHUB}\n\n通常24小时内回复。你也可以滚动到页面底部的"联系我"区域直接发送邮件。`
  }

  // Who is Li Li
  if (/谁|who|介绍|关于|about|了解/.test(lower)) {
    return isEn
      ? `👤 **About Li Li**\n\nAI Product Manager & Full-Stack Engineer with 6+ years of experience. Currently leading AI project delivery and software development at his company.\n\nCore advantage: combines product thinking with technical capability — defining requirements from a product perspective while implementing them technically.\n\n20+ projects delivered, 5+ AI projects, 100% client satisfaction.`
      : `👤 **关于李立**\n\nAI 产品经理 & 全栈工程师，拥有6年+项目经验。目前在公司主要负责 AI 项目的落地和软件系统的开发。\n\n核心优势是同时具备产品思维和技术能力，能从产品维度定义需求，也能从技术维度实现落地。\n\n已成功交付20+个项目，其中AI项目5+个，客户好评率100%。`
  }

  // Experience
  if (/经验|经历|工作|背景|experience|career|history/.test(lower)) {
    return isEn
      ? `📋 **Work Experience**\n\n**2022 - Present: AI Product Manager & Tech Lead**\nLed the company's AI product portfolio, building AI Customer Service and AI Sales Assistant from scratch.\n\n**2019 - 2022: Senior Full-Stack Engineer**\nEnterprise SaaS architecture and core development, leading a team of 5 on key projects.\n\n6+ years experience, 20+ projects delivered.`
      : `📋 **工作经历**\n\n**2022 - 至今：AI 产品经理 & 技术负责人**\n主导公司 AI 产品矩阵的规划与落地，从0到1打造了 AI 智能客服和 AI 销售助手两款核心产品。\n\n**2019 - 2022：高级全栈工程师**\n负责企业级 SaaS 产品的架构设计与核心开发，带领5人技术团队完成多个关键项目。\n\n总计6年+项目经验，交付20+个项目。`
  }

  // Default
  return isEn
    ? `Thanks for your question! I can answer about:\n\n• 🤖 **Projects** — AI Customer Service, AI Sales Assistant\n• 💻 **Tech Skills** — AI, Frontend, Backend, Database\n• 🤝 **Collaboration** — Outsourcing, Consulting, Freelance\n• 📬 **Contact** — Email, WeChat, GitHub\n• 👤 **Background** — Experience, Skills\n\nFeel free to ask!`
    : `感谢你的提问！我可以回答关于李立的以下话题：\n\n• 🤖 **项目案例** - AI 智能客服、AI 销售助手\n• 💻 **技术能力** - AI、前端、后端、数据库\n• 🤝 **合作方式** - 外包、顾问、兼职\n• 📬 **联系方式** - 邮箱、微信\n• 👤 **个人背景** - 经历、能力\n\n你可以直接问我相关问题！`
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { t, locale } = useI18n()

  const quickQuestions = locale === "zh"
    ? ["做过哪些项目？", "技术栈有哪些？", "怎么合作？", "联系方式"]
    : ["What projects?", "Tech stack?", "Collaborate?", "Contact info"]

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset messages when language changes or first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: t("chat.welcome"),
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length, t])

  // Reset conversation on language change
  useEffect(() => {
    if (messages.length > 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: t("chat.welcome"),
          timestamp: new Date(),
        },
      ])
    }
    // Only trigger on locale change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 800))

    const response = generateResponse(text, locale)
    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, aiMsg])
    setIsTyping(false)
  }, [locale])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  // Parse simple markdown bold
  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center transition-smooth shadow-lg",
          isOpen
            ? "bg-secondary border border-border/50 hover:bg-secondary/80"
            : "gradient-primary shadow-glow hover:shadow-glow-lg animate-chat-bounce"
        )}
        aria-label="AI Assistant"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <MessageCircle className="h-5 w-5 text-primary-foreground" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] rounded-2xl border border-border/50 bg-card shadow-lg overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border/50 gradient-card">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{t("chat.title")}</div>
                <div className="text-xs text-muted-foreground">{t("chat.subtitle")}</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[380px] overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2.5",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary/60 text-secondary-foreground rounded-bl-md"
                  )}
                >
                  {msg.role === "assistant" ? renderContent(msg.content) : msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="shrink-0 h-7 w-7 rounded-full bg-secondary flex items-center justify-center mt-0.5">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-secondary/60 flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{t("chat.thinking")}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 text-xs rounded-full border border-border/50 bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-fast"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 border-t border-border/50 flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-fast"
              disabled={isTyping}
            />
            <Button
              type="submit"
              variant="premium"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="shrink-0 h-9 w-9 rounded-lg"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}