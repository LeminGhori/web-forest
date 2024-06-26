import React, { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa';

function RepositoryList({ repositories }) {
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [sortedRepositories, setSortedRepositories] = useState([]);
    const [sortColumn, setSortColumn] = useState('full_name'); // 'full_name', 'description', or 'watchers_count'

    useEffect(() => {
        setSortedRepositories(repositories);
    }, [repositories]);

    const handleSort = (column) => {
        const order = column === sortColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
        const sorted = [...repositories].sort((a, b) => {
            if (column === 'full_name') {
                return order === 'asc' ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name);
            } else if (column === 'description') {
                return order === 'asc' ? (a.description || '').localeCompare(b.description || '') : (b.description || '').localeCompare(a.description || '');
            } else if (column === 'watchers_count') {
                return order === 'asc' ? a.watchers_count - b.watchers_count : b.watchers_count - a.watchers_count;
            } else {
                return order === 'asc' ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name);
            }
        });
        setSortedRepositories(sorted);
        setSortOrder(order);
        setSortColumn(column);
    };

    const renderSortIcon = (column) => {
        if (column === sortColumn) {
            return sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />;
        }
        return null;
    };
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="sortable" onClick={() => handleSort('full_name')}>
                            Name{' '}
                            {renderSortIcon('full_name')}
                        </th>
                        <th className="sortable" onClick={() => handleSort('description')}>
                            Description{' '}
                            {renderSortIcon('description')}
                        </th>
                        <th className="sortable" onClick={() => handleSort('watchers_count')}>
                            Watchers{' '}
                            {renderSortIcon('watchers_count')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRepositories?.map((repo, index) => (
                        <tr key={repo?.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white' }}>
                            <td>{repo?.full_name}</td>
                            <td>{repo?.description}</td>
                            <td>{repo?.watchers_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RepositoryList;
