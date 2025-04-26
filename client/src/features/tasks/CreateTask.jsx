import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { taskService } from '../../api/taskService';

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask({ title, description, dueDate, priority });
      navigate('/');
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-200 bg-gray-50 px-2">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Due Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Priority</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-6 space-x-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Create Task
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

export default CreateTask;
