import React, { useState } from 'react';
import './App.css';

function App() {
  const [base, setBase] = useState('');
  const [mantissa, setMantissa] = useState('');
  const [exponent, setExponent] = useState('');
  const [result, setResult] = useState({ binary: '', hex: '' });

  const convertToBinary = (mantissa, base, exponent) => {
    
  }

  // lagay dito logic for the conversion button
  const handleConvert = () => {
    console.log("Conversion logic hello world");
    // Implement nalang yung conversion logic dito di ako marunong mag node e
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="content">
          <h1>IEEE-754 Binary 32-Floating-point Converter</h1>
          <p>
            An IEEE-754 Binary 32-bit Floating-Point Converter translates decimal numbers into a 32-bit binary format, using specific bits for the sign, exponent, and significand, facilitating efficient real number handling in computing.
          </p>
          <div className="instructions">
            <h2>How to use:</h2>
            <ol>
              <li>Enter the mantissa, choosing either decimal or binary format.</li>
              <li>Select the numerical base: base 2 or base 10.</li>
              <li>Provide the exponent value.</li>
              <li>Press the "Convert" button to calculate and display the floating-point version of the provided data.</li>
            </ol>
          </div>

          <div className="base-buttons">
            <button onClick={() => setBase('2')} className="base-button">Base 2</button>
            <button onClick={() => setBase('10')} className="base-button">Base 10</button>
          </div>
          
          {base && (
            <div className="input-container">
              <label htmlFor="mantissa">Mantissa:</label>
              <input type="text" id="mantissa" name="mantissa" />
              <div className="space-between-inputs"></div>
              <label htmlFor='exponent'>Exponent:</label>
              <input type="text" id="exponent" name="exponent" />
              <div className="convert-button-container">
                <button onClick={handleConvert} className="convert-button">Convert</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
