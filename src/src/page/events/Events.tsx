import { useEffect, useState } from "react";
import type { JSX } from "react";
import { Pagination, Select } from "antd";
import type { EventsType } from "../../service/types";
import ApiFactory from "../../service/api.factor";
import type { GetAllEventResponse } from "../../service/types";

const Events = (): JSX.Element => {
  const [events, setEvents] = useState<EventsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const fetchEvents = async (page = 1, limit = 10, status?: string) => {
    setLoading(true);
    const eventApi = ApiFactory.httpEvent();
    const result = await eventApi.httpGetAllEvents({
      page,
      limit,
      status,
    });
    if (result) {
      const { events, pagination } = result as GetAllEventResponse;
      setEvents(events);
      setTotalItems(pagination.totalItems);
      setCurrentPage(pagination.currentPage);
      setPageSize(parseInt(pagination.pageSize));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents(currentPage, pageSize, statusFilter);
  }, [currentPage, pageSize, statusFilter]);

  const onPageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="flex flex-col items-center pt-30 min-h-screen h-full bg-[#0d1117] text-white">
      <div className="w-full max-w-7xl items-center mb-8">
        <h1 className="text-2xl font-bold mb-4">All Events</h1>

        <div className="mb-6 flex justify-end">
          <select
            value={statusFilter || ""}
            onChange={(e) =>
              setStatusFilter(
                e.target.value === "" ? "" : e.target.value
              )
            }
            className="px-4 py-2 rounded-md bg-[#1e1e1e] text-white border border-gray-700"
          >
            <option value="">All Status</option>
            <option value="Running">Running</option>
            <option value="Pause">Pause</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {loading ? (
          <div className="text-white p-4">Loading events...</div>
        ) : (
          <>
            <ul className="space-y-3">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm"
                >
                  <p>
                    <strong>ID:</strong> {event.id}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        event.status === "Success"
                          ? "text-green-500"
                          : event.status === "Failed"
                          ? "text-red-500"
                          : event.status === "Pause"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }
                    >
                      {event.status}
                    </span>
                  </p>
                  {event.isError && (
                    <p className="text-red-400">
                      <strong>Error:</strong> {event.errorMessage}
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center w-full">
              <Pagination
                total={totalItems}
                current={currentPage}
                pageSize={pageSize}
                onChange={onPageChange}
                showSizeChanger={false}
                showQuickJumper={false}
                className="dark-pagination"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
