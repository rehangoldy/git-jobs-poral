import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../stores/authSlice';

const LoginButton = () => {
  const dispatch = useDispatch();

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
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <Button type="primary" onClick={() => login()} size="large">
      Sign in with Google
    </Button>
  );
};

export default LoginButton;
