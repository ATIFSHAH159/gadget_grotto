import { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../Services/api';
import '../Admin/Assets/AdminSidebar.css';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Failed to fetch users');
            setLoading(false);
            console.error('Error fetching users:', err);
        }
    };

    const handleRoleChange = async (userId, currentRole) => {
        try {
            const newRole = !currentRole;
            await updateUserRole(userId, newRole);
            setUsers(users.map(user => 
                user._id === userId ? { ...user, isAdmin: newRole } : user
            ));
            toast.success('User role updated successfully');
        } catch (err) {
            toast.error(err.message || 'Failed to update user role');
            console.error('Error updating role:', err);
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
            try {
                await deleteUser(userId);
                setUsers(users.filter(user => user._id !== userId));
                toast.success('User deleted successfully');
            } catch (err) {
                toast.error(err.message || 'Failed to delete user');
                console.error('Error deleting user:', err);
            }
        }
    };

    const openUserProfile = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const filteredUsers = users.filter(user => {
        if (roleFilter === 'all') return true;
        if (roleFilter === 'admin') return user.isAdmin;
        if (roleFilter === 'user') return !user.isAdmin;
        return true;
    });

    if (loading) return <div className="text-center p-5">Loading...</div>;
    if (error) return <div className="text-center p-5 text-danger">{error}</div>;

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Manage Users</h2>
                <div className="d-flex align-items-center">
                    <label className="me-2">Filter by Role:</label>
                    <select 
                        className="form-select"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        style={{ width: '150px' }}
                    >
                        <option value="all">All Users</option>
                        <option value="admin">Administrators</option>
                        <option value="user">Regular Users</option>
                    </select>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <div 
                                        className="d-flex align-items-center cursor-pointer"
                                        onClick={() => openUserProfile(user)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            src={user.image && (user.image.startsWith('http') ? user.image : `http://localhost:5000/${user.image}`) || '/default-avatar.png'}
                                            alt={user.name}
                                            className="rounded-circle me-2"
                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                            onError={(e) => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
                                        />
                                        <span className="text-primary">{user.name}</span>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={user.isAdmin ? 'admin' : 'user'}
                                        onChange={() => handleRoleChange(user._id, user.isAdmin)}
                                        style={{ width: '100px' }}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <span className="badge bg-success">
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteUser(user._id, user.name)}
                                        title="Delete User"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* User Profile Modal */}
            {showModal && selectedUser && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '90%',
                        maxWidth: '500px',
                        position: 'relative'
                    }}>
                        <button 
                            onClick={closeModal}
                            className="btn-close position-absolute"
                            style={{ top: '10px', right: '10px' }}
                        >
                            <FaTimes />
                        </button>
                        
                        <div className="text-center mb-4">
                            <img
                                src={selectedUser.image && (selectedUser.image.startsWith('http') ? selectedUser.image : `http://localhost:5000/${selectedUser.image}`) || '/default-avatar.png'}
                                alt={selectedUser.name}
                                className="rounded-circle mb-3"
                                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                onError={(e) => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
                            />
                            <h3>{selectedUser.name}</h3>
                            <p className="text-muted">{selectedUser.email}</p>
                        </div>

                        <div className="user-details">
                            <div className="mb-3">
                                <strong>Role:</strong>
                                <span className={`badge ${selectedUser.isAdmin ? 'bg-primary' : 'bg-secondary'} ms-2`}>
                                    {selectedUser.isAdmin ? 'Administrator' : 'User'}
                                </span>
                            </div>
                            <div className="mb-3">
                                <strong>Joined Date:</strong>
                                <span className="ms-2">
                                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="mb-3">
                                <strong>Status:</strong>
                                <span className="badge bg-success ms-2">Active</span>
                            </div>
                            <div className="mb-3">
                                <strong>User ID:</strong>
                                <span className="ms-2 text-muted">{selectedUser._id}</span>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => handleRoleChange(selectedUser._id, selectedUser.isAdmin)}
                            >
                                Change Role
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteUser(selectedUser._id, selectedUser.name)}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageUsers; 