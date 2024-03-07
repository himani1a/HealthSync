import { useState } from "react";
import backgroundImage from '../assets/back1.jpg';
import style from "../style/Username.css?inline";

export default function Bmi() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // Default gender is male
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  function calculateBMI() {
    if (!height || !weight || !age) {
      setError("Please fill in all the values");
      return;
    }
    if (!isNumeric(height) || !isNumeric(weight) || !isNumeric(age)) {
      setError("Please enter valid numeric values for Height, Weight, and Age.");
      return;
    }

    let bmi = Number(weight / (height / 100) ** 2).toFixed(2);
    setBmiResult(bmi);

    let bmiStatus = getStatus(bmi);
    setStatus(bmiStatus);

    // Adjust BMI based on gender and age
    // if (gender === "female") {
    //   // Adjust for females, e.g., by subtracting 0.5 from BMI
    //   bmi = (bmi - 0.5).toFixed(2);
    // }

    // Adjust BMI based on age
    if (age < 18) {
      // Adjust for younger individuals, e.g., by adding 1 to BMI
      bmi = (parseFloat(bmi) + 1).toFixed(2);
    }

    setStatus(getStatus(bmi)); // Update status after adjustments

    setError(null);
  }

  function clearValues() {
    setHeight("");
    setWeight("");
    setAge("");
    setGender("");
    setBmiResult(null);
    setStatus("");
    setError(null);
  }

  function isNumeric(value) {
    return /^-?\d*\.?\d+$/.test(value);
  }

  function getStatus(bmi) {
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi < 24.9) return "Normal";
    else if (bmi >= 25 && bmi < 29.9) return "Overweight";
    else return "Obese";
  }

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    minHeight: '100vh',
  };

  return (
    <div className={`container-fluid ${style['background-container']}`} style={containerStyle}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form className="bg-light shadow rounded-3 p-4">
          <h1 className="text-center mb-4 fs-4">Let's Calculate your BMI...</h1>
          <div className="mb-3">
            <label className="form-label" htmlFor="height">
              Height
            </label>
            <input
              className="form-control"
              id="height"
              type="text"
              placeholder="Height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="weight">
              Weight
            </label>
            <input
              className="form-control"
              id="weight"
              type="text"
              placeholder="Weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="age">
              Age
            </label>
            <input
              className="form-control"
              id="age"
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="gender">
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary me-2"
              type="button"
              onClick={calculateBMI}
            >
              Calculate
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={clearValues}
            >
              Clear
            </button>
          </div>
          {error && (
            <div className="mt-2 text-center text-danger">
              {error}
            </div>
          )}
          {bmiResult && (
            <div className="mt-4 text-center">
              <p>Your BMI is: {bmiResult} </p>
              <p>You are currently: {status}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
