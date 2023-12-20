import React from 'react';
import StockChart from '../components/StockChart';
import ApiAuthForm from '../components/ApiAuthForm';

const Dashboard: React.FC = () => {
    return (
        <div>
            <StockChart />
            <ApiAuthForm />
        </div>
    );
};

export default Dashboard;