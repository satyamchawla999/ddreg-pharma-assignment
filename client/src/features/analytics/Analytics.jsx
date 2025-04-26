import { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { taskService } from '../../api/taskService';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await taskService.getAnalytics();
        setAnalytics(response);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {!analytics ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded shadow text-center">
              <h2 className="text-xl font-bold">Total Tasks</h2>
              <p className="text-2xl mt-2">{analytics.totalTasks}</p>
            </div>
            <div className="bg-green-100 p-6 rounded shadow text-center">
              <h2 className="text-xl font-bold">Completed</h2>
              <p className="text-2xl mt-2">{analytics.completedTasks}</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded shadow text-center">
              <h2 className="text-xl font-bold">Pending</h2>
              <p className="text-2xl mt-2">{analytics.pendingTasks}</p>
            </div>
          </div>

          {/* Task Distribution Pie Chart */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Task Distribution (Priority)</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={analytics.priorityDistribution}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {analytics.priorityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Completion Rate Over Time Line Chart */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Completion Rate Over Time</h2>
            <LineChart
              width={600}
              height={300}
              data={analytics.completionOverTime}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </div>

          {/* Upcoming Deadlines List */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Upcoming Deadlines (Next 7 Days)</h2>
            <div className="bg-gray-100 p-4 rounded shadow">
              {analytics.upcomingDeadlines.length === 0 ? (
                <p>No upcoming deadlines.</p>
              ) : (
                <ul className="space-y-3">
                  {analytics.upcomingDeadlines.map(task => (
                    <li key={task._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-gray-500 text-sm">Priority: {task.priority}</p>
                      </div>
                      <div className="text-gray-700 font-medium">
                        {new Date(task.dueDate).toISOString().split('T')[0]}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
