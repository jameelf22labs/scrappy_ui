import axios from "axios";
import qs from "qs";
import handleApi from "./handle.api";
import type { CheckEventResponse, GetAllEventResponse } from "./types";

export default class EventApi {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:9090/api/v1/events";
  }

  async httpCheckEventStatus(eventId: string) {
    return handleApi<CheckEventResponse>(
      axios.get(`${this.baseUrl}/status/${eventId}`)
    );
  }

  async httpGetAllEvents(query?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    return handleApi<GetAllEventResponse>(
      axios.get(`${this.baseUrl}/all`, {
        params: query,
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, {
              skipNulls: true,
              encode: true,
            }),
        },
      })
    );
  }
}
