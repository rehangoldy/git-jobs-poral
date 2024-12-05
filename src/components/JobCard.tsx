import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  created_at: string;
}

const getTimeAgo = (date: string) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffTime = Math.abs(now.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};

const JobCard = ({ id, title, company, location, type, created_at }: JobCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/job/${id}`)}
      style={{ cursor: 'pointer', padding: '8px 0'  }}
      className="job-item-section"
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text strong style={{ color: '#1890ff', fontSize: 16 }}>{title}</Text>
          <Text type="secondary">{location}</Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Text>{company}</Text>
            <Text> -</Text>
            <Text type="secondary" style={{ fontSize: 14, color: '#00b300' }}>{type}</Text>
          </div>
          <Text type="secondary" style={{ fontSize: 14 }}>{getTimeAgo(created_at)}</Text>
        </div>
      </div>
    </div>
  );
};

export default JobCard;