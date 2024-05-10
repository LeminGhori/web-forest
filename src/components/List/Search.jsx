import React, { useState } from 'react';
import axios from 'axios';
import RepositoryList from './RepositoryList'; // Import the RepositoryList component
import './styles.css';
function Search() {
    const [username, setUsername] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Authorization': token
                }
            };

            const reposResponse = await axios.get(`http://localhost:7000/api/user-repo/${username}?`, config);
            setRepositories(reposResponse?.data?.totalRecord?.sort((a, b) => b.watchers_count - a.watchers_count));
            setAvatarUrl(reposResponse?.data?.totalRecord[0]?.avatar_url);
            setError(null); // Reset error state
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.'); // Set error state
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="input-group">
                    <input
                        type="text"
                        value={username}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter GitHub username"
                        required
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>

            {avatarUrl && (
                <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="avatar img-fluid rounded-circle mt-3"
                />
            )}

            {error && <p className="text-danger mt-3">{error}</p>}

            <RepositoryList repositories={repositories} /> {/* Pass repositories data to RepositoryList component */}
        </div>
    );
}

export default Search;
