import React, { useState } from 'react';
import './App.css';

// Assuming you're using CommonJS modules as in a Node.js environment.
const {
  isNormalized,
  decimalToBinary,
  decimalTo8BitBinary,
  fractionalPart,
  binaryToHex
} = require('./convertUtils');

// Demonstrate decimal to binary conversion
const decimalNumber = 45;
const binaryResult = decimalToBinary(decimalNumber);
console.log(`Decimal ${decimalNumber} converted to binary is: ${binaryResult}`);

// Demonstrate normalization of a mantissa
// Assuming isNormalized function returns boolean or adjusted values
const mantissa = "0.1101";
const normalizedResult = isNormalized(mantissa);
console.log(`Normalization of mantissa ${mantissa} results in: `, normalizedResult);

// Demonstrate conversion of decimal to 8-bit binary
const decimalFor8Bit = 127;
const binary8BitResult = decimalTo8BitBinary(decimalFor8Bit);
console.log(`Decimal ${decimalFor8Bit} converted to 8-bit binary is: ${binary8BitResult}`);

// Demonstrate conversion of binary string to hexadecimal
const binaryString = '00000001101000000000000000000000'; // Example 32-bit binary string
const hexResult = binaryToHex(binaryString);
console.log(`Binary string ${binaryString} converted to hexadecimal is: ${hexResult}`);

// Here, you would add more code to demonstrate other functions or to handle more complex logic
// based on your application's needs.


function App() {
  const [base, setBase] = useState('');
  const [mantissa, setMantissa] = useState('');
  const [exponentValue, setExponentValue] = useState('');

  // Additional state to store and display the conversion result
  const [conversionResult, setConversionResult] = useState(null);

  // Update the handleConvert function to perform the conversion
  const handleConvert = () => {
    // Assuming you'll use the same logic as provided in the initial code.
    // The conversion functions need to be adapted to be included here or imported from another file.
    console.log("Performing conversion...");

    // Conversion logic goes here. This is a placeholder example.
    // You would replace this with actual logic using the provided functions.
    if (base === '2') {
      // Convert using base 2 logic
      console.log("Base 2 conversion not implemented yet");
    } else if (base === '10') {
      // Convert using base 10 logic
      console.log("Base 10 conversion not implemented yet");
    }

    // Example result
    const exampleResult = "0x1.921FB54442D18P+2";
    setConversionResult(exampleResult);
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
              <input
                type="text"
                id="mantissa"
                name="mantissa"
                value={mantissa}
                onChange={(e) => setMantissa(e.target.value)}
              />
              <div className="space-between-inputs"></div>
              <label htmlFor='exponent'>Exponent:</label>
              <input
                type="text"
                id="exponent"
                name="exponent"
                value={exponentValue}
                onChange={(e) => setExponentValue(e.target.value)}
              />
              <div className="convert-button-container">
                <button onClick={handleConvert} className="convert-button">Convert</button>
              </div>
            </div>
          )}

          {conversionResult && (
            <div className="conversion-result">
              <h3>Conversion Result:</h3>
              <p>{conversionResult}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
