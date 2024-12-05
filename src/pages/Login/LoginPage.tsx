import { Card, Typography, Divider } from 'antd';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../stores/authSlice';

const { Title, Text } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        dispatch(
          setUser({
            email: userInfo.data.email,
            name: userInfo.data.name,
            picture: userInfo.data.picture,
          })
        );
        
        navigate('/');
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: 'calc(100vh - 150px)'
    }}>
      <Card 
        style={{ 
          width: 400, 
          textAlign: 'center',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}
      >
        <Title level={2} style={{ marginBottom: 8 }}>Welcome Back!</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
          Please sign in to continue
        </Text>

        <Divider style={{ marginBottom: 32 }}>Sign in with</Divider>

        <button
          onClick={() => login()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '10px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            style={{ width: 24, height: 24 }}
          />
          <span style={{ fontSize: '16px', color: '#4a5568' }}>
            Continue with Google
          </span>
        </button>
      </Card>
    </div>
  );
};

export default LoginPage;