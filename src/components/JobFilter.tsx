// src/components/JobFilter.tsx
import { Form, Input, Checkbox, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { setFilters, resetJobs, fetchJobs } from '../stores/jobSlice';
import type { AppDispatch } from '../stores/store';

interface FilterFormValues {
  description?: string;
  location?: string;
  full_time?: boolean;
}

const JobFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm<FilterFormValues>();

  const handleSubmit = async (values: FilterFormValues) => {
    dispatch(resetJobs());
    
    // Set new filters
    dispatch(setFilters({
      description: values.description?.trim() || '',
      location: values.location?.trim() || '',
      full_time: values.full_time || false,
    }));

    // Fetch jobs with new filters
    dispatch(fetchJobs());
  };

  return (
    <Card className="mb-4">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ full_time: false }}
      >
        <div style={{ 
          display: 'grid', 
          gap: '16px', 
          gridTemplateColumns: '2fr 2fr 1fr auto',
          alignItems: 'flex-end'
        }}>
          <Form.Item 
            name="description" 
            label="Job Description"
            style={{ marginBottom: 0 }}
          >
            <Input 
              placeholder="e.g. Python, Ruby" 
              allowClear
            />
          </Form.Item>

          <Form.Item 
            name="location" 
            label="Location"
            style={{ marginBottom: 0 }}
          >
            <Input 
              placeholder="e.g. Berlin, Remote" 
              allowClear
            />
          </Form.Item>

          <Form.Item 
            name="full_time" 
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox>Full Time Only</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="default" 
              variant='filled'
              color='default'
              htmlType="submit" 
              size="small"
              style={{ width: '100px' }}
            >
              Search
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default JobFilter;