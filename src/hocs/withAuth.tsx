import React, { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  requireAuth: boolean = true
): ComponentType<P> {
  const WithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('token');
        const isAuthenticated = !!token;
        
        if (requireAuth && !isAuthenticated) {
          // Nếu yêu cầu xác thực nhưng chưa đăng nhập, chuyển hướng đến trang login
          navigate('/login');
        } else if (!requireAuth && isAuthenticated) {
          // Nếu đã đăng nhập và cố gắng truy cập trang login, chuyển hướng đến trang chủ
          navigate('/');
        }
      };

      checkAuth();
    }, [navigate]);

    // Render component gốc với tất cả props
    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
}

export default withAuth;