import axios from "axios";
import handleApi from "./handle.api";
import type { CheckEventResponse, EventsType } from "./types";

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

  async httpGetAllEvents() {
    return handleApi<{ events: EventsType[] }>(
      axios.get(`${this.baseUrl}/all`)
    );
  }
}
