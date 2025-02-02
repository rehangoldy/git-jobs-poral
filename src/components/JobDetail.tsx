// src/components/JobDetail.tsx
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, Spin, Alert, Divider } from 'antd';
import { fetchJobDetail, fetchJobs } from '../stores/jobSlice';
import type { RootState } from '../stores/store';
import type { AppDispatch } from '../stores/store';
import JobCard from './JobCard';



const { Title, Text, } = Typography;
const ITEMS_PER_PAGE = 5;


const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentJob, loading, error } = useSelector((state: RootState) => state.job);
  const jobState = useSelector((state: RootState) => state.job);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { jobs } = jobState;

  const visibleJobs = useMemo(() => {
    return jobs.slice(0, visibleCount);
  }, [jobs, visibleCount]);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(fetchJobDetail(id));
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  if (!currentJob) {
    return <Alert message="Job not found" type="warning" showIcon />;
  }

  return (
    <Card>
      <div style={{ display: 'flex', gap: '16px', marginBottom: 24 }}>
        <div>
          <Text type='secondary' style={{ display: 'block' }}>{currentJob.type}/{currentJob.location}</Text>
          <Title level={2} style={{ marginTop: 0 }}>{currentJob.title}</Title>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Left column - Description */}
        <div style={{ flex: '1 1 65%' }}>
          <div
            dangerouslySetInnerHTML={{ __html: currentJob.description || '' }}
            style={{
              maxWidth: '100%',
              overflow: 'auto',
            }}
          />
        </div>

        {/* Right column - Company Info and How to Apply */}
        <div style={{ flex: '1 1 35%' }}>
          {/* Company Info Box */}
          <Card
            title={currentJob.company}
            style={{
              marginBottom: '20px',
              border: '2px solid #d9d9d9'
            }}
          >
            {currentJob.company_logo && !currentJob.company_logo.includes('jobs.github.com') && (
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <img
                  src={currentJob.company_logo}
                  alt={currentJob.company}
                  style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            {currentJob.company_url && (
              <div style={{ marginTop: '16px' }}>
                <a href={currentJob.company_url} target="_blank" rel="noopener noreferrer">
                  {currentJob.company_url}
                </a>
              </div>
            )}
          </Card>

          {/* How to Apply Box */}
          <Card
            title="How to Apply"
            style={{
              border: '2px solid #d9d9d9'
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: currentJob.how_to_apply || '' }}
            />
          </Card>

          <Card title="Recomended Jobs">

            <ul>
              {visibleJobs.map((job, index) => (
                <div key={`${job.id}-${job.created_at}`}>
                  <JobCard {...job} />
                  {index < visibleJobs.length - 1 && <Divider style={{ margin: '12px 0' }} />}
                </div>
              ))}
            </ul>

          </Card>
        </div>
      </div>
    </Card>
  );
};

export default JobDetail;