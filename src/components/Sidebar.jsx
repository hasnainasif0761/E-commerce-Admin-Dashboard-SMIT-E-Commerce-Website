import React from 'react';
import { 
  Gauge, 
  Tv, 
  FileText, 
  LifeBuoy, 
  Newspaper, 
  PieChart, 
  ClipboardList 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isCollapsed, activeTab, setActiveTab }) => {
  const menuSections = [
  {
    title: 'Dashboard',
    items: [
      { id: 'default', label: 'Dashboard', icon: Gauge, path: '/' },
      { id: 'analytics', label: 'Analytics', icon: Tv, path: '/analytics' },
      { id: 'invoice', label: 'Invoice', icon: FileText, path: '/invoice' },
      { id: 'crm', label: 'CRM', icon: LifeBuoy, path: '/crm' },
      { id: 'blog', label: 'Blog', icon: Newspaper, path: '/blog' },
    ]
  },
  {
    title: 'Widget',
    items: [
      { id: 'statistics', label: 'Statistics', icon: PieChart, path: '/statistics' },
      { id: 'data', label: 'Data', icon: ClipboardList, path: '/data' },
    ]
  }
];


  return (
    <aside 
      className={`bg-[#111936] fixed top-[65px] text-[#bdc8f0] h-screen transition-all duration-300 border-r border-[#1e295d]/30 flex flex-col ${
        isCollapsed ? 'w-20 items-center px-2' : 'w-64 px-4'
      } py-4`}
    >
      <div className="w-full space-y-6">
        {menuSections.map((section, idx) => (
          <div key={idx} className="w-full">
            {/* Section Header Title */}
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-gray-400 px-3 mb-2 tracking-wider">
                {section.title}
              </h3>
            )}

            {/* Menu Items */}
            <div className="space-y-1.5 w-full">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <Link
                    to={item.path}
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    title={isCollapsed ? item.label : ''}
                    className={`w-full flex items-center transition-all duration-200 rounded-xl ${
                      isCollapsed 
                        ? 'justify-center p-3' 
                        : 'gap-3.5 px-4 py-3 text-sm font-medium'
                    } ${
                      isActive
                        ? 'bg-[#21214e] text-[#8e61ff]'
                        : 'text-[#9fa8da] hover:bg-[#1a223f] hover:text-[#7c4dff]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#a855f7]' : 'text-[#9fa8da]'}`} />
                    
                    {!isCollapsed && (
                      <span className={isActive ? 'font-semibold text-[#8e61ff]' : ''}>
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider line between sections */}
            {!isCollapsed && idx < menuSections.length - 1 && (
              <hr className="border-[#1e295d]/50 my-4 mx-2" />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;