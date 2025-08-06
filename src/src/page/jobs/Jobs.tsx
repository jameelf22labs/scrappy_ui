import { useEffect, useState } from "react";
import type { JSX } from "react";
import { IoReload } from "react-icons/io5";
import { Pagination } from "antd";
import ApiFactory from "../../service/api.factor";
import type {
  GetAllJobsResponse,
  JobQueryParams,
  JobsType,
} from "../../service/types";
import "./style.css";
import { toast } from "sonner";

const Jobs = (): JSX.Element => {
  const httpJobs = ApiFactory.httpJobs();
  const [jobs, setJobs] = useState<JobsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<
    Omit<JobQueryParams, "page" | "limit">
  >({
    title: "",
    remote: "",
    type: "",
    location: "",
  });

  const fetchJobs = async (pageNumber = 1, appliedFilters = filters) => {
    setLoading(true);
    try {
      const params: JobQueryParams = {
        ...appliedFilters,
        page: pageNumber,
        limit: 15,
      };
      const res: GetAllJobsResponse = await httpJobs.httpGetAllJobs(params);
      setJobs(res.jobs.jobs);
      setTotalPages(res.jobs.totalPages);
      setPage(res.jobs.currentPage);
    } catch (err) {
      console.error("Error from fetch : ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  const handleReload = () => fetchJobs(page, filters);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchJobs(newPage, filters);
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    fetchJobs(1, updated);
    setPage(1);
  };

  const triggerCrawler = () => {
    httpJobs.httpStartScrapping().then((event) => {
      toast(
        <span className="text-[16px]">
          Scrapping Started
          <span className="font-semibold text-green-500 ml-2">{event.eventId}</span>.
          Check status from
          <a href="/event" className="underline ml-2 text-blue-500">events</a>.
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col items-center px-4 py-10 pt-20 min-h-screen h-full bg-[#0d1117] text-white">
      <div className="w-full max-w-7xl flex justify-between items-center mb-8">
        <h1 className="font-bold text-3xl text-white">Jobs</h1>

        <div className="flex gap-4">
          <button
            onClick={triggerCrawler}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
          >
            Crawling
          </button>

          <button
            onClick={handleReload}
            title="Reload"
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-400 transition"
          >
            <IoReload className="text-xl" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Title"
          value={filters.title}
          onChange={(e) => updateFilter("title", e.target.value)}
          className="px-4 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <select
          value={filters.remote}
          onChange={(e) => updateFilter("remote", e.target.value)}
          className="px-4 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700"
        >
          <option value="">All Tunnels</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <select
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="px-4 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700"
        >
          <option value="">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="px-4 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700"
        />
      </div>

      {loading ? (
        <div className="mt-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent animate-spin rounded-full" />
        </div>
      ) : (
        <div className="w-full max-w-7xl overflow-x-auto bg-[#1e1e1e] shadow-lg rounded-lg border border-gray-700">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-[#161b22] text-gray-400">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Tunnel</th>
                <th className="px-6 py-4">Posted</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-gray-700 hover:bg-[#2c313c] transition"
                >
                  <td className="px-6 py-4">{job.jobTitle}</td>
                  <td className="px-6 py-4">{job.jobType}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs font-semibold">
                      {job.remote}
                    </span>
                  </td>
                  <td className="px-6 py-4">{job.postedAt ?? "N/A"}</td>
                  <td className="px-6 py-4">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && (
        <div className="mt-6 flex justify-center w-full">
          <Pagination
            total={totalPages * 15}
            current={page}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper={false}
            className="dark-pagination"
          />
        </div>
      )}
    </div>
  );
};

export default Jobs;
