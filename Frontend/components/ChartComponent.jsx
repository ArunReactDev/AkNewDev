import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

const ChartComponent = () => {
    const chartRef = useRef(null);
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: 700,

        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: 700,

        }
    }

    useEffect(() => {
        let chart = null;
        const ctx = chartRef.current.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        // gradient.addColorStop(0, '#00800087');
        // gradient.addColorStop(1, '#00800087');

        const chartData = {
            "data": [
                {
                    "age": 25,
                    "corpus": 0
                },
                {
                    "age": 26,
                    "corpus": 64046.64
                },
                {
                    "age": 27,
                    "corpus": 136216
                },
                {
                    "age": 28,
                    "corpus": 217538.24
                },
                {
                    "age": 29,
                    "corpus": 309174.17
                },
                {
                    "age": 30,
                    "corpus": 412431.83
                },
                {
                    "age": 31,
                    "corpus": 528785.15
                },
                {
                    "age": 32,
                    "corpus": 659894.99
                },
                {
                    "age": 33,
                    "corpus": 807632.83
                },
                {
                    "age": 34,
                    "corpus": 974107.53
                },
                {
                    "age": 35,
                    "corpus": 1161695.38
                },
                {
                    "age": 36,
                    "corpus": 1373074.07
                },
                {
                    "age": 37,
                    "corpus": 1611260.87
                },
                {
                    "age": 38,
                    "corpus": 1879655.72
                },
                {
                    "age": 39,
                    "corpus": 2182089.76
                },
                {
                    "age": 40,
                    "corpus": 2522880
                },
                {
                    "age": 41,
                    "corpus": 2906890.97
                },
                {
                    "age": 42,
                    "corpus": 3339604.14
                },
                {
                    "age": 43,
                    "corpus": 3827196.18
                },
                {
                    "age": 44,
                    "corpus": 4376627.09
                },
                {
                    "age": 45,
                    "corpus": 4995739.6
                },
                {
                    "age": 46,
                    "corpus": 5693371.06
                },
                {
                    "age": 47,
                    "corpus": 6479479.66
                },
                {
                    "age": 48,
                    "corpus": 7365286.5
                },
                {
                    "age": 49,
                    "corpus": 8363435.82
                },
                {
                    "age": 50,
                    "corpus": 9488175.46
                },
                {
                    "age": 51,
                    "corpus": 10755560.24
                },
                {
                    "age": 52,
                    "corpus": 12183681.13
                },
                {
                    "age": 53,
                    "corpus": 13792923.5
                },
                {
                    "age": 54,
                    "corpus": 15606258.08
                },
                {
                    "age": 55,
                    "corpus": 17649568.87
                },
                {
                    "age": 56,
                    "corpus": 19952022.61
                },
                {
                    "age": 57,
                    "corpus": 22546485.12
                },
                {
                    "age": 58,
                    "corpus": 25469990.42
                },
                {
                    "age": 59,
                    "corpus": 28764269.36
                },
                {
                    "age": 60,
                    "corpus": 32476345.33
                },
                {
                    "age": 61,
                    "corpus": 36659205.45
                },
                {
                    "age": 62,
                    "corpus": 41372556.92
                },
                {
                    "age": 63,
                    "corpus": 46683679.34
                },
                {
                    "age": 64,
                    "corpus": 52668385.02
                },
                {
                    "age": 65,
                    "corpus": 59412101.18
                },
                {
                    "age": 66,
                    "corpus": 67011089.34
                },
                {
                    "age": 67,
                    "corpus": 75573819.4
                },
                {
                    "age": 68,
                    "corpus": 85222517.97
                },
                {
                    "age": 69,
                    "corpus": 96094913.02
                },
                {
                    "age": 70,
                    "corpus": 108346199.9
                },
                {
                    "age": 71,
                    "corpus": 122151256.6
                },
                {
                    "age": 72,
                    "corpus": 137707140.04
                },
                {
                    "age": 73,
                    "corpus": 155235898.87
                },
                {
                    "age": 74,
                    "corpus": 174987743.06
                },
                {
                    "age": 75,
                    "corpus": 197244615.48
                }
            ],
            "achievement": {
                "Car": 50
            }
        }

        const getEmojiForAchievement = (achievement) => {
            switch (achievement) {
                case 'Car':
                    return '🚘';
                case 'House':
                    return '🏡';
                case 'Vacation':
                    return '🌴';
                case 'Retire':
                    return '👴';
                default:
                    return '';
            }
        };

        
        const annotations = Object.entries(chartData.achievement).map(([achievement, age]) => {
            // Calculate the center of the chart vertically
            const centerY = chartRef.current.clientHeight / 2;
        
            // Calculate the height of the label (adjust based on font size and style)
            const labelHeight = 16;
        
            // Calculate the y-position of the annotation to place it in the center vertically
            const annotationY = centerY - labelHeight / 2;
        
            // Set yMax value to place the line below the label
            const annotationHeight = 20; // Adjust as needed to position the line below the label
            const yMax = annotationY + annotationHeight;
        
            return {
                type: 'line',
                scaleID: 'x',
                // mode: 'horizontal',
                borderWidth: 2,
                borderColor: 'rgba(46, 53, 59, 1)',
                borderDash: [5, 5],
                value: age,
                endValue: age,
                label: {
                    content: `${getEmojiForAchievement(achievement)} ${achievement}`,
                    enabled: true,
                    font: { size: 16 },
                    backgroundColor: 'rgba(46, 53, 59, 1)',
                    backgroundShadowColor : "0px 10px 20px 0px rgba(46, 53, 59, 0.1)",
                    color: 'rgba(255, 255, 255, 1)',
                    position: 'center', // Align label to the center
                    yAdjust: -labelHeight / 2, // Adjust vertical position to center the label
                },
                yMin: 0, // Set the minimum y-value
                yMax: 100000 // Set yMax to position the line below the label
            };
        });
        

        if (chartRef.current) {
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.data.map(item => item.age),
                    datasets: [{
                        label: 'Corpus',
                        data: chartData.data.map(item => item.corpus),
                        fill: true,
                        backgroundColor: gradient,
                        borderColor: 'rgba(134, 47, 231, 1)',
                        tension: 0.3
                    }]
                },
                options: {
                    animation,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false // Hide legend
                        },
                        annotation: {
                            annotations: annotations
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: { color: '#f5f5f5', },
                            ticks: {
                                callback: function (val) {
                                    if (val >= 10000000) val = (val / 10000000) + ' Cr';
                                    else if (val >= 100000) val = (val / 100000) + ' Lk';
                                    else if (val >= 1000) val = (val / 1000) + ' K';
                                    return val;
                                },
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chart) {
                chart.destroy(); // Clean up chart on unmount
            }
        };
    }, []);

    return <canvas id='clsx-chart' ref={chartRef} />;
};

export default ChartComponent;
