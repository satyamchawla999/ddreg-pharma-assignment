import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskService } from '../../api/taskService';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await taskService.getTask(id);
        const taskData = response;

        setTask({
          title: taskData.title || '',
          description: taskData.description || '',
          dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : '',
          priority: taskData.priority || 'medium'
        });
      } catch (error) {
        console.error('Failed to fetch task', error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.updateTask(id, task);
      navigate('/');
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center h-200 bg-gray-50 px-2">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={task.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={task.dueDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Priority</label>
            <select
              name="priority"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-6 space-x-4">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
            >
              Update Task
            </button>
            <Link
              to={`/`}
              className="w-full bg-red-500 text-center text-white py-2 rounded hover:bg-red-600 transition"
            >
              Back
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditTask;
