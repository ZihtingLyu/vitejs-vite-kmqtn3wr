import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, MessageSquare, BarChart3, Settings, Search, Bell, Menu, X, 
  Star, Filter, Download, MoreVertical, AlertCircle, Clock, CheckCircle2, 
  Tag, AtSign, Building2, Trash2, Edit3, Users, User, Shield, Zap, CalendarClock,
  Store, PieChart, TrendingUp, ChevronDown, ArrowLeft, Plus, PlayCircle, Mail, PlusCircle, RefreshCw, Save
} from 'lucide-react';

// --- 模擬 Shadcn UI 元件 ---

const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return <button className={`${baseStyle} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>{children}</button>;
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    destructive: "border-transparent bg-red-100 text-red-700 hover:bg-red-100/80",
    outline: "text-slate-950 border-slate-200",
    system: "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-100/80",
    personal: "border-transparent bg-purple-100 text-purple-700 hover:bg-purple-100/80",
    warning: "border-transparent bg-amber-100 text-amber-700 hover:bg-amber-100/80",
    success: "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80",
  };
  return <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant] || variants.default} ${className}`}>{children}</div>;
}

const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`} {...props}>{children}</div>
);

const Input = ({ className = '', ...props }) => (
  <input className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

const Checkbox = ({ id, checked, onChange, className = '' }) => (
  <input type="checkbox" id={id} checked={checked} onChange={onChange} className={`h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer ${className}`} />
);

const Label = ({ children, className = '' }) => (
  <label className={`text-sm font-semibold text-slate-700 ${className}`}>{children}</label>
);

// --- 模擬資料 ---

const MOCK_REVIEWS = [
  {
    id: 'REV-001', author: '王大明', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=王大明', rating: 1, date: '10 分鐘前', branch: '旭集 台北信義店',
    text: '昨天去吃晚餐，生魚片好像不太新鮮，回家之後一直拉肚子。而且跟服務生反應，態度也有點冷淡，很失望的體驗。附上當時拍的照片。',
    isEdited: false, isDeleted: false, status: 'unreplied', systemTags: ['食安疑慮', '客訴'], personalTags: ['緊急處理'], concurrencyUser: '林區經理',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 'REV-002', author: '陳欣宜', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=陳欣宜', rating: 5, date: '2 小時前', branch: '饗食天堂 台中大遠百店',
    text: '服務人員小美態度超好！看到我們有帶小孩，主動幫忙拿兒童餐具和濕紙巾，餐點選擇也很多，會再回訪！',
    isEdited: true, isDeleted: false, status: 'replied', systemTags: ['服務優良'], personalTags: [], concurrencyUser: null,
    replyText: '親愛的陳欣宜您好，非常感謝您的蒞臨與讚美！小美收到您的鼓勵一定會非常開心。期待很快能再次為您與您的家人服務！',
    history: [
      { date: '1 天前', rating: 4, text: '餐點選擇很多，服務人員看到我們有帶小孩，主動幫忙拿兒童餐具和濕紙巾，會再回訪！' },
      { date: '2 天前', rating: 3, text: '餐點選擇很多，但服務還有進步空間。' }
    ],
    media: [
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 'REV-003', author: 'Google User', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GU', rating: 3, date: '1 天前', branch: '饗饗 微風信義店',
    text: '風景很好，氣氛佳。但牛排煎得有點太老了，甜點表現普普。以這個價位來說覺得 CP 值一般。',
    isEdited: false, isDeleted: true, status: 'unreplied', systemTags: ['餐點品質'], personalTags: ['草稿', '待主管確認'], concurrencyUser: null
  }
];

// --- 頁面模組組件 ---

const DashboardView = () => {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('本月');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-wrap items-center gap-4">
        <select className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm w-48"><option>所有品牌</option><option>旭集</option><option>饗食天堂</option></select>
        <select className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm w-48"><option>所有分店</option><option>台北信義店</option></select>
        
        <div className="relative ml-auto">
          <Button 
            variant="secondary" 
            className="gap-2 text-slate-700"
            onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
          >
            <CalendarClock size={16} className="text-slate-500" /> 
            {selectedRange}
            <ChevronDown size={14} className={`ml-1 text-slate-400 transition-transform ${isDateRangeOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {isDateRangeOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsDateRangeOpen(false)}></div>
              <div className="absolute top-full mt-2 right-0 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-xs font-bold text-slate-500 mb-3 tracking-wider">快速選擇</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['今天', '昨天', '過去 7 天', '過去 30 天', '本月', '上個月'].map(range => (
                    <Button 
                      key={range} 
                      variant={selectedRange === range ? 'blue' : 'outline'} 
                      size="sm" 
                      className={`text-xs h-8 ${selectedRange === range ? '' : 'text-slate-600 bg-white'}`}
                      onClick={() => { setSelectedRange(range); setIsDateRangeOpen(false); }}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
                <div className="h-px bg-slate-100 mb-4 -mx-4"></div>
                <div className="text-xs font-bold text-slate-500 mb-3 tracking-wider">自訂區間</div>
                <div className="flex items-center gap-2 mb-4">
                  <Input type="date" className="h-9 text-xs px-2 w-full text-slate-600 bg-slate-50" />
                  <span className="text-slate-400">-</span>
                  <Input type="date" className="h-9 text-xs px-2 w-full text-slate-600 bg-slate-50" />
                </div>
                <Button size="sm" variant="blue" className="w-full" onClick={() => setIsDateRangeOpen(false)}>套用自訂區間</Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-red-200 bg-red-50/50 hover:bg-red-50 cursor-pointer transition-colors group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div><p className="text-sm font-medium text-red-600">嚴重客訴數量</p><h3 className="text-3xl font-bold text-slate-900 mt-2">12</h3></div>
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform"><AlertCircle size={20}/></div>
          </div>
          <p className="text-sm text-slate-500 mt-4 flex items-center gap-1">點擊前往處理 <ChevronDown size={14} className="-rotate-90"/></p>
        </Card>
        
        <Card className="p-6 border-amber-200 bg-amber-50/50 hover:bg-amber-50 cursor-pointer transition-colors group flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div><p className="text-sm font-medium text-amber-600">待回覆評論 (1~3星)</p><h3 className="text-3xl font-bold text-slate-900 mt-2">48</h3></div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform"><Clock size={20}/></div>
            </div>
            {/* 各星等數量分佈 */}
            <div className="flex gap-2 mt-3">
              <span className="flex items-center text-[11px] font-medium text-amber-800 bg-amber-100/50 px-1.5 py-0.5 rounded border border-amber-200/50">
                <Star size={10} className="mr-1 fill-amber-500 text-amber-500"/> 1星: 15
              </span>
              <span className="flex items-center text-[11px] font-medium text-amber-800 bg-amber-100/50 px-1.5 py-0.5 rounded border border-amber-200/50">
                <Star size={10} className="mr-1 fill-amber-500 text-amber-500"/> 2星: 12
              </span>
              <span className="flex items-center text-[11px] font-medium text-amber-800 bg-amber-100/50 px-1.5 py-0.5 rounded border border-amber-200/50">
                <Star size={10} className="mr-1 fill-amber-500 text-amber-500"/> 3星: 21
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4 flex items-center gap-1">點擊前往處理 <ChevronDown size={14} className="-rotate-90"/></p>
        </Card>

        <Card className="p-6 border-blue-200 bg-blue-50/50 hover:bg-blue-50 cursor-pointer transition-colors group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div><p className="text-sm font-medium text-blue-600">昨日新增評論</p><h3 className="text-3xl font-bold text-slate-900 mt-2">156</h3></div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><MessageSquare size={20}/></div>
          </div>
          <p className="text-sm text-slate-500 mt-4 flex items-center gap-1">點擊查看詳情 <ChevronDown size={14} className="-rotate-90"/></p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2"><BarChart3 size={18} className="text-slate-500"/> 評分分佈統計</h3>
            <div className="text-2xl font-bold text-slate-900 flex items-center gap-1.5">
              4.6 <Star size={20} className="fill-amber-400 text-amber-400" />
            </div>
          </div>
          
          <div className="space-y-4 flex-1 justify-center flex flex-col">
            {[
              { stars: 5, percentage: 72, count: '1,240', color: 'bg-emerald-400' },
              { stars: 4, percentage: 18, count: '310', color: 'bg-emerald-300' },
              { stars: 3, percentage: 6, count: '105', color: 'bg-amber-300' },
              { stars: 2, percentage: 3, count: '52', color: 'bg-amber-400' },
              { stars: 1, percentage: 1, count: '18', color: 'bg-red-400' },
            ].map((item) => (
              <div key={item.stars} className="flex items-center gap-4 group">
                <div className="flex items-center justify-end gap-1 w-10 shrink-0 text-sm font-bold text-slate-700">
                  {item.stars} <Star size={14} className="fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full group-hover:opacity-80 transition-opacity`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-sm font-medium text-slate-500">{item.count}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
            <span>總評論數：1,725 則</span>
            <span className="text-emerald-600 font-medium flex items-center gap-1"><TrendingUp size={14}/> +12% (較上月)</span>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-slate-500"/> 品牌評論排行榜</h3>
          <div className="space-y-4">
            {['旭集', '饗食天堂', '果然匯', '饗饗'].map((brand, i) => (
              <div key={brand} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${i===0?'bg-amber-100 text-amber-700':i===1?'bg-slate-200 text-slate-700':i===2?'bg-amber-50 text-amber-800':'bg-slate-100 text-slate-500'}`}>
                    {i+1}
                  </div>
                  <span className="font-medium text-slate-700">{brand}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right"><p className="text-sm font-bold">{4.9 - i*0.2}</p><p className="text-xs text-slate-500">平均星等</p></div>
                  <div className="text-right"><p className="text-sm font-bold">{1200 - i*150}</p><p className="text-xs text-slate-500">評論數</p></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const AnalyticsView = () => {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('過去 30 天');

  const mockAnalyticsReviews = [
    { id: 1, branch: '旭集 台北信義店', reviewer: '王大明', content: '昨天去吃晚餐，生魚片好像不太新鮮，回家之後一直拉肚子。而且跟服務生反應，態度也有點冷淡...', rating: 1, isIgnored: false, reviewTime: '2026-05-06 10:23', replyContent: '', replyTime: '', agent: '' },
    { id: 2, branch: '饗食天堂 台中大遠百店', reviewer: '陳欣宜', content: '服務人員小美態度超好！看到我們有帶小孩，主動幫忙拿兒童餐具和濕紙巾，餐點選擇也很多，會再回訪！', rating: 5, isIgnored: false, reviewTime: '2026-05-05 14:30', replyContent: '親愛的陳欣宜您好，非常感謝您的蒞臨與讚美！小美收到您的鼓勵一定會非常開心。期待很快能再次為您與您的家人服務！', replyTime: '2026-05-05 16:15', agent: '客服小王' },
    { id: 3, branch: '饗饗 微風信義店', reviewer: 'Google User', content: '風景很好，氣氛佳。但牛排煎得有點太老了，甜點表現普普。以這個價位來說覺得 CP 值一般。', rating: 3, isIgnored: false, reviewTime: '2026-05-04 18:45', replyContent: '', replyTime: '', agent: '' },
    { id: 4, branch: '果然匯 台北明曜店', reviewer: '林阿公', content: '測試留言，不具意義的亂碼。', rating: 1, isIgnored: true, reviewTime: '2026-05-02 12:00', replyContent: '', replyTime: '', agent: '' },
    { id: 5, branch: '旭集 台北天母店', reviewer: '張小姐', content: '食材新鮮，動線規劃得很好，下次還會再來！', rating: 5, isIgnored: false, reviewTime: '2026-05-01 19:20', replyContent: '親愛的張小姐您好，感謝您的支持！期待下次再為您服務。', replyTime: '2026-05-02 09:10', agent: '林區經理' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        
        {/* 日期選擇器 */}
        <div className="relative">
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-2 text-slate-700"
            onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
          >
            <CalendarClock size={14} className="text-slate-500" /> 
            統計區間：{selectedRange}
            <ChevronDown size={14} className={`ml-1 text-slate-400 transition-transform ${isDateRangeOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {isDateRangeOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsDateRangeOpen(false)}></div>
              <div className="absolute top-full mt-2 left-0 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-xs font-bold text-slate-500 mb-3 tracking-wider">快速選擇</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['今天', '昨天', '過去 7 天', '過去 30 天', '本月', '上個月'].map(range => (
                    <Button 
                      key={range} 
                      variant={selectedRange === range ? 'blue' : 'outline'} 
                      size="sm" 
                      className={`text-xs h-8 ${selectedRange === range ? '' : 'text-slate-600 bg-white'}`}
                      onClick={() => { setSelectedRange(range); setIsDateRangeOpen(false); }}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
                <div className="h-px bg-slate-100 mb-4 -mx-4"></div>
                <div className="text-xs font-bold text-slate-500 mb-3 tracking-wider">自訂區間</div>
                <div className="flex items-center gap-2 mb-4">
                  <Input type="date" className="h-9 text-xs px-2 w-full text-slate-600 bg-slate-50" />
                  <span className="text-slate-400">-</span>
                  <Input type="date" className="h-9 text-xs px-2 w-full text-slate-600 bg-slate-50" />
                </div>
                <Button size="sm" variant="blue" className="w-full" onClick={() => setIsDateRangeOpen(false)}>套用自訂區間</Button>
              </div>
            </>
          )}
        </div>

        <select className="h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none">
          <option value="">所有品牌</option>
        </select>
        <select className="h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none">
          <option value="">所有分店</option>
        </select>

        {/* 在數據分析的專屬工具列中加入顯眼的「匯出報表」按鈕 */}
        <Button variant="blue" size="sm" className="ml-auto gap-2 shadow-sm">
          <Download size={14} /> 匯出報表
        </Button>
      </div>

      <Card>
        <div className="border-b border-slate-200 p-4">
          <h3 className="font-semibold text-lg flex items-center gap-2"><Store size={18} className="text-slate-500"/> 評論數據分析列表</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium">地標名稱</th>
                <th className="px-6 py-3 font-medium">評論者名稱</th>
                <th className="px-6 py-3 font-medium min-w-[250px] max-w-[300px]">評論內容</th>
                <th className="px-6 py-3 font-medium">星等</th>
                <th className="px-6 py-3 font-medium text-center">是否忽略</th>
                <th className="px-6 py-3 font-medium">評論時間</th>
                <th className="px-6 py-3 font-medium min-w-[250px] max-w-[300px]">回覆內容</th>
                <th className="px-6 py-3 font-medium">回覆時間</th>
                <th className="px-6 py-3 font-medium">客服專員</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAnalyticsReviews.map(row => (
                <tr key={row.id} className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.branch}</td>
                  <td className="px-6 py-4">{row.reviewer}</td>
                  <td className="px-6 py-4">
                    <div className="truncate max-w-[250px] text-slate-600" title={row.content}>{row.content}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-amber-400 text-amber-400 shrink-0" />
                      <span className="font-medium text-slate-700">{row.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.isIgnored ? (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-normal">已忽略</Badge>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{row.reviewTime}</td>
                  <td className="px-6 py-4">
                    {row.replyContent ? (
                      <div className="truncate max-w-[250px] text-slate-600" title={row.replyContent}>{row.replyContent}</div>
                    ) : (
                      <span className="text-slate-300">尚未回覆</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{row.replyTime || '-'}</td>
                  <td className="px-6 py-4">{row.agent || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const SettingsView = () => {
  const [activeSettingTab, setActiveSettingTab] = useState(null);
  const [activeTagCategory, setActiveTagCategory] = useState('system');
  const [selectedBranches, setSelectedBranches] = useState(['旭集 台北信義店', '饗食天堂 台中大遠百店']);
  const [showAutomationForm, setShowAutomationForm] = useState(false);
  const [editingAutomationRule, setEditingAutomationRule] = useState(null);
  const [conditionMatchType, setConditionMatchType] = useState('all');
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [isAgentFormOpen, setIsAgentFormOpen] = useState(false); 
  const [editingAgent, setEditingAgent] = useState(null); 
  
  // 群組管理表單狀態與資料
  const [isGroupFormOpen, setIsGroupFormOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [selectedGroupPermissions, setSelectedGroupPermissions] = useState([]);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  // 新增：群組管理的狀態化資料 (包含預設群組)
  const [groupsData, setGroupsData] = useState([
    { id: 'g_cs', name: '第一線客服專員', desc: '負責處理所有品牌的第一線一般客訴與例行性回覆。', members: 15, isDefault: true, permissions: ['reviews_view', 'reviews_reply'], assignedUsers: ['u1'] },
    { id: 'g_analyst', name: '營運分析師', desc: '負責檢視儀表板與匯出數據報表，無回覆權限。', members: 5, isDefault: true, permissions: ['dashboard_view', 'analytics_view', 'analytics_export'], assignedUsers: [] },
    { id: 'g_sysAdmin', name: '系統管理員', desc: '擁有系統所有模組的最高權限。', members: 2, isDefault: true, permissions: ['dashboard_view', 'reviews_view', 'reviews_reply', 'reviews_delete', 'analytics_view', 'analytics_export', 'settings_view', 'settings_manage'], assignedUsers: ['u2'] },
    { id: 'g_custom1', name: '北區營運處', desc: '負責北區各分店的重大客訴處理與營運檢討。', members: 8, isDefault: false, permissions: ['dashboard_view', 'reviews_view', 'reviews_reply'], assignedUsers: [] },
  ]);

  // 新增：權限模組清單設定
  const permissionModules = [
    { id: 'mod_dashboard', label: '營運儀表板', options: [{ id: 'dashboard_view', label: '檢視儀表板數據' }] },
    { id: 'mod_reviews', label: '評論管理', options: [{ id: 'reviews_view', label: '檢視所有評論' }, { id: 'reviews_reply', label: '發佈與編輯回覆' }, { id: 'reviews_delete', label: '刪除歷史回覆' }] },
    { id: 'mod_analytics', label: '數據分析', options: [{ id: 'analytics_view', label: '檢視分析報表' }, { id: 'analytics_export', label: '匯出數據報表' }] },
    { id: 'mod_settings', label: '系統設定', options: [{ id: 'settings_view', label: '檢視系統設定' }, { id: 'settings_manage', label: '進階管理 (人員/群組/自動化)' }] }
  ];

  // 處理開啟群組表單
  const handleOpenGroupForm = (group = null) => {
    setEditingGroup(group);
    setSelectedGroupPermissions(group ? group.permissions : []);
    setSelectedGroupMembers(group ? group.assignedUsers : []);
    setIsGroupFormOpen(true);
  };

  const toggleGroupPermission = (permId) => {
    setSelectedGroupPermissions(prev => prev.includes(permId) ? prev.filter(id => id !== permId) : [...prev, permId]);
  };

  const toggleGroupMember = (userId) => {
    setSelectedGroupMembers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  const handleSaveGroup = () => {
    const name = document.getElementById('group-name-input').value;
    const desc = document.getElementById('group-desc-input').value;
    if (!name.trim()) return;

    if (editingGroup) {
      setGroupsData(groupsData.map(g => g.id === editingGroup.id ? { ...g, name: editingGroup.isDefault ? g.name : name, desc, permissions: selectedGroupPermissions, assignedUsers: selectedGroupMembers, members: selectedGroupMembers.length || g.members } : g));
    } else {
      setGroupsData([...groupsData, { id: `g_${Date.now()}`, name, desc, members: selectedGroupMembers.length, isDefault: false, permissions: selectedGroupPermissions, assignedUsers: selectedGroupMembers }]);
    }
    setIsGroupFormOpen(false);
  };

  // 新增：動態表單條件與動作的狀態
  const [ruleConditions, setRuleConditions] = useState([{ id: 1, field: '', operator: '', value: '' }]);
  const [ruleActions, setRuleActions] = useState([{ id: 1, type: '', target: '' }]);

  // 新增：標籤管理的狀態化
  const [systemTags, setSystemTags] = useState([
    { id: 's1', name: '食安疑慮', desc: '涉及食品安全衛生的客訴', usage: 142 },
    { id: 's2', name: '服務優良', desc: '稱讚人員態度', usage: 853 },
  ]);
  const [personalTags, setPersonalTags] = useState([
    { id: 'p1', name: '緊急處理', desc: '需馬上回覆的項目', usage: 5 },
  ]);
  const [isTagFormOpen, setIsTagFormOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);

  // 處理開啟自動化表單（初始化或帶入舊資料）
  const handleOpenAutomationForm = (rule = null) => {
    setEditingAutomationRule(rule);
    if (rule) {
      setRuleConditions([{ id: Date.now(), field: '星等 (Rating)', operator: '小於或等於 (≤)', value: '2 星' }]);
      setRuleActions([{ id: Date.now() + 1, type: '發送 Email 通知', target: '區經理' }]);
      setConditionMatchType('all');
    } else {
      setRuleConditions([{ id: Date.now(), field: '', operator: '', value: '' }]);
      setRuleActions([{ id: Date.now() + 1, type: '', target: '' }]);
      setConditionMatchType('all');
    }
    setShowAutomationForm(true);
  };

  const addCondition = () => setRuleConditions([...ruleConditions, { id: Date.now(), field: '', operator: '', value: '' }]);
  const removeCondition = (id) => setRuleConditions(ruleConditions.filter(c => c.id !== id));

  const addAction = () => setRuleActions([...ruleActions, { id: Date.now(), type: '', target: '' }]);
  const removeAction = (id) => setRuleActions(ruleActions.filter(a => a.id !== id));

  const tabs = [
    { id: 'automation', label: '自動化設定', desc: '設定評論條件觸發與自動化通知', icon: Zap },
    { id: 'agents', label: '專員管理', desc: '管理人員基本資訊與分店授權', icon: User },
    { id: 'groups', label: '群組管理', desc: '建立與管理組織群組', icon: Users },
    { id: 'tags', label: '標籤管理', desc: '建立與維護系統/個人分類標籤', icon: Tag },
  ];

  const mockBrands = [
    { id: 'b1', name: '旭集', branches: ['台北信義店', '台北天母店', '竹北遠百店', '高雄義享店'] },
    { id: 'b2', name: '饗食天堂', branches: ['台北信義店', '台北京站店', '新北板橋店', '台中大遠百店', '台南西門店', '高雄三多店'] },
    { id: 'b3', name: '果然匯', branches: ['台北明曜店', '新北板橋店', '桃園統領店', '高雄夢時代店'] },
    { id: 'b4', name: '饗饗', branches: ['微風信義店', '新莊宏匯店'] }
  ];

  const mockAutomationRules = [
    { id: 'a1', name: '1-2星嚴重負評通報', condition: '星等 ≤ 2 星', action: '發送 Email', active: true },
  ];

  const mockAgents = [
    { id: 'u1', name: '客服小王', email: 'wang@eatogether.com', role: '第一線客服專員', group: '總部客服', branches: ['旭集 台北信義店', '饗食天堂 台中大遠百店'] },
    { id: 'u2', name: '林區經理', email: 'lin@eatogether.com', role: '區經理', group: '北區營運處', branches: ['旭集 (所有分店)', '饗饗 (所有分店)'] },
  ];

  const toggleBranch = (brandName, branchName) => {
    const id = `${brandName} ${branchName}`;
    setSelectedBranches(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const toggleBrand = (brandName, branches, isChecked) => {
    if (isChecked) {
      const newBranches = branches.map(b => `${brandName} ${b}`);
      setSelectedBranches(prev => [...new Set([...prev, ...newBranches])]);
    } else {
      const branchIds = branches.map(b => `${brandName} ${b}`);
      setSelectedBranches(prev => prev.filter(b => !branchIds.includes(b)));
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {!activeSettingTab ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tabs.map(tab => (
            <Card key={tab.id} className="p-6 cursor-pointer hover:border-blue-400 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col items-start gap-4" onClick={() => setActiveSettingTab(tab.id)}>
              <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <tab.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700">{tab.label}</h3>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{tab.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 -ml-2" onClick={() => { setActiveSettingTab(null); setShowAutomationForm(false); setEditingAutomationRule(null); setIsAgentFormOpen(false); setIsGroupFormOpen(false); setEditingGroup(null); }}>
            <ArrowLeft size={16} className="mr-1.5" /> 返回設定目錄
          </Button>
          
          <Card className="p-6">
            
            {/* 專員管理頁面：列表 */}
            {activeSettingTab === 'agents' && !isAgentFormOpen && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">專員管理</h3>
                    <p className="text-sm text-slate-500 mt-1">管理帳號基本資訊，並在編輯頁面中配置負責的分店權限。</p>
                  </div>
                  <Button variant="blue" className="gap-2 shadow-sm shrink-0" onClick={() => { setEditingAgent(null); setIsAgentFormOpen(true); }}>
                    <Plus size={16} /> 新增專員
                  </Button>
                </div>

                <div className="flex gap-3">
                  <div className="relative flex-1 max-w-sm flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type="search" placeholder="搜尋姓名或 Email..." className="pl-9" />
                    </div>
                    <Button variant="secondary" className="shrink-0">搜尋</Button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="px-5 py-3.5 font-medium">專員資訊</th>
                        <th className="px-5 py-3.5 font-medium">角色與群組</th>
                        <th className="px-5 py-3.5 font-medium">負責分店範圍</th>
                        <th className="px-5 py-3.5 font-medium text-right w-24">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockAgents.map(agent => (
                        <tr key={agent.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs text-blue-700 font-bold">{agent.name.charAt(0)}</div>
                              <div>
                                <div className="font-medium text-slate-900">{agent.name}</div>
                                <div className="text-xs text-slate-500">{agent.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="text-xs font-medium text-slate-700">{agent.role}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{agent.group}</div>
                          </td>
                          <td className="px-5 py-4 max-w-xs">
                            <div className="flex flex-wrap gap-1">
                              {agent.branches.map((b, i) => <Badge key={i} variant="outline" className="px-1.5 py-0 text-[10px] bg-slate-50 border-slate-200 font-normal">{b}</Badge>)}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => { setEditingAgent(agent); setIsAgentFormOpen(true); }}>
                                <Edit3 size={15} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => setItemToDelete({ type: '專員', name: agent.name })}>
                                <Trash2 size={15} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 專員管理頁面：新增與編輯表單 */}
            {activeSettingTab === 'agents' && isAgentFormOpen && (
              <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <Button variant="ghost" size="sm" className="gap-2 px-2 text-slate-500" onClick={() => setIsAgentFormOpen(false)}>
                    <ArrowLeft size={16} /> 返回專員列表
                  </Button>
                  <div className="h-6 w-px bg-slate-200"></div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <User size={20} className="text-blue-600" />
                    {editingAgent ? `編輯專員：${editingAgent.name}` : '新增專員'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-slate-800 font-bold mb-2">
                      <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                      基本資訊設定
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>專員姓名</Label>
                          <Input placeholder="例如：王小明" defaultValue={editingAgent?.name || ''} />
                        </div>
                        <div className="space-y-2">
                          <Label>Email 帳號</Label>
                          <Input placeholder="name@eatogether.com" defaultValue={editingAgent?.email || ''} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>系統角色 (Role)</Label>
                        <select className="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-slate-950" defaultValue={editingAgent?.role || ""}>
                          <option value="" disabled hidden>請選擇角色...</option>
                          <option value="第一線客服專員">第一線客服專員</option>
                          <option value="區經理">區經理</option>
                          <option value="營運分析師">營運分析師</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>所屬群組 (Group)</Label>
                        <select className="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-slate-950" defaultValue={editingAgent?.group || ""}>
                          <option value="" disabled hidden>請選擇群組...</option>
                          <option value="總部客服">總部客服</option>
                          <option value="北區營運處">北區營運處</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 text-slate-800 font-bold">
                        <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                        負責分店授權配置
                      </div>
                      <Badge variant="success" className="text-[10px]">已選 {selectedBranches.length} 家</Badge>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div className="relative flex-1 flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                          <Input type="search" placeholder="快速搜尋分店..." className="pl-8 h-8 text-xs" />
                        </div>
                        <Button variant="secondary" size="sm" className="h-8 text-xs shrink-0">搜尋</Button>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setSelectedBranches([])}>
                        清除全選
                      </Button>
                    </div>
                    <div className="border border-slate-200 rounded-lg max-h-[350px] overflow-y-auto bg-slate-50/50 shadow-inner">
                      {mockBrands.map(brand => {
                        const allSelected = brand.branches.every(b => selectedBranches.includes(`${brand.name} ${b}`));
                        return (
                          <div key={brand.id} className="border-b border-slate-200 last:border-0 bg-white">
                            <div className="flex items-center justify-between bg-slate-100/50 p-2.5 border-b border-slate-100">
                              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-700">
                                <Checkbox checked={allSelected} onChange={(e) => toggleBrand(brand.name, brand.branches, e.target.checked)} />
                                {brand.name}
                              </label>
                            </div>
                            <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-2">
                              {brand.branches.map(branch => (
                                <label key={branch} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-blue-600">
                                  <Checkbox checked={selectedBranches.includes(`${brand.name} ${branch}`)} onChange={() => toggleBranch(brand.name, branch)} />
                                  {branch}
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <Button variant="outline" onClick={() => setIsAgentFormOpen(false)}>取消返回</Button>
                  <Button variant="blue" className="gap-2 px-8" onClick={() => setIsAgentFormOpen(false)}>
                    <CheckCircle2 size={16}/> {editingAgent ? '儲存更新' : '完成新增並發送邀請'}
                  </Button>
                </div>
              </div>
            )}

            {/* 群組管理頁面：列表 */}
            {activeSettingTab === 'groups' && !isGroupFormOpen && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">群組管理</h3>
                    <p className="text-sm text-slate-500 mt-1">建立組織群組，以利分類與管理客服人員。</p>
                  </div>
                  <Button variant="blue" className="gap-2 shadow-sm shrink-0" onClick={() => handleOpenGroupForm(null)}>
                    <Plus size={16} /> 新增群組
                  </Button>
                </div>
                <div className="flex gap-3">
                  <div className="relative flex-1 max-w-sm flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type="search" placeholder="搜尋群組名稱..." className="pl-9" />
                    </div>
                    <Button variant="secondary" className="shrink-0">搜尋</Button>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="px-5 py-3.5 font-medium w-48">群組名稱</th>
                        <th className="px-5 py-3.5 font-medium">群組描述</th>
                        <th className="px-5 py-3.5 font-medium w-24">成員人數</th>
                        <th className="px-5 py-3.5 font-medium text-right w-24">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {groupsData.map(group => (
                        <tr key={group.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-5 py-4 font-medium text-slate-900 flex items-center gap-2">
                            <Users size={16} className="text-slate-400" />
                            {group.name}
                            {group.isDefault && <Badge variant="secondary" className="ml-1 text-[10px] px-1 py-0 bg-slate-100">系統預設</Badge>}
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-xs leading-relaxed max-w-md truncate" title={group.desc}>
                            {group.desc}
                          </td>
                          <td className="px-5 py-4 text-slate-600">
                            <Badge variant="outline" className="font-normal bg-white">{group.members} 人</Badge>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleOpenGroupForm(group)}>
                                <Edit3 size={15} />
                              </Button>
                              {!group.isDefault && (
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => setItemToDelete({ type: '群組', name: group.name, id: group.id })}>
                                  <Trash2 size={15} />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 群組管理頁面：新增與編輯表單 */}
            {activeSettingTab === 'groups' && isGroupFormOpen && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300 max-w-5xl">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <Button variant="ghost" size="sm" className="gap-2 px-2 text-slate-500 hover:text-slate-900" onClick={() => setIsGroupFormOpen(false)}>
                    <ArrowLeft size={16} /> 返回群組列表
                  </Button>
                  <div className="h-6 w-px bg-slate-200"></div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Users size={20} className="text-blue-600" />
                    {editingGroup ? `編輯群組：${editingGroup.name}` : '新增群組'}
                  </h3>
                  {editingGroup?.isDefault && (
                    <Badge variant="warning" className="ml-auto bg-amber-50 text-amber-700 border-amber-200 font-normal">
                      <AlertCircle size={12} className="mr-1" /> 此為系統預設群組，無法修改群組名稱。
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 左欄：基本資訊與指派成員 */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-slate-800 font-bold">
                        <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>群組基本資訊
                      </div>
                      <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <div className="space-y-2">
                          <Label>群組名稱</Label>
                          <Input id="group-name-input" placeholder="例如：北區營運處" defaultValue={editingGroup?.name || ''} disabled={editingGroup?.isDefault} className={editingGroup?.isDefault ? "bg-slate-100 text-slate-500" : ""} />
                        </div>
                        <div className="space-y-2">
                          <Label>群組描述 (選填)</Label>
                          <textarea 
                            id="group-desc-input"
                            className="w-full min-h-[80px] rounded-md border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-slate-950 focus:outline-none resize-none bg-white" 
                            placeholder="描述此群組的職責範圍或涵蓋人員..." 
                            defaultValue={editingGroup?.desc || ''}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-slate-800 font-bold">
                          <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>指派成員
                        </div>
                        <Badge variant="secondary" className="text-[10px]">已選 {selectedGroupMembers.length} 人</Badge>
                      </div>
                      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
                        <div className="p-2 border-b border-slate-100 bg-slate-50">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <Input type="search" placeholder="搜尋專員..." className="h-8 pl-8 text-xs bg-white" />
                          </div>
                        </div>
                        <div className="max-h-[220px] overflow-y-auto p-2">
                          {mockAgents.map(agent => (
                            <label key={agent.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md cursor-pointer group transition-colors">
                              <div className="flex items-center gap-3">
                                <Checkbox checked={selectedGroupMembers.includes(agent.id)} onChange={() => toggleGroupMember(agent.id)} />
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">{agent.name.charAt(0)}</div>
                                  <div className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{agent.name}</div>
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-400">{agent.role}</div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右欄：權限配置 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 text-slate-800 font-bold">
                        <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>系統模組權限配置
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600 hover:text-blue-700" onClick={() => setSelectedGroupPermissions(permissionModules.flatMap(m => m.options.map(o => o.id)))}>
                        全部勾選
                      </Button>
                    </div>
                    
                    <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                      {permissionModules.map(module => {
                        const isAllSelected = module.options.every(opt => selectedGroupPermissions.includes(opt.id));
                        return (
                          <div key={module.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2.5 border-b border-slate-200">
                              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-800">
                                <Checkbox 
                                  checked={isAllSelected} 
                                  onChange={(e) => {
                                    const opts = module.options.map(o => o.id);
                                    if (e.target.checked) {
                                      setSelectedGroupPermissions(prev => [...new Set([...prev, ...opts])]);
                                    } else {
                                      setSelectedGroupPermissions(prev => prev.filter(id => !opts.includes(id)));
                                    }
                                  }} 
                                />
                                {module.label}
                              </label>
                            </div>
                            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {module.options.map(option => (
                                <label key={option.id} className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 hover:text-slate-900 transition-colors">
                                  <Checkbox 
                                    checked={selectedGroupPermissions.includes(option.id)} 
                                    onChange={() => toggleGroupPermission(option.id)} 
                                  />
                                  {option.label}
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <Button variant="outline" onClick={() => setIsGroupFormOpen(false)}>取消返回</Button>
                  <Button variant="blue" className="gap-2 px-8" onClick={handleSaveGroup}>
                    <CheckCircle2 size={16}/> {editingGroup ? '儲存更新' : '確認新增群組'}
                  </Button>
                </div>
              </div>
            )}

            {/* 自動化規則：列表 */}
            {activeSettingTab === 'automation' && !showAutomationForm && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">自動化規則設定</h3>
                    <p className="text-sm text-slate-500 mt-1">設定當評論滿足特定條件時，系統自動執行的動作。</p>
                  </div>
                  <Button variant="blue" className="gap-2 shadow-sm shrink-0" onClick={() => handleOpenAutomationForm(null)}>
                    <Plus size={16} /> 新增規則
                  </Button>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="px-5 py-3.5 font-medium w-16">狀態</th>
                        <th className="px-5 py-3.5 font-medium">規則名稱</th>
                        <th className="px-5 py-3.5 font-medium">觸發條件 (IF)</th>
                        <th className="px-5 py-3.5 font-medium">執行動作 (THEN)</th>
                        <th className="px-5 py-3.5 font-medium text-right w-24">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockAutomationRules.map(rule => (
                        <tr key={rule.id} className={`hover:bg-slate-50/80 transition-colors group ${!rule.active ? 'opacity-60 grayscale' : ''}`}>
                          <td className="px-5 py-4">
                            <div className={`w-8 h-4 rounded-full flex items-center p-0.5 cursor-pointer ${rule.active ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'}`}>
                              <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                            </div>
                          </td>
                          <td className="px-5 py-4 font-medium text-slate-900">{rule.name}</td>
                          <td className="px-5 py-4"><Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 gap-1.5 font-normal"><Filter size={12} /> {rule.condition}</Badge></td>
                          <td className="px-5 py-4"><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1.5 font-normal"><Mail size={12} /> {rule.action}</Badge></td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleOpenAutomationForm(rule)}>
                                <Edit3 size={15} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => setItemToDelete({ type: '自動化規則', name: rule.name })}>
                                <Trash2 size={15} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 自動化規則：編輯表單 */}
            {activeSettingTab === 'automation' && showAutomationForm && (
              <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300 max-w-3xl">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <Button variant="ghost" size="sm" className="gap-2 px-2 text-slate-500 hover:text-slate-900" onClick={() => setShowAutomationForm(false)}>
                    <ArrowLeft size={16} /> 返回列表
                  </Button>
                  <div className="h-6 w-px bg-slate-200"></div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Zap size={20} className="text-blue-600" />
                    {editingAutomationRule ? '編輯自動化規則' : '新增自動化規則'}
                  </h3>
                </div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-900">規則名稱</label>
                    <Input placeholder="例如：1-2星嚴重負評通報..." className="max-w-md" defaultValue={editingAutomationRule?.name || ''} />
                  </div>
                  
                  {/* 觸發條件設定區塊 */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                      <div className="bg-slate-800 text-white text-xs px-2 py-0.5 rounded uppercase tracking-wider">IF</div>
                      當滿足
                      <select 
                        className="h-8 rounded-md border border-slate-300 px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 font-bold text-blue-700 outline-none cursor-pointer"
                        value={conditionMatchType}
                        onChange={(e) => setConditionMatchType(e.target.value)}
                      >
                        <option value="all">所有 (AND)</option>
                        <option value="any">任一 (OR)</option>
                      </select>
                      條件時：
                    </div>
                    
                    <div className="space-y-3">
                      {ruleConditions.map((condition, index) => (
                        <React.Fragment key={condition.id}>
                          {index > 0 && (
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 pl-2">
                              <div className="w-3 h-px bg-slate-300"></div>
                              {conditionMatchType === 'all' ? 'AND (且)' : 'OR (或)'}
                              <div className="w-3 h-px bg-slate-300"></div>
                            </div>
                          )}
                          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
                            <select className="h-10 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white sm:w-1/3" defaultValue={condition.field || ""}>
                              <option value="" disabled hidden>請選擇條件欄位</option>
                              <option value="星等 (Rating)">星等 (Rating)</option>
                              <option value="系統標籤 (Tags)">系統標籤 (Tags)</option>
                              <option value="評論內容包含 (Keyword)">評論內容包含 (Keyword)</option>
                              <option value="分店 (Branch)">分店 (Branch)</option>
                            </select>
                            <select className="h-10 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white sm:w-1/4" defaultValue={condition.operator || ""}>
                              <option value="" disabled hidden>比較方式</option>
                              <option value="小於或等於 (≤)">小於或等於 (≤)</option>
                              <option value="等於 (=)">等於 (=)</option>
                              <option value="大於 (>)">大於 ({'>'})</option>
                            </select>
                            <select className="h-10 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white sm:w-1/3" defaultValue={condition.value || ""}>
                              <option value="" disabled hidden>請選擇數值</option>
                              <option value="1 星">1 星</option>
                              <option value="2 星">2 星</option>
                              <option value="3 星">3 星</option>
                              <option value="4 星">4 星</option>
                              <option value="5 星">5 星</option>
                            </select>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 shrink-0" onClick={() => removeCondition(condition.id)}>
                              <Trash2 size={16}/>
                            </Button>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" className="gap-2 text-slate-600 border-slate-300 bg-white" onClick={addCondition}>
                      <PlusCircle size={14} /> 新增條件 ({conditionMatchType === 'all' ? 'AND' : 'OR'})
                    </Button>
                  </div>
                  
                  {/* 執行動作設定區塊 */}
                  <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 text-blue-900 font-bold">
                      <div className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded uppercase tracking-wider">THEN</div>則執行以下動作：
                    </div>
                    
                    <div className="space-y-3">
                      {ruleActions.map((action, index) => (
                        <React.Fragment key={action.id}>
                          {index > 0 && (
                            <div className="flex items-center gap-2 text-[11px] font-bold text-blue-400 pl-2">
                              <div className="w-3 h-px bg-blue-200"></div>
                              AND (且)
                              <div className="w-3 h-px bg-blue-200"></div>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <select className="h-10 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white sm:w-1/3 shrink-0" defaultValue={action.type || ""}>
                              <option value="" disabled hidden>請選擇執行動作</option>
                              <option value="發送 Email 通知">發送 Email 通知</option>
                              <option value="自動加上標籤">自動加上標籤</option>
                              <option value="指派給特定群組">指派給特定群組</option>
                            </select>
                            <div className="flex-1 w-full relative">
                              <div className="flex flex-wrap gap-2 p-1.5 min-h-[40px] rounded-md border border-slate-200 bg-white items-center">
                                {action.target === '區經理' && (
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 gap-1 px-2 py-1">
                                    <Users size={12}/> 區經理 <X size={12} className="cursor-pointer hover:text-red-500 ml-1"/>
                                  </Badge>
                                )}
                                <input type="text" placeholder="輸入 Email 或選擇角色..." className="flex-1 outline-none text-sm min-w-[150px] px-1" />
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 shrink-0 mt-1 sm:mt-0" onClick={() => removeAction(action.id)}>
                              <Trash2 size={16}/>
                            </Button>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" className="gap-2 text-blue-700 border-blue-200 bg-white hover:bg-blue-50" onClick={addAction}>
                      <PlusCircle size={14} /> 新增動作
                    </Button>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <Button variant="outline" onClick={() => setShowAutomationForm(false)}>取消</Button>
                    <Button variant="blue" className="gap-2" onClick={() => setShowAutomationForm(false)}>
                      <CheckCircle2 size={16}/> 儲存規則
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 標籤管理頁面 */}
            {activeSettingTab === 'tags' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">標籤管理</h3>
                  </div>
                  <Button variant="blue" className="gap-2" onClick={() => { setEditingTag(null); setIsTagFormOpen(true); }}>
                    <Plus size={16} /> 新增{activeTagCategory === 'system' ? '系統' : '個人'}標籤
                  </Button>
                </div>
                <div className="flex gap-3">
                  <div className="relative flex-1 max-w-sm flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input type="search" placeholder="搜尋標籤..." className="pl-9" />
                    </div>
                    <Button variant="secondary" className="shrink-0">搜尋</Button>
                  </div>
                </div>
                <div className="flex border-b border-slate-200">
                  <button 
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTagCategory === 'system' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500'}`} 
                    onClick={() => setActiveTagCategory('system')}
                  >
                    系統標籤
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTagCategory === 'personal' ? 'border-purple-600 text-purple-600 bg-purple-50/50' : 'border-transparent text-slate-500'}`} 
                    onClick={() => setActiveTagCategory('personal')}
                  >
                    個人標籤
                  </button>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="px-5 py-3 font-medium">標籤名稱</th>
                        <th className="px-5 py-3 font-medium">描述</th>
                        <th className="px-5 py-3 font-medium text-right">使用次數</th>
                        <th className="px-5 py-3 font-medium text-right w-24">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(activeTagCategory === 'system' ? systemTags : personalTags).map(tag => (
                        <tr key={tag.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-5 py-3">
                            <Badge variant={activeTagCategory === 'system' ? 'system' : 'personal'}>{tag.name}</Badge>
                          </td>
                          <td className="px-5 py-3 text-slate-500">{tag.desc}</td>
                          <td className="px-5 py-3 text-right font-medium">{tag.usage}</td>
                          <td className="px-5 py-3">
                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" onClick={() => { setEditingTag(tag); setIsTagFormOpen(true); }}>
                                <Edit3 size={15} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600" onClick={() => setItemToDelete({ type: '標籤', name: tag.name, id: tag.id })}>
                                <Trash2 size={15} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 未實作的佔位頁面 */}
            {activeSettingTab !== 'tags' && activeSettingTab !== 'automation' && activeSettingTab !== 'agents' && activeSettingTab !== 'groups' && activeSettingTab !== null && (
              <div className="h-64 flex items-center justify-center flex-col text-slate-400">
                <Settings size={48} className="mb-4 opacity-20" />
                <p className="mt-2 text-lg font-medium text-slate-600">{tabs.find(t => t.id === activeSettingTab)?.label} 功能建置中</p>
                <p className="text-sm mt-1">此頁面的細節尚未實作</p>
              </div>
            )}
            
          </Card>
        </div>
      )}

      {/* Modal: 新增/編輯標籤視窗 */}
      {isTagFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm animate-in fade-in p-4">
          <Card className="w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 border-0">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Tag size={20} className={activeTagCategory === 'system' ? "text-blue-600" : "text-purple-600"} />
                {editingTag ? '編輯' : '新增'}{activeTagCategory === 'system' ? '系統' : '個人'}標籤
              </h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100" onClick={() => setIsTagFormOpen(false)}>
                <X size={18} />
              </Button>
            </div>
            <div className="p-6 bg-white space-y-4">
              <div className="space-y-2">
                <Label>標籤名稱</Label>
                <Input
                  placeholder="輸入標籤名稱..."
                  defaultValue={editingTag?.name || ''}
                  id="tag-name-input"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label>標籤描述 (選填)</Label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-slate-950 focus:outline-none resize-none"
                  placeholder="描述此標籤的使用時機..."
                  defaultValue={editingTag?.desc || ''}
                  id="tag-desc-input"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" className="bg-white" onClick={() => setIsTagFormOpen(false)}>取消</Button>
              <Button variant="blue" className="gap-2" onClick={() => {
                 const name = document.getElementById('tag-name-input').value;
                 const desc = document.getElementById('tag-desc-input').value;
                 if(name.trim()) {
                   if(editingTag) {
                      if(activeTagCategory === 'system') {
                        setSystemTags(systemTags.map(t => t.id === editingTag.id ? {...t, name, desc} : t));
                      } else {
                        setPersonalTags(personalTags.map(t => t.id === editingTag.id ? {...t, name, desc} : t));
                      }
                   } else {
                      const newTag = { id: Date.now().toString(), name, desc, usage: 0 };
                      if(activeTagCategory === 'system') {
                        setSystemTags([...systemTags, newTag]);
                      } else {
                        setPersonalTags([...personalTags, newTag]);
                      }
                   }
                 }
                 setIsTagFormOpen(false);
              }}>
                <CheckCircle2 size={16} /> 儲存標籤
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* 統一的刪除確認對話框 */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm animate-in fade-in p-4">
          <Card className="w-full max-w-sm shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 border-0">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">確定要刪除這個{itemToDelete.type}嗎？</h3>
              <p className="text-sm text-slate-500">
                {itemToDelete.name && (
                  <>即將刪除「<span className="font-semibold text-slate-700">{itemToDelete.name}</span>」。<br/></>
                )}
                刪除後將無法復原，您確定要繼續嗎？
              </p>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" className="bg-white" onClick={() => setItemToDelete(null)}>取消</Button>
              <Button variant="destructive" onClick={() => {
                if (itemToDelete.type === '標籤') {
                  setSystemTags(systemTags.filter(t => t.id !== itemToDelete.id));
                  setPersonalTags(personalTags.filter(t => t.id !== itemToDelete.id));
                } else if (itemToDelete.type === '群組') {
                  setGroupsData(groupsData.filter(g => g.id !== itemToDelete.id));
                }
                setItemToDelete(null);
              }}>確認刪除</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// --- 應用程式主體 ---

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('reviews'); 
  const [replyingTo, setReplyingTo] = useState(null);
  const [selectedReviews, setSelectedReviews] = useState([]); 
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false); 
  const [viewingHistoryFor, setViewingHistoryFor] = useState(null); 
  const [batchActionType, setBatchActionType] = useState(null); 
  const [viewingMedia, setViewingMedia] = useState(null); 
  const [replyToDelete, setReplyToDelete] = useState(null); 
  
  // 處理狀態過濾器的多選選單
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  
  // 處理草稿狀態
  const [draftContents, setDraftContents] = useState({
    'REV-003': { reply: '親愛的顧客您好，針對您提到的牛排熟度問題，我們已經向主廚反應，未來會加強出餐品質的控管...' } 
  });
  const [saveStatus, setSaveStatus] = useState(''); 
  const [lastSavedTime, setLastSavedTime] = useState('');
  const saveTimeoutRef = useRef(null);

  // 處理送出回覆的狀態與衝突檢查模擬
  const [submitStatuses, setSubmitStatuses] = useState({});
  const simulatedConflicts = useRef(new Set()); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const toggleSelectReview = (id) => {
    setSelectedReviews(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selectedReviews.length === MOCK_REVIEWS.length) setSelectedReviews([]);
    else setSelectedReviews(MOCK_REVIEWS.map(r => r.id));
  };

  // 處理草稿輸入變更與模擬自動儲存
  const handleDraftChange = (id, field, value) => {
    setDraftContents(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value }
    }));
    setSaveStatus('saving');

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setSaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 800); 
  };

  // 處理送出回覆的邏輯 (包含檢查評論變更)
  const handleSubmitReply = (reviewId) => {
    setSubmitStatuses(prev => ({ ...prev, [reviewId]: { status: 'submitting' } }));
    
    // 模擬 API 請求與資料庫狀態檢查
    setTimeout(() => {
      // 💡 體驗設計：針對第一則評論 (REV-001) 的「首次送出」，刻意觸發「內容已變更」的錯誤阻擋
      if (reviewId === 'REV-001' && !simulatedConflicts.current.has(reviewId)) {
        simulatedConflicts.current.add(reviewId);
        setSubmitStatuses(prev => ({ 
          ...prev, 
          [reviewId]: { 
            status: 'conflict', 
            message: '⚠️ 發佈失敗：系統偵測到此則評論在您編輯期間，已被顧客「修改」或「刪除」。請確認最新的評論內容後，再重新送出回覆。' 
          } 
        }));
        return;
      }
      
      // 成功情境
      setSubmitStatuses(prev => ({ ...prev, [reviewId]: { status: 'success' } }));
      
      // 成功後延遲 1 秒收合回覆區，並清空狀態
      setTimeout(() => {
         setReplyingTo(null);
         setSubmitStatuses(prev => ({ ...prev, [reviewId]: { status: 'idle' } }));
      }, 1200);
      
    }, 1200);
  };

  const renderStars = (rating) => (
    Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={16} className={`${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
    ))
  );

  return (
    <div className="flex min-h-screen w-full bg-slate-50 flex-col md:flex-row font-sans">
      
      {/* 行動版側邊欄遮罩 */}
      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-slate-950/50 md:hidden" onClick={toggleSidebar} />}
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 text-slate-900 border-r border-slate-200 transition-transform duration-300 ease-in-out flex flex-col md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center px-6 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2 font-bold text-base tracking-wide text-slate-900">
            <Building2 className="text-blue-600 shrink-0" size={24} /> Google 商家評論管理系統
          </div>
          <Button variant="ghost" size="icon" className="ml-auto md:hidden text-slate-500 hover:text-slate-900" onClick={toggleSidebar}>
            <X size={18} />
          </Button>
        </div>
        <div className="px-4 py-6 text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">功能模組</div>
        <nav className="flex flex-col gap-2 px-3 flex-1 overflow-y-auto">
          <Button variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} className={`justify-start gap-3 px-3 w-full ${activeTab === 'dashboard' ? 'bg-white shadow-sm border border-slate-200 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={18} className="shrink-0" />
            <span className="flex-1 text-left">儀表版</span>
          </Button>
          <Button variant={activeTab === 'reviews' ? 'secondary' : 'ghost'} className={`justify-start gap-3 px-3 w-full ${activeTab === 'reviews' ? 'bg-white shadow-sm border border-slate-200 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`} onClick={() => setActiveTab('reviews')}>
            <MessageSquare size={18} className="shrink-0" />
            <span className="flex-1 text-left">評論管理</span>
            <Badge variant="destructive" className="h-5 px-1.5 rounded-sm shrink-0">12</Badge>
          </Button>
          <Button variant={activeTab === 'analytics' ? 'secondary' : 'ghost'} className={`justify-start gap-3 px-3 w-full ${activeTab === 'analytics' ? 'bg-white shadow-sm border border-slate-200 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`} onClick={() => setActiveTab('analytics')}>
            <BarChart3 size={18} className="shrink-0" />
            <span className="flex-1 text-left">數據分析</span>
          </Button>
          <Button variant={activeTab === 'settings' ? 'secondary' : 'ghost'} className={`justify-start gap-3 px-3 w-full ${activeTab === 'settings' ? 'bg-white shadow-sm border border-slate-200 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`} onClick={() => setActiveTab('settings')}>
            <Settings size={18} className="shrink-0" />
            <span className="flex-1 text-left">系統設定</span>
          </Button>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col w-full min-w-0 overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 shadow-sm">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu size={20} />
          </Button>
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input type="search" placeholder="搜尋全站內容..." className="pl-9 bg-slate-50 border-slate-200" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-slate-900 leading-none">客服小王</p>
                <p className="text-xs text-slate-500 mt-1">第一線客服專員</p>
              </div>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Wang" alt="User" className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 capitalize">
              {activeTab === 'dashboard' ? '儀表版' : activeTab === 'reviews' ? '評論管理' : activeTab === 'analytics' ? '數據分析' : '系統設定'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {activeTab === 'dashboard' ? '總覽各品牌的顧客回饋與關鍵指標。' : activeTab === 'reviews' ? '檢視、回覆並管理所有商家的顧客評論。' : activeTab === 'analytics' ? '深度分析商家數據與顧客互動歷史。' : '管理人員權限、標籤、自動化與同步設定。'}
            </p>
          </div>
          
          {/* 主畫面路由切換 */}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'settings' && <SettingsView />}
          
          {activeTab === 'reviews' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="mb-6">
                <div className="p-4 flex flex-wrap items-center gap-4">
                  
                  {/* 搜尋評論關鍵字 */}
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="搜尋評論關鍵字..." className="pl-9 h-9" />
                  </div>

                  <select className="h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none">
                    <option value="">品牌</option>
                    <option value="旭集">旭集</option>
                    <option value="饗食天堂">饗食天堂</option>
                    <option value="果然匯">果然匯</option>
                  </select>
                  <select className="h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none">
                    <option value="">分店</option>
                    <option value="台北信義店">台北信義店</option>
                    <option value="台中大遠百店">台中大遠百店</option>
                  </select>
                  <select className="h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none">
                    <option value="">所有星等</option>
                    <option value="5">5 星</option>
                    <option value="4">4 星</option>
                    <option value="3">3 星</option>
                    <option value="2">2 星</option>
                    <option value="1">1 星</option>
                  </select>

                  {/* 多重狀態下拉選單 */}
                  <div className="relative">
                    <button 
                      className="flex items-center justify-between h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none min-w-[90px] text-slate-700 hover:bg-slate-50"
                      onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    >
                      <span>{selectedStatuses.length === 0 ? '狀態' : `狀態 (${selectedStatuses.length})`}</span>
                      <ChevronDown size={14} className={`ml-2 text-slate-400 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {statusDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setStatusDropdownOpen(false)}></div>
                        <div className="absolute top-full mt-1 left-0 w-44 bg-white border border-slate-200 rounded-md shadow-lg z-50 p-2 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-100">
                          
                          {/* 狀態群組 1 */}
                          <div>
                            <div className="text-[11px] font-bold text-slate-400 mb-1 px-1 tracking-wider">回覆進度</div>
                            <div className="flex flex-col gap-0.5">
                              {['未回覆', '已回覆'].map(status => (
                                <label key={status} className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer text-sm text-slate-700 transition-colors">
                                  <Checkbox 
                                    checked={selectedStatuses.includes(status)} 
                                    onChange={() => {
                                      setSelectedStatuses(prev => 
                                        prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
                                      );
                                    }} 
                                  />
                                  {status}
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="h-px bg-slate-100 my-0.5 mx-1"></div>

                          {/* 狀態群組 2 */}
                          <div>
                            <div className="text-[11px] font-bold text-slate-400 mb-1 px-1 tracking-wider">顧客變更 (事件)</div>
                            <div className="flex flex-col gap-0.5">
                              {['無變更', '評論已更新', '評論已刪除'].map(status => (
                                <label key={status} className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer text-sm text-slate-700 transition-colors">
                                  <Checkbox 
                                    checked={selectedStatuses.includes(status)} 
                                    onChange={() => {
                                      setSelectedStatuses(prev => 
                                        prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
                                      );
                                    }} 
                                  />
                                  {status}
                                </label>
                              ))}
                            </div>
                          </div>

                        </div>
                      </>
                    )}
                  </div>

                  {/* 搜尋與進階篩選按鈕統一放置於工具列最右側 */}
                  <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="blue" className="px-5">搜尋</Button>
                    <Button 
                      variant={showAdvancedFilters ? "secondary" : "ghost"} 
                      size="sm" 
                      className="gap-2 text-slate-600 font-medium" 
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                      <Filter size={14} />進階篩選<ChevronDown size={14} className={`transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </div>

                {/* 進階篩選面板 */}
                {showAdvancedFilters && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/80 rounded-b-xl animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">顧客名稱</label>
                        <Input placeholder="輸入特定顧客名稱..." className="h-9 bg-white" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">評論時間</label>
                        <select className="w-full h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none"><option value="">不限時間</option></select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">回覆時間</label>
                        <select className="w-full h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none"><option value="">不限時間</option></select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">客服專員</label>
                        <select className="w-full h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none"><option value="">所有人</option></select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">系統標籤</label>
                        <select className="w-full h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none"><option value="">不限標籤</option></select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">個人標籤</label>
                        <select className="w-full h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-slate-950 focus:outline-none"><option value="">不限標籤</option></select>
                      </div>
                      
                      <div className="space-y-1.5 lg:col-span-2 flex flex-col sm:flex-row sm:items-end justify-end gap-3">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-800">清除條件</Button>
                        <Button size="sm" variant="blue" className="gap-2"><Filter size={14}/> 套用篩選</Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* 批次操作列 */}
              {selectedReviews.length > 0 && (
                <Card className="mb-4 bg-blue-50 border-blue-200 p-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Checkbox id="select-all-active" checked={true} onChange={selectAll} />
                    <span className="text-sm font-medium text-blue-900">已選取 {selectedReviews.length} 則評論</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-white border-blue-200 text-blue-700 gap-2" onClick={() => setBatchActionType('note')}>
                      <Edit3 size={14}/> 批次新增備註
                    </Button>
                    <Button size="sm" variant="blue" className="gap-2" onClick={() => setBatchActionType('reply')}>
                      <MessageSquare size={14}/> 批次回覆
                    </Button>
                  </div>
                </Card>
              )}

              <div className="space-y-4">
                {selectedReviews.length === 0 && (
                  <div className="px-4 py-2 flex items-center gap-3 text-sm text-slate-500">
                    <Checkbox id="select-all" checked={false} onChange={selectAll} />
                    <label htmlFor="select-all" className="cursor-pointer">全選本頁評論</label>
                  </div>
                )}

                {/* 評論列表 */}
                {MOCK_REVIEWS.map((review) => {
                  const currentReplyDraft = draftContents[review.id]?.reply !== undefined ? draftContents[review.id].reply : (review.status === 'replied' ? review.replyText : (review.rating <= 2 ? `親愛的顧客您好，很抱歉在 ${review.branch} 帶給您不愉快的體驗...` : ''));
                  const currentNoteDraft = draftContents[review.id]?.note ?? '';

                  return (
                    <Card key={review.id} className={`overflow-hidden transition-all ${selectedReviews.includes(review.id) ? 'border-blue-400 ring-1 ring-blue-400' : replyingTo === review.id ? 'ring-2 ring-slate-900 ring-offset-2' : 'hover:border-slate-300'}`}>
                      {review.isDeleted && (
                        <div className="bg-red-50 px-4 py-2 border-b border-red-100 flex items-center gap-2 text-sm text-red-700">
                          <Trash2 size={16} /><strong>已刪除：</strong> 顧客已刪除此則評論。
                        </div>
                      )}
                      
                      {review.concurrencyUser && (
                        <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center gap-2 text-sm text-blue-700">
                          <span className="relative flex h-3 w-3 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                          </span>
                          <strong>{review.concurrencyUser}</strong> 正在檢視
                        </div>
                      )}

                      <div className="p-4 sm:p-5 flex gap-3 sm:gap-4">
                        <div className="pt-1">
                          <Checkbox checked={selectedReviews.includes(review.id)} onChange={() => toggleSelectReview(review.id)} />
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row gap-4">
                          <div className="flex gap-3 sm:gap-4 flex-1">
                            <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full border border-slate-200 shrink-0" />
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <h3 className="font-semibold text-slate-900">{review.author}</h3>
                                <div className="flex items-center">{renderStars(review.rating)}</div>
                                <span className="text-sm text-slate-500">{review.date}</span>
                                {review.isEdited && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">顧客已修改</span>
                                    {review.history && (
                                      <button onClick={() => setViewingHistoryFor(viewingHistoryFor === review.id ? null : review.id)} className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors">
                                        <Clock size={12} /> {viewingHistoryFor === review.id ? '隱藏歷史' : '查看歷史紀錄'}
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="text-sm text-slate-500 flex items-center gap-1.5">
                                <Building2 size={14} /> {review.branch}
                              </div>
                              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{review.text}</p>
                              
                              {review.media && review.media.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2 mb-1">
                                  {review.media.map((item, idx) => (
                                    <div key={idx} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden border border-slate-200 cursor-pointer hover:opacity-90 transition-opacity group" onClick={() => setViewingMedia(item)}>
                                      <img src={item.thumbnail || item.url} alt={`Review media ${idx + 1}`} className="w-full h-full object-cover" />
                                      {item.type === 'video' && (
                                        <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center transition-colors group-hover:bg-slate-950/40">
                                          <PlayCircle size={28} className="text-white drop-shadow-md" />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {viewingHistoryFor === review.id && review.history && (
                                <div className="mt-3 mb-2 p-3 bg-slate-50 border border-slate-200 rounded-md animate-in fade-in slide-in-from-top-1 duration-200">
                                  <div className="text-xs font-semibold text-slate-600 mb-3 flex items-center gap-1.5">
                                    <Clock size={14} className="text-slate-400" /> 顧客編輯歷史
                                  </div>
                                  <div className="space-y-4">
                                    {review.history.map((h, idx) => (
                                      <div key={idx} className="relative pl-3 border-l-2 border-slate-200">
                                        <div className="flex items-center gap-2 mb-1">
                                          <div className="flex items-center">{renderStars(h.rating)}</div>
                                          <span className="text-xs text-slate-400">{h.date}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 line-through decoration-slate-400">{h.text}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {review.systemTags.map(tag => <Badge key={tag} variant="system" className="gap-1"><Tag size={12} /> {tag}</Badge>)}
                                {review.personalTags.map(tag => <Badge key={tag} variant="personal" className="gap-1"><AlertCircle size={12} /> {tag}</Badge>)}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3 shrink-0 mt-2 sm:mt-0">
                            {review.status === 'replied' ? <Badge variant="success" className="gap-1"><CheckCircle2 size={14} /> 已回覆</Badge> : <Badge variant="warning">未回覆</Badge>}
                            <div className="flex items-center gap-2 mt-auto">
                              <Button variant="outline" size="sm" onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}>
                                {replyingTo === review.id ? '取消操作' : '展開回覆區'}
                              </Button>
                              <Button variant="ghost" size="icon"><MoreVertical size={18} /></Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 展開的回覆編輯區塊 */}
                      {replyingTo === review.id && (
                        <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 flex flex-col md:flex-row gap-6 animate-in slide-in-from-top-2 duration-200">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-semibold flex items-center gap-2 text-slate-900">
                                <MessageSquare size={16} className="text-blue-500" /> 公開回覆
                              </label>
                              <div className="flex items-center gap-2">
                                {saveStatus === 'saving' && <span className="text-xs text-slate-400 flex items-center gap-1"><RefreshCw size={12} className="animate-spin" />儲存中...</span>}
                                {saveStatus === 'saved' && <span className="text-xs text-emerald-600 flex items-center gap-1"><Save size={12} />已自動儲存於 {lastSavedTime}</span>}
                              </div>
                            </div>

                            {/* 防呆衝突警告 */}
                            {submitStatuses[review.id]?.status === 'conflict' && (
                              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-md text-sm flex items-start gap-2 animate-in slide-in-from-top-1 fade-in duration-200 shadow-sm">
                                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <p className="font-semibold leading-relaxed">
                                    {submitStatuses[review.id].message}
                                  </p>
                                </div>
                              </div>
                            )}

                            <textarea 
                              className={`w-full min-h-[120px] rounded-md border p-3 text-sm focus:outline-none transition-colors ${submitStatuses[review.id]?.status === 'conflict' ? 'border-red-300 focus:ring-2 focus:ring-red-500/50 bg-red-50/10' : 'border-slate-200 focus:ring-2 focus:ring-blue-500'}`}
                              placeholder="撰寫回覆..." 
                              value={currentReplyDraft}
                              onChange={(e) => handleDraftChange(review.id, 'reply', e.target.value)}
                              disabled={submitStatuses[review.id]?.status === 'submitting' || submitStatuses[review.id]?.status === 'success'}
                            />
                            <div className="flex justify-between items-center">
                              {review.status === 'replied' ? (
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" onClick={() => setReplyToDelete(review.id)}>
                                  <Trash2 size={14} className="mr-1" /> 刪除回覆
                                </Button>
                              ) : <div></div>}
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="bg-white" onClick={() => setSaveStatus('saved')}>存為草稿</Button>
                                <Button 
                                  size="sm" 
                                  variant="blue" 
                                  className={submitStatuses[review.id]?.status === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                                  onClick={() => handleSubmitReply(review.id)}
                                  disabled={submitStatuses[review.id]?.status === 'submitting' || submitStatuses[review.id]?.status === 'success'}
                                >
                                  {submitStatuses[review.id]?.status === 'submitting' ? (
                                    <><RefreshCw size={14} className="animate-spin mr-1.5" /> 檢查與送出中...</>
                                  ) : submitStatuses[review.id]?.status === 'success' ? (
                                    <><CheckCircle2 size={14} className="mr-1.5" /> 送出成功</>
                                  ) : review.status === 'replied' ? '更新回覆' : '發佈回覆'}
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <label className="text-sm font-semibold flex items-center gap-2 text-slate-900">
                              <Edit3 size={16} className="text-purple-500" /> 內部備註
                            </label>
                            <textarea 
                              className="w-full min-h-[120px] rounded-md border border-amber-200 bg-amber-50/30 p-3 text-sm" 
                              placeholder="輸入 @ 提及成員..." 
                              value={currentNoteDraft}
                              onChange={(e) => handleDraftChange(review.id, 'note', e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" className="bg-white text-slate-600" onClick={() => setSaveStatus('saved')}>存為草稿</Button>
                              <Button size="sm" variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">新增備註</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Modal: 批次操作視窗 */}
              {batchActionType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 animate-in fade-in">
                  <Card className="w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 border-0">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        {batchActionType === 'reply' ? <MessageSquare size={20} className="text-blue-600" /> : <Edit3 size={20} className="text-purple-600" />}
                        {batchActionType === 'reply' ? '批次公開回覆' : '批次新增內部備註'}
                        <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-700">已選取 {selectedReviews.length} 則</Badge>
                      </h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100" onClick={() => setBatchActionType(null)}>
                        <X size={18} />
                      </Button>
                    </div>
                    <div className="p-6 bg-white space-y-5">
                      {batchActionType === 'reply' ? (
                        <>
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex gap-2.5 text-sm text-amber-800">
                            <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                            <p className="leading-relaxed">您即將為 <strong>{selectedReviews.length}</strong> 則評論發布相同的回覆。<br/>若其中包含已回覆過的評論，舊內容將會被此新內容<strong>直接覆蓋</strong>。</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="text-sm font-semibold text-slate-700">回覆內容</label>
                              <div className="flex gap-1.5">
                                <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs text-slate-600 border-slate-300 hover:bg-slate-50">+ 顧客名稱</Button>
                                <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs text-slate-600 border-slate-300 hover:bg-slate-50">+ 分店名稱</Button>
                              </div>
                            </div>
                            <textarea className="w-full min-h-[160px] rounded-md border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" placeholder="親愛的 {顧客名稱} 您好..." />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">內部備註內容</label>
                            <textarea className="w-full min-h-[140px] rounded-md border border-amber-200 bg-amber-50/30 p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none" placeholder="輸入 @ 提及成員..." />
                          </div>
                          <div className="pt-2">
                            <label className="flex items-center gap-2 cursor-pointer w-fit">
                              <Checkbox id="append-note" checked={true} onChange={() => {}} />
                              <span className="text-sm font-medium text-slate-700">附加在原有備註之後</span>
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                      <Button variant="outline" className="bg-white" onClick={() => setBatchActionType(null)}>取消</Button>
                      <Button variant="blue" className="gap-2" onClick={() => { setBatchActionType(null); setSelectedReviews([]); }}>
                        {batchActionType === 'reply' ? '確認發布回覆' : '確認儲存備註'}
                      </Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Modal: 檢視圖片或影片 */}
              {viewingMedia && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm animate-in fade-in" onClick={() => setViewingMedia(null)}>
                  <Button variant="ghost" size="icon" className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:bg-white/20 rounded-full z-10" onClick={() => setViewingMedia(null)}>
                    <X size={28} />
                  </Button>
                  <div className="relative w-full h-full max-w-6xl flex items-center justify-center p-4 sm:p-12" onClick={e => e.stopPropagation()}>
                    {viewingMedia.type === 'video' ? (
                      <video src={viewingMedia.url} controls autoPlay className="max-w-full max-h-full rounded-md shadow-2xl outline-none" />
                    ) : (
                      <img src={viewingMedia.url} alt="Review media full size" className="max-w-full max-h-full object-contain rounded-md shadow-2xl select-none" />
                    )}
                  </div>
                </div>
              )}

              {/* Modal: 刪除單筆回覆確認 */}
              {replyToDelete && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm animate-in fade-in p-4">
                  <Card className="w-full max-w-sm shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 border-0">
                    <div className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                        <Trash2 size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">確定要刪除這則回覆嗎？</h3>
                      <p className="text-sm text-slate-500">刪除後，此回覆將永久移除。確定要繼續嗎？</p>
                    </div>
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                      <Button variant="outline" className="bg-white" onClick={() => setReplyToDelete(null)}>取消</Button>
                      <Button variant="destructive" onClick={() => { setReplyToDelete(null); setReplyingTo(null); }}>確認刪除</Button>
                    </div>
                  </Card>
                </div>
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  );
}