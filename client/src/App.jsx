import { Routes, Route } from 'react-router-dom';
import Dashboard from './features/dashboard/Dashboard';
import CreateTask from './features/tasks/CreateTask';
import EditTask from './features/tasks/EditTask';
import Profile from './features/profile/Profile';
import Analytics from './features/analytics/Analytics';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
          path="/"
        />
        <Route
          element={
            <>
              <Navbar />
              <CreateTask />
            </>
          }
          path="/tasks/create"
        />
        <Route
          element={
            <>
              <Navbar />
              <EditTask />
            </>
          }
          path="/tasks/edit/:id"
        />
        <Route
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
          path="/profile"
        />
        <Route
          element={
            <>
              <Navbar />
              <Analytics />
            </>
          }
          path="/analytics"
        />
      </Route>
    </Routes>
  );
};

export default App;
