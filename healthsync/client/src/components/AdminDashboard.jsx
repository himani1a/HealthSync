import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const AdminDashboard = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of Users',
                data: [],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    });

    const fetchUserCount = async () => {
        const response = await fetch('http://localhost:8000/api/admin/user-count');
        const data = await response.json();
        setChartData((prevData) => {
            const newData = { ...prevData };
            // Use toLocaleDateString() to get the date in a readable format
            newData.labels.push(new Date().toLocaleDateString());
            newData.datasets[0].data.push(data.count);
            
            if (newData.labels.length > 10) { // Keep the last 10 data points
                newData.labels.shift();
                newData.datasets[0].data.shift();
            }

            return newData;
        });
    };

    useEffect(() => {
        fetchUserCount();
        const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // 2 days
        const interval = setInterval(fetchUserCount, twoDaysInMilliseconds);

        return () => clearInterval(interval);
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Only integer values
                    stepSize: 1,
                    callback: function(value) {
                        if (value % 1 === 0) {
                            return value;
                        }
                    },
                },
            },
            x: {
                // x-axis configuration here
            },
        },
        // Additional configuration here
    };

    return (
        <div className="container mt-3">
            <div className="card no-hover-effect">
                <div className="card-header">
                    <h3>User Count Over Time</h3>
                </div>
                <div className="card-body">
                    <div style={{ height: '400px', maxWidth: '600px', margin: '0 auto' }}>
                        <Line data={chartData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;