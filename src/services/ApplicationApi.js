import API from "./Api";

export const applyJob = (data) => {
    const headers = data instanceof FormData ? {} : { "Content-Type": "application/json" };

    return API.post(
        "/application/apply",
        data,
        { headers }
    );
};

export const getCompanyApplications = () =>
    API.get(
        "/application/company-applications"
    );

export const getCandidateApplications = () =>
    API.get(
        "/application/my-applications"
    );

export const getJobRanking = (jobId) =>
    API.get(
        `/application/job-ranking/${jobId}`
    );

export const updateApplicationStatus = (id, status) =>
    API.patch(
        `/application/status/${id}`,
        { status }
    );