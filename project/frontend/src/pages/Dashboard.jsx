import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import TransactionForm from '../components/TransactionForm';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTransactions();
  }, [timeRange]);

  const fetchTransactions = useCallback(async () => {
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
  }, [API_URL, timeRange]);

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

  const handleSaveTransaction = useCallback(async (transactionData) => {
    console.log('handleSaveTransaction called with:', transactionData);
    try {
      if (editingTransaction) {
        console.log('Editing transaction:', editingTransaction._id);
        await axios.put(`${API_URL}/transactions/${editingTransaction._id}`, transactionData);
      } else {
        console.log('Creating new transaction');
        await axios.post(`${API_URL}/transactions`, transactionData);
      }
      
      console.log('Transaction saved successfully');
      fetchTransactions();
      setShowForm(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  }, [editingTransaction, API_URL, fetchTransactions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-slate-600 mt-2">
            Here's your financial overview for {timeRange === 'week' ? 'this week' : timeRange === 'month' ? 'this month' : 'this year'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
              <TrendingUp size={24} className="text-white" />
            </div>
            <ArrowUpRight size={20} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-slate-600 text-sm font-medium">Total Income</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">${stats.income.toFixed(2)}</p>
            <p className="text-emerald-600 text-sm mt-2 flex items-center">
              <TrendingUp size={14} className="mr-1" />
              +12.5% from last period
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
              <TrendingDown size={24} className="text-white" />
            </div>
            <ArrowDownRight size={20} className="text-red-500" />
          </div>
          <div>
            <p className="text-slate-600 text-sm font-medium">Total Expenses</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">${stats.expenses.toFixed(2)}</p>
            <p className="text-red-600 text-sm mt-2 flex items-center">
              <TrendingDown size={14} className="mr-1" />
              +8.2% from last period
            </p>
          </div>
        </div>

        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 ${
          stats.balance >= 0 ? 'ring-1 ring-emerald-200' : 'ring-1 ring-red-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl shadow-lg ${
              stats.balance >= 0 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                : 'bg-gradient-to-r from-orange-500 to-orange-600'
            }`}>
              <DollarSign size={24} className="text-white" />
            </div>
            {stats.balance >= 0 ? (
              <ArrowUpRight size={20} className="text-emerald-500" />
            ) : (
              <ArrowDownRight size={20} className="text-red-500" />
            )}
          </div>
          <div>
            <p className="text-slate-600 text-sm font-medium">Net Balance</p>
            <p className={`text-3xl font-bold mt-1 ${
              stats.balance >= 0 ? 'text-slate-800' : 'text-slate-800'
            }`}>
              ${stats.balance.toFixed(2)}
            </p>
            <p className={`text-sm mt-2 flex items-center ${
              stats.balance >= 0 ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {stats.balance >= 0 ? (
                <>
                  <TrendingUp size={14} className="mr-1" />
                  +4.3% from last period
                </>
              ) : (
                <>
                  <TrendingDown size={14} className="mr-1" />
                  -2.1% from last period
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Recent Transactions</h2>
              <p className="text-slate-600 text-sm mt-1">Your latest financial activities</p>
            </div>
            <div className="flex items-center space-x-2">
              <PieChart size={24} className="text-slate-400" />
              <button 
                onClick={() => {
                  console.log('Add Transaction button clicked');
                  setShowForm(true);
                }}
                className="flex items-center space-x-2 px-3 py-2 md:px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-xs md:text-sm"
              >
                <Plus size={14} className="md:w-4 md:h-4" />
                <span className="font-medium">Add Transaction</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No transactions found</p>
              <p className="text-slate-500 text-sm mt-1">
                Start by adding your first transaction to track your finances
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-all duration-200 border border-slate-200/30"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.type === 'income' ? 'bg-emerald-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {transaction.description || transaction.category}
                      </p>
                      <p className="text-sm text-slate-500">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className={`font-bold text-lg ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-3">Financial Tips</h3>
          <p className="text-blue-100 text-sm mb-4">
            Track your expenses regularly to maintain better financial health and achieve your goals faster.
          </p>
          <div className="text-blue-200 text-xs flex items-center">
            <span className="mr-2">💡</span>
            Review your spending patterns weekly for better insights
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-3">Budget Goal</h3>
          <p className="text-emerald-100 text-sm mb-4">
            Set monthly spending limits to achieve your financial goals and build wealth over time.
          </p>
          <div className="text-emerald-200 text-xs flex items-center">
            <span className="mr-2">🎯</span>
            Goal: Save 20% of your income monthly
          </div>
        </div>
      </div>

      {/* Transaction Form Modal */}
      {showForm && (
        <>
          {console.log('Rendering TransactionForm modal')}
          <TransactionForm
            transaction={editingTransaction}
            onSave={handleSaveTransaction}
            onCancel={() => {
              console.log('TransactionForm cancelled');
              setShowForm(false);
              setEditingTransaction(null);
            }}
            isReadOnly={false}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;