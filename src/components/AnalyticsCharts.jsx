import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function AnalyticsCharts({ closings }) {
  const data = closings.map((c) => ({
    date: new Date(c.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    sales: c.totalSalesAmount,
    profit: c.estimatedProfit,
    loss: c.estimatedLoss,
    lowStock: c.lowStockCount,
  })).reverse();

  return (
    <div className="row g-3">
      <div className="col-lg-6"><div className="card p-2 shadow-sm"><h6>Daily Sales Graph</h6><ResponsiveContainer width="100%" height={250}><LineChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date"/><YAxis/><Tooltip/><Legend/><Line type="monotone" dataKey="sales" stroke="#198754"/></LineChart></ResponsiveContainer></div></div>
      <div className="col-lg-6"><div className="card p-2 shadow-sm"><h6>Profit vs Loss Graph</h6><ResponsiveContainer width="100%" height={250}><BarChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date"/><YAxis/><Tooltip/><Legend/><Bar dataKey="profit" fill="#0d6efd"/><Bar dataKey="loss" fill="#dc3545"/></BarChart></ResponsiveContainer></div></div>
      <div className="col-lg-6"><div className="card p-2 shadow-sm"><h6>Stock Alert Trend</h6><ResponsiveContainer width="100%" height={250}><LineChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="date"/><YAxis/><Tooltip/><Line dataKey="lowStock" stroke="#ffc107"/></LineChart></ResponsiveContainer></div></div>
    </div>
  );
}

export default AnalyticsCharts;
