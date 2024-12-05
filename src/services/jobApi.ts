import axios from 'axios';

interface JobFilter {
  description?: string;
  location?: string;
  full_time?: boolean;
  page?: number;
}

export const getJobs = async (filter: JobFilter = {}) => {
  const params = new URLSearchParams();
  
  if (filter.description) params.append('description', filter.description);
  if (filter.location) params.append('location', filter.location);
  if (filter.full_time) params.append('full_time', 'true');
  if (filter.page) params.append('page', filter.page.toString());

  try {
    const response = await axios.get('/api/recruitment/positions.json', { 
      params,
      headers: {
        'Accept': 'application/json',
      }
    });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const getJobDetail = async (id: string) => {
  try {
    const response = await axios.get(`/api/recruitment/positions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job detail:', error);
    throw error;
  }
};