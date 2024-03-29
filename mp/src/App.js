import React, { useState } from 'react';
import './App.css';

function base2(mantissa_string, exponent,base){
    let mantissa_to_float = mantissa_string.substring(1); // This removes the '+' sign
    let mantissa = parseFloat(mantissa_to_float); // Make float mantissa

    // ASSIGN SIGN BIT //
    let sign_bit = -1;
    if (mantissa_string[0] === '+') {
        sign_bit = 0;
    } else if (mantissa_string[0] === '-') {
        sign_bit = 1;
    }
    
    // DISPLAY INITIAL VALUES //
    console.log("Initial \nMantissa: " + mantissa_string);
    console.log("Exponent: " + exponent + "\n");

    // CALL FUNCTIONS //
    isNormalized(mantissa_to_float, exponent); // normalize to 1.f
    
    exponent = isNormalized(mantissa_to_float, exponent).exponent; // compute fractional bits
    mantissa = isNormalized(mantissa_to_float, exponent).mantissa; // compute fractional bits
    let e_prime = exponent + 127; // e prime dec
    let e_prime_bin = decimalTo8BitBinary(e_prime); // e prime binary
    let fractionalBits = fractionalPart(mantissa,base);
    // declaration for final binary bits and hex final
    const finalBinary = sign_bit + e_prime_bin + fractionalBits;
    const hexRepresentation = binaryToHex(finalBinary);

    return hexRepresentation;
}

function base10(mantissa_string,exponent,base) {
    let mantissa_to_float = mantissa_string.substring(1); // This removes the '+' sign
    let mantissa = parseFloat(mantissa_to_float);
    let fractionalBits = -1;

    
  
    const binaryConverted = decimalToBinary(mantissa);
    mantissa = binaryConverted;
    mantissa_to_float = mantissa.toString();
    //console.log("test mantissa: " + mantissa + "\n");
    console.log("Converted decimal to binary: " + mantissa + "\n");
    let sign_bit = -1;
    if (mantissa_string[0] === '+') {
        sign_bit = 0;
    } else if (mantissa_string[0] === '-') {
        sign_bit = 1;
    }
    
    // DISPLAY INITIAL VALUES //
    console.log("Initial \nMantissa: " + mantissa_string);
    console.log("Exponent: " + exponent + "\n");

    // CALL FUNCTIONS //
    isNormalized(mantissa_to_float, exponent); // normalize to 1.f
    
    exponent = isNormalized(mantissa_to_float, exponent).exponent; // compute fractional bits
    mantissa = isNormalized(mantissa_to_float, exponent).mantissa; // compute fractional bits
    let e_prime = exponent + 127; // e prime dec
    let e_prime_bin = decimalTo8BitBinary(e_prime); // e prime binary
    fractionalBits = fractionalPart(mantissa,base);
    // declaration for final binary bits and hex final
    const finalBinary = sign_bit + e_prime_bin + fractionalBits;
    const hexRepresentation = binaryToHex(finalBinary);

    return hexRepresentation;
} 

function isNormalized(mantissa_to_float, exponent) {
    let mantissa = parseFloat(mantissa_to_float);
    let shift_count = -1; // initialize shift_count
    // Check if the mantissa starts with "1."
    if (mantissa_to_float.startsWith("1.")) {
        // Check if the rest of the mantissa contains only '0's or '1's
        const restOfMantissa = mantissa_to_float.substring(2);
        if (/^[01]*$/.test(restOfMantissa)) {
            return true; // Mantissa is normalized to 1.f
        }
    } else {
        if(mantissa_to_float[0] === '1'){
            shift_count = mantissa_to_float.indexOf('.');

            let mantissaArray = mantissa_to_float.split('');

            mantissaArray.splice(shift_count, 1);
            mantissaArray.splice(1, 0, '.');

            const sshiftedMantissa = mantissaArray.join('');

            mantissa = parseFloat(sshiftedMantissa);
            exponent += (shift_count-1);
        } else if (mantissa_to_float[0] === '0'){
            const dotIndex = mantissa_to_float.indexOf('.');
            shift_count = mantissa_to_float.indexOf('1', dotIndex);

            const firstOneIndex = mantissa_to_float.indexOf('1');
            const replacedMantissa = mantissa_to_float.substring(firstOneIndex).replace(/^0*/, '');
            const shiftedMantissa = replacedMantissa.substring(0, dotIndex) + '.' + replacedMantissa.substring(dotIndex);

            mantissa = parseFloat(shiftedMantissa);
            exponent -= (shift_count-1);
        }
        return {mantissa, shift_count, exponent};
    }
}

function decimalTo8BitBinary(decimal) {
    if (decimal < 0 || decimal > 255 || !Number.isInteger(decimal)) {
      return "Invalid input. Please enter a non-negative integer between 0 and 255.";
    }
  
    let binary = (decimal >>> 0).toString(2); // Convert decimal to binary
  
    while (binary.length <8) {
      binary = '0' + binary;
    }
  
    return binary;
}

function fractionalPart(mantissa,base){
    let mantissaString = '';
    let decimalIndex = -2; 
    // if(base == 2){
      if(base === 2){
        mantissaString = mantissa.toString();
        decimalIndex = mantissaString.indexOf('.');
    }
    // else if(base == 10){
      else if(base === 10){
        mantissaString = mantissa.toString();
        decimalIndex = mantissaString.indexOf('.');
        console.log("Decimal Index: " + decimalIndex);
        console.log("Mantissa Strinf: " + mantissaString);
    }

    if (decimalIndex === -1) {
        // If no decimal point is found
        mantissaString = '0';
    }

    const digitsAfterDecimal = mantissaString.substring(decimalIndex + 1);
    const zerosToAdd = 23 - digitsAfterDecimal.length;
    const fractionalBits = digitsAfterDecimal + '0'.repeat(zerosToAdd);
    
    return fractionalBits;
}

// Function to convert 32-bit binary to hexadecimal
function binaryToHex(binary) {
    // Make sure the binary string is exactly 32 bits long
    if (binary.length !== 32) {
      return "Invalid binary input. It should be exactly 32 bits long.";
    }
  
    // Split the binary string into groups of 4 bits
    const groups = binary.match(/.{1,4}/g);
  
    // Convert each group to its hexadecimal equivalent
    const hexDigits = groups.map(group => {
      const decimalValue = parseInt(group, 2); // Convert binary to decimal
      return decimalValue.toString(16).toUpperCase(); // Convert decimal to hexadecimal
    });
  
    // Join the hexadecimal digits to form the final hex string
    const hexString = hexDigits.join('');
  
    return hexString; 
  }
  

    // Function for converting decimal to binary
    function decimalToBinary(decimal_input) {

        if (isNaN(decimal_input) || typeof decimal_input !== 'number') {
            return "Invalid input.";
        }
    
        // Separate the integer and fractional parts
        let integerPart = Math.floor(decimal_input);
        let fractionalPart = decimal_input - integerPart;
    
        // Convert the integer part to binary
        let binaryInteger = (integerPart >>> 0).toString(2);
    
        // Convert the fractional part to binary
        let binaryFractional = '';
        while (fractionalPart > 0) {
            // Multiply the fractional part by 2 and check if it's >= 1
            fractionalPart *= 2;
            if (fractionalPart >= 1) {
                binaryFractional += '1';
                fractionalPart -= 1;
            } else {
                binaryFractional += '0';
            }
        }
    
        // Combine integer and fractional parts with a decimal point
        let binary = binaryInteger + '.' + binaryFractional;

        return binary;
    }

function App() {
  const [base, setBase] = useState('');
  const [mantissa_string, setMantissa] = useState('');
  const [exponent, setExponent] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  // setBase(baseInput) = () => {
  //   base = baseInput;
  // }

  const handleConvert = () => {

    let conversionOutput = "";

    setMantissa(mantissa_string);
    
    setBase(base);

    if (base === 2) {
      conversionOutput = base2(mantissa_string, exponent,base);
      // console.log(conversionOutput)
      // conversionOutput = {hexRepresentation};

    } else if (base === 10) {
      conversionOutput = base10(mantissa_string, exponent,base);
    }
    setConversionResult(conversionOutput);
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
              <li>Enter the mantissa including the sign : + or -, (-101.1, +4.0) choosing either decimal or binary format.</li>
              <li>Select the numerical base: base 2 or base 10.</li>
              <li>Provide the exponent value.</li>
              <li>Press the "Convert" button to calculate and display the floating-point version of the provided data.</li>
            </ol>
          </div>

          <div className="base-buttons">
            <button onClick={() => setBase(2)} className="base-button">Base 2</button>
            <button onClick={() => setBase(10)} className="base-button">Base 10</button>
          </div>
          
          {base && (
            <div className="input-container">
              <label htmlFor="mantissa">Mantissa:</label>
              <input
                type="text"
                id="mantissa"
                name="mantissa"
                // value={mantissa}
                value={mantissa_string}
                onChange={(e) => setMantissa(e.target.value)}
              />
              <div className="space-between-inputs"></div>
              <label htmlFor='exponent'>Exponent:</label>
              <input
                type="number"
                id="exponent"
                name="exponent"
                value={exponent}
                onChange={(e) => setExponent(parseInt(e.target.value))}
              />
              <div className="convert-button-container">
                {/* <button onClick={handleConvert} className="convert-button">Convert</button> */}
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
