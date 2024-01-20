import React, { useEffect } from 'react';
import '../pages/Demo.css';

export default function Products() {

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className='page-container'>
      <div className='rpe-container'>
        <h1>RPE Tracking Device Demo</h1></div>
        <div className='extra'>
          <h2>How does it work? This is the logistics part:</h2>
          <ul>
            <li>
              <h3>How RPE Works:</h3>
              <p>
                RPE, or Rate of Perceived Exertion, is a subjective measure used to quantify the intensity of physical exercise. It is commonly expressed on a scale from 1 to 10, where each level corresponds to a different level of effort.
              </p>
              <br/>
              <p>
                 RPE 10: Maximal Lift
                <br /> RPE 9: One repetition is left in the tank
                <br /> RPE 8: Two repetitions are left in the tank
                <br /> ... and so on.
              </p>
            </li>
            

            <li>
              <h3>RPE Progression:</h3>
              <p>
                Once you can establish a 1RM velocity, you can then start working down. For example, you will know that for a person with a .3m/s velocity during a 1RM, a lift moving at .75 m/s is nowhere near a 9 RPE. Everyone is slightly different, but you could start with a scale like this:
              </p>
              <ul>
                <li>10 RPE- .3m/s and down</li>
                <li>9 RPE- .3 to .5 m/s</li>
                <li>8 RPE- .5 to .75 m/s</li>
                <li>7 RPE- .75 to 1 m/s</li>
                <li>6 RPE- 1 to 1.3 m/s</li>
                <li>5 RPE- Greater than 1.3 m/s used for starting strength or warm up</li>
                <li>1-4 RPE- Warm-up weight used for technique and recovery</li>
              </ul>
            </li>
          

            <li>
              <h3>Formulas for Calculating Power:</h3>
              <p>Knowing your power output helps personalize workouts, and make it clear what your next steps should be.
                If you have a larger power output, you are working harder, and vise versa.
              </p><br/>
              <ul>
                <li>Force = Mass × Gravity = 20 kg × 9.81 m/s² = 196.2 Newtons</li>
                <li>Work  = Force × Distance = 196.2 N × 1 m = 196.2 Joules</li>
                <li>Power = Work / Time = 196.2 J / 2 s = 98.1 Watts</li>
              </ul>
            </li>

            <li>
              <h3>Goals:</h3>
              <p>
                Create an RPE tracking device that utilizes speed per rep and tracks power/force output during exercises.
              </p>
              </li>
            
            <li>
              <h3>Microbit Operations:</h3>
              <p>
                To measure velocity, the microbit can use the accelerometer to calculate acceleration and then multiply it by time to get velocity. Power can be calculated by timing the repetition and measuring force exerted during the lift.
              </p>
              <p>
                Utilizing the z-axis readings, the device can detect the ascent of the lift, helping to determine the speed and force of the movement.
              </p>
            </li>
            <li>
              <h3>Data Storage:</h3>
              <p>
                All the data collected, including time, acceleration, velocity, and power, needs to be stored in a table for analysis and tracking purposes.
              </p>
            </li>
          </ul>
        </div>
      </div>

  );
}

