import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts';
import { Card } from "@mui/material"
import { baseurl } from '../shared/baseUrl';

export default function FlightsCharts() {

    async function getChartData() {
        const response = await fetch(`${baseurl}/dashboard/flights/chart`);
        const charts = await response.json();
        if (charts?.data?.length > 0) {
            const days = charts.data.map((x) => x.booking_day.split("T")[0]);
            const bookedFlights = charts.data.map((x) => x.flights_booked);
            setState({ ...state, series: [{ name: "Booked Flights", data: bookedFlights }], options: { ...state.options, xaxis: { categories: days } } })
        }
    }

    useEffect(() => {
        getChartData();
    }, [])

    const [state, setState] = useState({
        series: [{
            name: "Booked Flights",
            data: []
        }],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                },
            },
            title: {
                text: 'Booked Flights', // Replace with your desired title
                align: 'center', // You can also use 'left' or 'right'
                style: {
                    fontSize: '20px', // Adjust font size as needed
                    fontWeight: 'bold' // You can use 'normal' or 'bold'
                }
            },
            toolbar: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                colors: ['#F87171'], // Replace with your desired color code
            },
            markers: {
                show: true,
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: []
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    }
                }
            ]
        }
    })

    return (
        <Card className="rounded-xl shadow-xl p-6 -mt-8" >
            <Chart options={state.options} series={state.series} type="line" height={420} />
        </Card >
    )
}
