import jobsData from '../../data/jobs.json'

export type Job = (typeof jobsData.jobs)[number]
export type Company = typeof jobsData.company

export const company: Company = jobsData.company
export const jobs: Job[] = jobsData.jobs

export function getJob(id: string): Job | undefined {
  return jobs.find((job) => job.id === id)
}
