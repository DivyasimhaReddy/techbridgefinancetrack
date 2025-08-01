import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  User, 
  Users 
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/transactions', icon: Receipt, label: 'Transactions' },
    { to: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ to: '/users', icon: Users, label: 'Users' });
  }

  return (
    <aside className="fixed left-0 top-20 w-64 h-full bg-white/80 backdrop-blur-md border-r border-slate-200/60 hidden lg:block shadow-sm">
      <nav className="p-6">
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Navigation
          </h2>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`
                }
              >
                <item.icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="px-4 py-3 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Current Plan</p>
            <p className="text-sm font-medium text-slate-800">Free Plan</p>
            <p className="text-xs text-slate-500 mt-1">Basic features included</p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;