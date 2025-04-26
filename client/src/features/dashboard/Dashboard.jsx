import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { taskService } from '../../api/taskService';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await taskService.listTasks();
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

  useEffect(() => {
    fetchTasks();
  }, []);

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

      <div className="grid gap-4">
        <thead className="bg-gray-100">
          <tr className="rounded flex justify-between items-center">
            <th className="p-4 ">Title</th>
            <th className="p-4 ">Description</th>
            <th className="p-4 ">Actions</th>
          </tr>
        </thead>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : tasks?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-12">
          <p className="text-center text-gray-500">No tasks available.</p>
        </div>
      ) : (
        <div className="grid gap-4">

          {tasks?.map((task) => (
            <div key={task._id} className="bg-white p-4 shadow rounded flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
              </div>
              <div>
                <p className="text-gray-600 text-right">{task.description}</p>
              </div>
              <div className="flex space-x-4">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
