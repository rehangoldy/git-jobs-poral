import { Layout, Button, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../stores/authSlice';
import type { RootState } from '../stores/store';

const { Header } = Layout;

const NavbarComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAunthenticated, user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Header style={{ background: 'blue'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'

            }}>
                <div style={{ display: 'flex', }}>
                    <h1 style={{ color: 'white' }}>Github Jobs</h1>
                </div>
                {isAunthenticated ? (
                    <div style={{ display: 'flex', alignItems: 'center',  gap: 16 }}>
                        <Avatar src={user?.picture}>{user?.name?.[0]}</Avatar>
                        <Button onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (

                    <Button onClick={() => navigate('/login')}>
                        Login
                    </Button>

                )}
            </div>
        </Header>

    )
}

export default NavbarComponent
