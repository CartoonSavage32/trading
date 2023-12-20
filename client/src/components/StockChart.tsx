import { IChartApi, createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

const StockChart = () => {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chart = useRef<IChartApi | null>(null);

    useEffect(() => {
        if (chartContainerRef.current !== null) {
            chart.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    background: { color: '#253248' },
                    textColor: 'rgba(255, 255, 255, 0.9)',
                },
                grid: {
                    vertLines: {
                        color: '#334158',
                    },
                    horzLines: {
                        color: '#334158',
                    },
                },
                crosshair: {
                    mode: 1,
                },
                timeScale: {
                    borderColor: '#485c7b',
                },
            });

            const lineSeries = chart.current.addLineSeries();
            lineSeries.setData([
                { time: '2019-04-11', value: 80.01 },
                { time: '2019-04-12', value: 96.63 },
                { time: '2019-04-13', value: 76.64 },
                { time: '2019-04-14', value: 81.89 },
                { time: '2019-04-15', value: 74.43 },
                { time: '2019-04-16', value: 79.9 },
                { time: '2019-04-17', value: 91.04 },
                { time: '2019-04-18', value: 74.08 },
                { time: '2019-04-19', value: 78.21 },
                { time: '2019-04-20', value: 77.2 },
                // more data...
            ]);
        }
    }, []);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};

export default StockChart;