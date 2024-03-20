import './App.css';

function App() {
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
        </div>
      </header>
    </div>
  );
}

export default App;
