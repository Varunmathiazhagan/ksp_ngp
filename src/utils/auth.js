export const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return {
        isAuthenticated: !!token,
        username
    };
};

// Remove admin-related function if it exists
// export const checkAdminStatus = () => { ... }

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('admin');
  localStorage.removeItem('adminToken');
};
