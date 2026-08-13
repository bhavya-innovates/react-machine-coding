import { useState, useEffect } from "react";

const JobsBoard = () => {
  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);

  const PAGE_SIZE = 6;

  useEffect(() => {
    init();
  }, []);

  const getJobIds = async () => {
    const url = "https://hacker-news.firebaseio.com/v0/jobstories.json";
    const data = await fetch(url);
    const ids = await data.json();

    return ids;
  };

  const fetchJobsById = async (ids) => {
    const jobData = await Promise.all(
      ids.map(async (id) => {
        const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const data = await fetch(url);
        const res = await data.json();

        return res;
      }),
    );
    return jobData;
  };

  const init = async () => {
    const ids = await getJobIds();
    setJobIds(ids);

    const firstBatch = ids.slice(0, PAGE_SIZE);

    const jobData = await fetchJobsById(firstBatch);

    setJobs(jobData);
    setOffset(PAGE_SIZE);
  };

  const handleLoadMore = async () => {
    const nextBatch = jobIds.slice(offset, offset + PAGE_SIZE);

    const jobData = await fetchJobsById(nextBatch);

    setJobs(jobData);
    setOffset(offset + PAGE_SIZE);
  };

  const hasMore = offset < jobIds.length;

  return (
    <div>
      <h1>Hacker News Jobs Board</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <a href={job.url} target="_blank">
              <h3>{job.title}</h3>
            </a>
            <p>
              <span>By: {job.by} </span>
              <span>Time: {job.time}</span>
            </p>
          </li>
        ))}
      </ul>
      {hasMore ? (
        <button onClick={handleLoadMore}>Load More Jobs</button>
      ) : (
        <p>No more jobs found!</p>
      )}
    </div>
  );
};

export default JobsBoard;
