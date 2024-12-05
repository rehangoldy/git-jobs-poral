import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Alert, Button, Divider } from 'antd';
import { fetchJobs, resetJobs } from '../stores/jobSlice';
import JobCard from './JobCard';
import type { RootState, AppDispatch } from '../stores/store';

const ITEMS_PER_PAGE = 5;

const JobList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const jobState = useSelector((state: RootState) => state.job);
  const { jobs, loading, error, hasMore } = jobState;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleJobs = useMemo(() => {
    return jobs.slice(0, visibleCount);
  }, [jobs, visibleCount]);

  useEffect(() => {
    return () => {
      dispatch(resetJobs());
    };
  }, []);

  useEffect(() => {
    if (jobs.length === 0 && !loading) {
      dispatch(fetchJobs());
    }
  }, []);

  const handleLoadMore = () => {
    if (!loading) {
      if (visibleCount >= jobs.length) {
        dispatch(fetchJobs());
      }
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    }
  };

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load jobs. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="job-list" style={{marginTop: 20}}>
      <Card>
        {visibleJobs.map((job, index) => (
          <div key={`${job.id}-${job.created_at}`}>
            <JobCard {...job} />
            {index < visibleJobs.length - 1 && <Divider style={{ margin: '12px 0' }} />}
          </div>
        ))}
        
        {!loading && jobs.length === 0 && (
          <Alert
            message="No jobs found"
            description="Try adjusting your search filters."
            type="info"
            showIcon
          />
        )}
        
        {(jobs.length > visibleCount || hasMore) && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button 
              type="primary" 
              onClick={handleLoadMore} 
              loading={loading}
              block
            >
              {loading ? 'Loading more jobs...' : 'View More Jobs'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default JobList;