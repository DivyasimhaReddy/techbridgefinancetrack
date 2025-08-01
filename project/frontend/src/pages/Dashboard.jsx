import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Calendar
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTransactions();
  }, [timeRange]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`, {
        params: { timeRange }
      });
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    
    return { income, expenses, balance };
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your financial overview
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar size={20} className="text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="select-field min-w-0"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Income</p>
              <p className="text-2xl font-bold">${stats.income.toFixed(2)}</p>
            </div>
            <TrendingUp size={32} className="text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold">${stats.expenses.toFixed(2)}</p>
            </div>
            <TrendingDown size={32} className="text-red-200" />
          </div>
        </div>

        <div className={`card text-white ${
          stats.balance >= 0 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
            : 'bg-gradient-to-r from-orange-500 to-orange-600'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${
                stats.balance >= 0 ? 'text-blue-100' : 'text-orange-100'
              }`}>
                Net Balance
              </p>
              <p className="text-2xl font-bold">${stats.balance.toFixed(2)}</p>
            </div>
            <DollarSign size={32} className={
              stats.balance >= 0 ? 'text-blue-200' : 'text-orange-200'
            } />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          <PieChart size={24} className="text-gray-500" />
        </div>

        {recentTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">
              Start by adding your first transaction
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.description || transaction.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <h3 className="text-lg font-semibold mb-2">Financial Tips</h3>
          <p className="text-primary-100 text-sm mb-4">
            Track your expenses regularly to maintain better financial health.
          </p>
          <div className="text-primary-200 text-xs">
            💡 Tip: Review your spending patterns weekly
          </div>
        </div>

        <div className="card bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
          <h3 className="text-lg font-semibold mb-2">Budget Goal</h3>
          <p className="text-secondary-100 text-sm mb-4">
            Set monthly spending limits to achieve your financial goals.
          </p>
          <div className="text-secondary-200 text-xs">
            🎯 Goal: Save 20% of your income
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;