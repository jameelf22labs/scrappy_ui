import EventApi from "./event.http";
import JobApi from "./jobs.http";

export default class ApiFactory {
  static httpEvent() {
    return new EventApi();
  }

  static httpJobs() {
    return new JobApi();
  }
}
