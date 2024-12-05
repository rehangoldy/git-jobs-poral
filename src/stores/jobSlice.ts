import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getJobs, getJobDetail } from '../services/jobApi';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  created_at: string;
  company_logo: string;
  company_url?: string;
  description?: string;
  how_to_apply?: string;
}

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  filters: {
    description: string;
    location: string;
    full_time: boolean;
  };
}

const initialState: JobState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
  filters: {
    description: '',
    location: '',
    full_time: false,
  },
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { getState, rejectWithValue }) => {
    const { job: { page, filters } } = getState() as { job: JobState };
    try {
      const data = await getJobs({ ...filters, page });
      return data || []; // Ensure we always return an array
    } catch (error) {
      return rejectWithValue('Failed to fetch jobs');
    }
  }
);

export const fetchJobDetail = createAsyncThunk(
  'jobs/fetchJobDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getJobDetail(id);
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch job detail');
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<JobState['filters']>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
      state.jobs = [];
      state.hasMore = true;
    },
    resetJobs(state) {
      state.jobs = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        const newJobs = action.payload || [];
        
        // Ensure we have valid jobs before processing
        if (Array.isArray(newJobs)) {
          // Create a Set of existing job IDs for quick lookup
          const existingJobIds = new Set(state.jobs.map(job => job.id));
          
          // Filter out any duplicates and null values from newJobs
          const uniqueNewJobs = newJobs.filter(job => 
            job && 
            job.id && 
            !existingJobIds.has(job.id)
          );
          
          state.jobs = [...state.jobs, ...uniqueNewJobs];
          state.hasMore = uniqueNewJobs.length > 0;
        } else {
          state.hasMore = false;
        }
        
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch jobs';
        state.hasMore = false;
      })
      .addCase(fetchJobDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDetail.fulfilled, (state, action) => {
        state.currentJob = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchJobDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch job detail';
        state.currentJob = null;
      });
  },
});

export const { setFilters, resetJobs } = jobSlice.actions;
export default jobSlice.reducer;