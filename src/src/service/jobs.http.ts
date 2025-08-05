import axios from "axios";
import qs from "qs";
import handleApi from "./handle.api";
import type {
  GetAllJobsResponse,
  JobQueryParams,
  StartScrappingResponse,
} from "./types";

export default class JobApi {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:9090/api/v1/jobs";
  }

  async httpGetAllJobs(query: JobQueryParams) {
    return handleApi<GetAllJobsResponse>(
      axios.get(`${this.baseUrl}/get-jobs`, {
        params: query,
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, {
              skipNulls: false,
              encode: true,
            }),
        },
      })
    );
  }

  async httpStartScrapping() {
    return handleApi<StartScrappingResponse>(
      axios.post(`${this.baseUrl}/start-scarppe`)
    );
  }
}
