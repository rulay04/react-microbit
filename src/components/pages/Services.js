import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../pages/Services.css'

// Allowed extensions for input file
const allowedExtensions = ['csv'];

const Services = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [file, setFile] = useState('');
  const [chartData, setChartData] = useState(null);
  const [rpeCategory, setRpeCategory] = useState('');
  const [averageVelocity, setAverageVelocity] = useState(0);
  const [distance, setDistance] = useState('');
  const [power, setPower] = useState(null);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e) => {
    setError('');

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split('/')[1];

      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a csv file');
        return;
      }

      setFile(inputFile);
    }
  };

  const generateChartData = (parsedData) => {
    const validEntries = parsedData.filter((entry) => !isNaN(entry.time) && !isNaN(entry.velocity));

    const labels = validEntries.map((entry) => entry.time / 1000);
    const datasets = [
      {
        label: 'Velocity',
        data: validEntries.map((entry) => Math.abs(entry.velocity / 10000)),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ];

    return { labels, datasets };
  };

  const calculatePower = (time, customDistance) => {
    const mass = 20; // You can adjust the mass value if needed
    const gravity = 9.81;
  
    /*if (!customDistance || isNaN(parseFloat(customDistance)) || isNaN(parseFloat(time))) {
      setError('Please enter valid distance and time values');
      return null;
    }*/
  
    const force = mass * gravity;
    const work = force * parseFloat(customDistance);
    const calculatedPower = work / parseFloat(time);
  
    return calculatedPower.toFixed(2) + ' Watts';
  };
  

  const handleParse = () => {
    if (!file) return alert('Enter a valid file');
  
    const reader = new FileReader();
  
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
      });
  
      const parsedData = csv?.data;
  
      if (!parsedData || parsedData.length === 0) {
        setError('Empty or invalid CSV file');
        return;
      }
  
      // Filter out entries with NaN values
      const validEntries = parsedData.filter((entry) =>
        ['time', 'avg_acc', 'velocity'].every((header) => !isNaN(parseFloat(entry[header])))
      );
  
      if (validEntries.length === 0) {
        setError('No valid data found in the CSV file');
        return;
      }
  
      const result = validEntries.map((rowData) => {
        const obj = {};
        const headers = ['time', 'avg_acc', 'velocity'];
        const columns = ['time', 'avg_acc', 'velocity'];
  
        headers.forEach((header, index) => {
          obj[header] = parseFloat(rowData[columns[index]]);
        });
  
        return obj;
      });
  
      result.sort((a, b) => parseInt(a.time) - parseInt(b.time));
  
      const averageVelocityValue = result.reduce((sum, entry) => sum + Math.abs(entry.velocity/10000), 0) / result.length;
  
      let rpeCategory = '';
      if (averageVelocityValue <= 0.3) {
        rpeCategory = '10 RPE';
      } else if (averageVelocityValue <= 0.5) {
        rpeCategory = '9 RPE';
      } else if (averageVelocityValue <= 0.75) {
        rpeCategory = '8 RPE';
      } else if (averageVelocityValue <= 1) {
        rpeCategory = '7 RPE';
      } else if (averageVelocityValue <= 1.3) {
        rpeCategory = '6 RPE';
      } else {
        rpeCategory = '5 RPE';
      }
  
      setAverageVelocity(averageVelocityValue);
      setRpeCategory(rpeCategory);
      setChartData(generateChartData(result));
      setData(result);
    };
  
    reader.readAsText(file);
  };
  

  return (
    <div className="page-container">
      <div className="hero-container">
      <h1>RPE Display</h1>
      </div>
      <div className="item">
      <h3>Read microbit data:</h3>
      <div className="item">
        <label htmlFor="csvInput" style={{ display: 'block' }}>
          Enter CSV File
        </label>
        <input onChange={handleFileChange} id="csvInput" name="file" type="File" />
        <div>
          <button className="button-custom" onClick={handleParse}>Parse</button>
        </div>
        </div>
        <div style={{ marginTop: '3rem' }}>
          {error ? (
            error
          ) : (
            <>
              {chartData && <Line data={chartData} options={{
                layout: {
                  padding: {
                    right: 100, // Adjust the right padding as needed
                    left: 50,
                    bottom: 50,
                    
                  },
                },
                scales: {
                  x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                      display: true,
                      text: 'Time',
                      font: {
                        size: 25, // Adjust font size
                      },
                    },
                    ticks: {
                      font: {
                        size: 20, // Adjust font size
                      },
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Velocity',
                      font: {
                        size: 25, // Adjust font size
                      },
                    },
                    ticks: {
                      font: {
                        size: 20, // Adjust font size
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 20,
                      },
                    },
                  },
                }
              }}
              height={1800} // Adjust the height as needed
              width={2500}  // Adjust the width as needed
              options2={{
                elements: {
                  point: {
                    radius: 15, // Set the point radius
                  },
                },
              }}
              />}
               {data.map((entry, index) => (
                <div key={index} className="item">
                  <p>Trial {index + 1}</p>
                  <p>Time: {entry.time / 1000} seconds</p>
                  <p>Velocity (m/s): {Math.abs(entry.velocity / 10000)}</p>
                  <p>Power: {distance && !isNaN(parseFloat(entry.time)) ? calculatePower(entry.time / 1000, distance) : 'Invalid input'}</p>
                  <br />
                </div>
              ))}
              {rpeCategory && (
                <div className="item">
                  <p>Average Velocity: {averageVelocity.toFixed(2)} m/s</p>
                  <p>RPE Category: {rpeCategory}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="item">
        <br/>
        <h3>Compute Power:</h3>
        <label className="item"htmlFor="distanceInput">Enter Distance (in meters):</label>
        <input
          type="text"
          id="distanceInput"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          style={{ width: '5%', padding: '4px', boxSizing: 'border-box', marginTop: '8px' , marginRight: '8px', marginLeft: '8px'}}
        />
        <br />
        <div className="item"></div>
       {/* <button className="button-custom" onClick={calculatePower}>Calculate Power</button>*/}
        <br/>
        {power && (
          <div className="item">
            <p>Power Output: {power}</p><br/><br/>
          </div>
        )}
      </div>
    </div>
  );
};


export default Services;