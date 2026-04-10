import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";

const App = () => {
  const addJob = async (newJob) => {
    console.log("Adding job:", newJob);
    // Here you would typically send the new job data to your backend API
    // For example:
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    })
      .then((response) => response.json())
      .then((data) => console.log("Job added:", data))
      .catch((error) => console.error("Error adding job:", error));
  };

  const deleteJob = async (jobId) => {
    console.log("Deleting job with ID:", jobId);
    // Here you would typically send a delete request to your backend API
    // For example:
    await fetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Job deleted successfully");
        } else {
          console.error("Failed to delete job");
        }
      })
      .catch((error) => console.error("Error deleting job:", error));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
