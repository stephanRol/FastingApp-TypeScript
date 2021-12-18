import { useRef, useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import type { ChartData, ChartArea } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Lipolysis',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        tension: 0.2,
    }]
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = "#48bb4805";
    const colorMid = "#48bb4830";
    const colorEnd = "#48bb4880";

    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

const FastingChart = () => {
    const chartRef = useRef<ChartJS>(null);
    const [chartData, setChartData] = useState<ChartData>({
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) {
            return;
        }
        const chartData = {
            ...data,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                borderColor: "#48bb48",
                backgroundColor: createGradient(chart.ctx, chart.chartArea),
                fill: true,
            })),
        };

        setChartData(chartData);
    }, []);

    console.log(createGradient);


    return (
        <div>
            <h2>Lipolysis</h2>
            <Chart
                ref={chartRef}
                type='line'
                data={chartData}
                height={400}
                width={700}
                options={{
                    maintainAspectRatio: false,
                    responsive: false,
                    plugins: {
                        legend: {
                            display: false,
                            labels: {
                                font: {
                                    family: "industrial",
                                    size: 16,
                                },
                                color: "#e9ecf0"
                            }
                        },
                        // tooltip: { enabled: true }
                        filler: {
                            propagate: false,
                        },
                    },
                    scales: {
                        y: {
                            max: 21,
                            min: 0,
                            ticks: {
                                stepSize: 0.5
                            }
                        }
                    },
                }
                }
            />

        </div>
    )
}

export default FastingChart
