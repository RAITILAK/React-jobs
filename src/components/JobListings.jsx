import { useState, useEffect } from "react";
import JobListing from "./JobListing";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      // const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
      const apiUrl = isHome ? "/api/jobs?_per_page=3" : "/api/jobs";
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("IS ARRAY:", Array.isArray(data));
        console.log("DATA:", data);
        console.log("DATA:", data); // 🔍 DEBUG
        setJobs(Array.isArray(data) ? data : data.data || []);
        // setJobs(Array.isArray(data) ? data : data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center col-span-full">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-center col-span-full">No jobs found.</p>
          ) : (
            jobs.map((job) => <JobListing key={job.id} job={job} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
