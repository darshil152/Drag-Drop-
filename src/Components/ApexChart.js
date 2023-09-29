import React from 'react'
import { useEffect } from 'react';
import firebaseApp from '../Firebase/firebase';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';




export default function ApexChart() {


    useEffect(() => {
        getdata()
    }, [])

    const [data, setData] = useState([])
    const [x, setX] = useState(0)
    const [y, sety] = useState(0)
    const [z, setz] = useState(0)
    const getdata = () => {

        const db = firebaseApp.firestore();
        db.collection('Setting').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().ChildCategory)
                setX(doc.data().ChildCategory.length)
                sety(doc.data().MainCategory.length)
                setz(doc.data().SubCategory.length)

            })
            console.log(x, y, z)
        }).catch(err => {
            console.error(err)
        });
    }




    const pieoptions = {
        series: [x, y, z],
        options: {
            chart: {
                width: '100%',
                type: 'pie',
            },
            labels: ["ChildCategory", "MainCategory", "SubCategory"],
            theme: {
                monochrome: {
                    enabled: true
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -5
                    }
                }
            },
            title: {
                text: "Category Chart"
            },
            dataLabels: {
                formatter(val, opts) {
                    const name = opts.w.globals.labels[opts.seriesIndex]
                    return [name, val.toFixed(1) + '%']
                }
            },
            legend: {
                show: false
            }
        },

    };


    const barOptions = {
        series: [{
            data: [x, y, z]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ["ChildCategory", "MainCategory", "SubCategory"],
            }
        },
    }

    const lineOptions = {
        series: [{
            name: 'Series 1',
            data: [x, y, z]
        }],
        options: {
            chart: {
                height: 350,
                type: 'radar',
            },
            xaxis: {
                categories: ["ChildCategory", "MainCategory", "SubCategory"],
            }
        },

    }



    return (
        <>
            <div className="d-flex">
                <ReactApexChart options={pieoptions.options} series={pieoptions.series} type="pie" width={500} height={500} />
                <ReactApexChart options={barOptions.options} series={barOptions.series} type="bar" width={500} height={500} />
                <ReactApexChart options={lineOptions.options} series={lineOptions.series} type="radar" width={500} height={500} />

            </div>
        </>



    )
}
