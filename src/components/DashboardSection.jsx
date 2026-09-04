import React from 'react';
import { 
  Wallet, 
  ShoppingBag, 
  Table, 
  Store, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  ChevronDown, 
  ChevronRight,
  Menu
} from 'lucide-react';

function DashboardSection({ isCollapsed }) {
  return (
    <div 
      className={`transition-all duration-500 min-h-screen bg-[#111936] text-white p-4 sm:p-6 mt-[70px] ${
        isCollapsed ? 'ml-[80px] w-[calc(100%-80px)]' : 'ml-[260px] w-[calc(100%-260px)]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= LEFT MAIN COLUMN (8 cols) ================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Top 3 Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Card 1: Total Earning (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#5e35b1] to-[#4527a0] rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between min-h-[160px]">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-sm pointer-events-none" />
              <div className="absolute -bottom-10 -right-4 w-32 h-32 bg-white/10 rounded-full blur-sm pointer-events-none" />
              
              <div className="flex justify-between items-start z-10">
                <div className="w-12 h-12 bg-[#4527a0]/60 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreHorizontal className="w-6 h-6 text-indigo-200" />
                </button>
              </div>

              <div className="z-10 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">$500.00</span>
                  <span className="w-6 h-6 bg-indigo-500/40 rounded-full flex items-center justify-center text-xs">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </span>
                </div>
                <p className="text-indigo-200 text-sm mt-1 font-medium">Total Earning</p>
              </div>
            </div>

            {/* Card 2: Total Order (4 cols) */}
            <div className="md:col-span-4 bg-[#1e2846] rounded-2xl p-6 relative overflow-hidden shadow-lg flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start z-10">
                <div className="w-10 h-10 bg-[#212946] border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="bg-[#151c33] p-1 rounded-xl flex items-center text-xs font-semibold">
                  <button className="px-3 py-1.5 text-gray-300 hover:text-white rounded-lg">Month</button>
                  <button className="px-3 py-1.5 bg-[#2196f3] text-white rounded-lg shadow-sm">Year</button>
                </div>
              </div>

              <div className="z-10 mt-2 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-3xl font-bold">$961</span>
                    <span className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center text-xs text-blue-400">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1 font-medium">Total Order</p>
                </div>
                
                <svg className="w-24 h-10 text-white stroke-current" fill="none" viewBox="0 0 100 40">
                  <path d="M0 30 Q 20 5, 40 25 T 80 10 T 100 5" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 3: Small Stacked Cards (3 cols) */}
            <div className="md:col-span-3 flex flex-col justify-between gap-4">
              <div className="bg-[#2196f3] rounded-2xl p-4 flex items-center gap-4 shadow-lg">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Table className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold leading-tight">$203k</h4>
                  <p className="text-blue-100 text-xs mt-0.5">Total Income</p>
                </div>
              </div>

              <div className="bg-[#1e2846] rounded-2xl p-4 flex items-center gap-4 shadow-lg relative overflow-hidden">
                <div className="w-10 h-10 bg-[#293556] rounded-xl flex items-center justify-center text-amber-400 shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold leading-tight">$203k</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Total Income</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-amber-500/10 rounded-full blur-md" />
              </div>
            </div>

          </div>

          {/* Main Bar Chart Box */}
          <div className="bg-[#1e2846] rounded-2xl p-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Growth</span>
                <h3 className="text-2xl font-bold text-white mt-1">$2,324.00</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="bg-[#111936] text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 border border-gray-700/50">
                  Today <ChevronDown className="w-4 h-4" />
                </button>
                <button className="bg-[#111936] text-gray-300 hover:text-white p-2.5 rounded-xl border border-gray-700/50">
                  <Menu className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative pt-4">
              <div className="space-y-8 text-xs text-gray-400 border-b border-gray-700/40 pb-2">
                {['400', '300', '200', '100', '0'].map((val, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-8 text-right shrink-0">{val}</span>
                    <div className="w-full border-b border-gray-700/30" />
                  </div>
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-7 left-12 right-0 flex justify-between items-end px-2">
                {[
                  { inv: 35, loss: 35, profit: 35, maint: 0 },
                  { inv: 125, loss: 15, profit: 85, maint: 60 },
                  { inv: 35, loss: 15, profit: 35, maint: 75 },
                  { inv: 35, loss: 35, profit: 35, maint: 0 },
                  { inv: 35, loss: 65, profit: 20, maint: 0 },
                  { inv: 80, loss: 40, profit: 105, maint: 115 },
                  { inv: 35, loss: 80, profit: 100, maint: 0 },
                  { inv: 25, loss: 20, profit: 10, maint: 0 },
                  { inv: 35, loss: 15, profit: 65, maint: 0 },
                  { inv: 45, loss: 85, profit: 45, maint: 0 },
                  { inv: 25, loss: 20, profit: 25, maint: 150 },
                  { inv: 75, loss: 75, profit: 10, maint: 0 },
                ].map((item, index) => (
                  <div key={index} className="w-7 flex flex-col justify-end gap-1 items-center">
                    {item.maint > 0 && <div style={{ height: `${item.maint * 0.6}px` }} className="w-full bg-[#673ab7] rounded-sm" />}
                    {item.profit > 0 && <div style={{ height: `${item.profit * 0.6}px` }} className="w-full bg-[#7c4dff] rounded-sm" />}
                    {item.loss > 0 && <div style={{ height: `${item.loss * 0.6}px` }} className="w-full bg-[#90caf9] rounded-sm" />}
                    {item.inv > 0 && <div style={{ height: `${item.inv * 0.6}px` }} className="w-full bg-[#2196f3] rounded-sm" />}
                  </div>
                ))}
              </div>

              <div className="flex justify-between left-12 right-0 pl-12 text-xs text-gray-400 mt-3">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <span key={month} className="w-7 text-center">{month}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#2196f3] rounded-sm" /> Investment
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#90caf9] rounded-sm" /> Loss
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#7c4dff] rounded-sm" /> Profit
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#673ab7] rounded-sm" /> Maintenance
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR COLUMN (4 cols) ================= */}
        <div className="lg:col-span-4">
          <div className="bg-[#1e2846] rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Popular Stocks</h3>
                <button className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#d1c4e9] to-[#b39ddb] rounded-2xl p-5 text-gray-900 shadow-md mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-base text-[#4527a0]">Bajaj Finery</h4>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">10% Profit</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">$1839.00</span>
                </div>

                <div className="h-20 w-full mt-2">
                  <svg className="w-full h-full" viewBox="0 0 200 60" fill="none">
                    <path
                      d="M0 45 C 30 40, 50 48, 80 40 C 110 10, 130 35, 160 25 C 180 20, 190 30, 200 35 L 200 60 L 0 60 Z"
                      fill="url(#purpleGradient)"
                      opacity="0.4"
                    />
                    <path
                      d="M0 45 C 30 40, 50 48, 80 40 C 110 10, 130 35, 160 25 C 180 20, 190 30, 200 35"
                      stroke="#7c4dff"
                      strokeWidth="2.5"
                    />
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c4dff" />
                        <stop offset="100%" stopColor="#d1c4e9" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { name: 'Bajaj Finserv', profit: '10% Profit', isProfit: true, val: '$1839.00' },
                  { name: 'TTML', profit: '10% Loss', isProfit: false, val: '$100.00' },
                  { name: 'Reliance', profit: '10% Profit', isProfit: true, val: '$200.00' },
                  { name: 'TTML', profit: '10% Loss', isProfit: false, val: '$189.00' },
                  { name: 'Stolon', profit: '10% Loss', isProfit: false, val: '$189.00' },
                ].map((stock, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-gray-700/30 last:border-0">
                    <div>
                      <h5 className="font-semibold text-sm text-white">{stock.name}</h5>
                      <span className={`text-xs font-medium ${stock.isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {stock.profit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{stock.val}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${stock.isProfit ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {stock.isProfit ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="text-[#2196f3] hover:text-blue-400 font-semibold text-sm inline-flex items-center gap-1 transition-colors">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Links */}
      <footer className="max-w-[1400px] mx-auto mt-12 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© All rights reserved <span className="text-indigo-400 font-medium">CodedThemes</span></p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-300">License</a>
          <a href="#" className="hover:text-gray-300">Hire us</a>
          <a href="#" className="hover:text-gray-300">Terms</a>
          <a href="#" className="hover:text-gray-300">Figma Design System</a>
        </div>
      </footer>
    </div>
  );
}

export default DashboardSection;