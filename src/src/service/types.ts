export interface SuccessResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  status: boolean;
  error: string;
  message: string;
  details?: any;
}

export type JobsType = {
  id: string;
  jobTitle: string;
  remote: string;
  jobType: string;
  location: string;
  postedAt?: string;
  salary?: string;
  url: string;
  hasKey: string;
};

export type GetAllJobsResponse = {
  jobs: {
    jobs: JobsType[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
};

export type StartScrappingResponse = {
  eventId: string;
};

export type JobQueryParams = {
  title?: string;
  remote?: string;
  type?: string;
  location?: string;
  page: number;
  limit: number;
};

export type EventsType = {
  id: string;
  status: "Failed" | "Success" | "Pause" | "Running";
  isError: boolean;
  errorMessage: string;
  data: string;
};

export type CheckEventResponse = {
  events: EventsType;
};
