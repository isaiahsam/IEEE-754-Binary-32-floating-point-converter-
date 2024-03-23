const fs = require('fs');
// INPUT //
const mantissa_string = "+101.01";
const decimal_input = "45";
const base = 10 // Assuming base 2
const binaryConverted = decimalToBinary(decimal_input); // converted decimal to binary bits
let exponent = 0;

// INITIALIZATION //
const mantissa_to_float = mantissa_string.substring(1); // This removes the '+' sign
let mantissa = parseFloat(mantissa_to_float); // Make float mantissa
let mantissa_decimal = parseFloat(binaryConverted); // Make float mantissa FOR DECIMAL!!!
let shift_count = -1; // initialize shift_count
let fractionalBits = -1;

// DECLARATION OF BASES 
if (base == 2){
    base2(mantissa_to_float);
}
else if (base == 10){
    base10(binaryConverted);
};

/**TODO VON
 * hex values
 * decimal to binary, include decimal places
 * loob ng function base10 function, establish binary mantissa, add base2()
**/
function base2(mantissa_to_float){

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
    isNormalized(mantissa_to_float); // normalize to 1.f
    fractionalBits = fractionalPart(mantissa); // compute fractional bits
    const e_prime = exponent + 127; // e prime dec
    const e_prime_bin = decimalTo8BitBinary(e_prime); // e prime binary

    // declaration for final binary bits and hex final
    const finalBinary = sign_bit + e_prime_bin + fractionalBits;
    const hexRepresentation = binaryToHex(finalBinary);

    // DISPLAY RESULTS //
    console.log("Sign Bit: " + sign_bit); 
    console.log("1.f: " + mantissa);
    console.log("shift count:" + shift_count);
    console.log("Exponent after normalization: " + exponent);
    console.log("e' in decimal: " + e_prime);
    console.log("e' in binary 8 bit: " + e_prime_bin);
    console.log("Fractional Bits: " + fractionalBits);
    console.log("Final binary bits: " + finalBinary);
    console.log(`Hexadecimal representation: 0x${hexRepresentation}`);
}

function base10(mantissa_to_float) {

    // ASSIGN SIGN BIT //
    let sign_bit = -1;
    if (binaryConverted[0] === '0') {
        sign_bit = 0;
    } else if (binaryConverted[0] === '1') {
        sign_bit = 1;
    }

    // DISPLAY INITIAL VALUES //
    console.log("Initial \nMantissa: " + decimal_input);
    console.log("Exponent: " + exponent);
    console.log("Converted decimal to binary: " + binaryConverted + "\n");

    // functions
    isNormalized(binaryConverted.substring(1)); // normalize to 1.f
    const e_prime = exponent + 127; // e prime dec
    const e_prime_bin = decimalTo8BitBinary(e_prime); // e prime binary
    fractionalBits = fractionalPart(mantissa); // compute fractional bits

    // declaration for final binary bits and hex final
    const finalBinary = sign_bit + e_prime_bin + fractionalBits;
    const hexRepresentation = binaryToHex(finalBinary);

    // PRINT RESULTS
    console.log("Sign bit: " + sign_bit);
    console.log("1.f: " + mantissa);
    console.log("shift count:" + shift_count);
    console.log("Exponent after normalization: " + exponent);
    console.log("e' in decimal: " + e_prime);
    console.log("e' in binary 8 bit: " + e_prime_bin);
    console.log("Fractional Bits: " + fractionalBits);
    console.log("Final binary bits: " + finalBinary);
    console.log(`Hexadecimal representation: 0x${hexRepresentation}`);
} 

function isNormalized(mantissa_to_float) {
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
            dotIndex = mantissa_to_float.indexOf('.');
            shift_count = mantissa_to_float.indexOf('1', dotIndex);

            const firstOneIndex = mantissa_to_float.indexOf('1');
            const replacedMantissa = mantissa_to_float.substring(firstOneIndex).replace(/^0*/, '');
            const shiftedMantissa = replacedMantissa.substring(0, dotIndex) + '.' + replacedMantissa.substring(dotIndex);

            mantissa = parseFloat(shiftedMantissa);
            exponent -= (shift_count-1);
        }
        return {mantissa, shift_count};
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

function fractionalPart(mantissa){
    const mantissaString = mantissa.toString();
    const decimalIndex = mantissaString.indexOf('.');

    if (decimalIndex === -1) {
        // If no decimal point is found
        mantissaString === '1.0';
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
    
  }function binaryToHex(binary) {
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
        // if (isNaN(decimal_input) || !Number.isInteger(decimal_input)) {
        //   return "Invalid input.";
        // }
      
        let signBit = '';
        if (decimal_input < 0) {
          signBit = '1'; // Set the sign bit to 1 for negative numbers
          decimal_input = -decimal_input; // Make the number positive for further conversion
        } else {
          signBit = '0'; // Set the sign bit to 0 for non-negative numbers
        }
      
        const binary = (decimal_input >>> 0).toString(2); // Convert positive decimal to binary
        return signBit + binary + '.'; // Add the sign bit at the beginning and a decimal point at the end
      }