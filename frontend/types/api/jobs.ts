export interface Job {
  category: string;
  details: string[];
}

export interface ResponseJobs {
  jobs: Job[];
}
