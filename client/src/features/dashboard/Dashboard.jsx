import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { taskService } from '../../api/taskService';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');

  const fetchTasks = async () => {
    try {
      const response = await taskService.listTasks(sortBy, order);
      setTasks(response);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleStatusChange = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      await taskService.updateTask(task._id, { status: newStatus });
      setTasks(tasks.map(t => t._id === task._id ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [sortBy, order]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          to="/tasks/create"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Task
        </Link>
      </div>

      {/* Sorting Filters */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label className="block mb-1 font-semibold">Sort By</label>
          <select
            className="border rounded px-3 py-2"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Default</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Order</label>
          <select
            className="border rounded px-3 py-2"
            value={order}
            onChange={handleOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <p>Loading...</p>
      ) : tasks?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-12">
          <p className="text-center text-gray-500">No tasks available.</p>
        </div>
      ) : (
        <table className="table-fixed w-full">
          <thead className="bg-gray-100">
            <tr className="rounded">
              <td className="pl-4 py-4 w-48 font-bold">Title</td>
              <td className="py-4 w-64 font-bold">Description</td>
              <td className="p-4 w-32 font-bold text-center">Priority</td>
              <td className="p-4 w-40 font-bold text-center">Due Date</td>
              <td className="p-4 w-32 font-bold text-center">Status</td>
              <td className="pr-4 p-4 w-56 font-bold text-center">Actions</td>
            </tr>
          </thead>

          <tbody className="space-y-4">
            {tasks.map((task) => (
              <tr key={task._id} className="bg-white shadow rounded mb-4">
                <td className="px-4 py-2 w-48">
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                </td>
                <td className="px-4 py-2 w-64">
                  <p className="text-gray-600">{task.description}</p>
                </td>
                <td className="px-4 py-2 w-32 text-center">
                  <p className="text-gray-600">{task.priority}</p>
                </td>
                <td className="px-4 py-2 w-40 text-center">
                  <p className="text-gray-600">{new Date(task.dueDate).toISOString().split('T')[0]}</p>
                </td>
                <td className="px-4 py-2 w-32 text-center">
                  <p className="text-gray-600">{task.status === 'pending' ? 'Pending' : 'Completed'}</p>
                </td>
                <td className="px-4 py-2 w-56">
                  <div className="flex justify-center space-x-4">
                    <Link
                      to={`/tasks/edit/${task._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleStatusChange(task)}
                      className="text-green-600 hover:underline"
                    >
                      {task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
