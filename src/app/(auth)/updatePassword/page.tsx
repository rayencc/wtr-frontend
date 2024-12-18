"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


export default function UpdatePassword() {
    const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const passwordValidation = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numberOrSpecial: /[0-9!@#$%^&*]/.test(password),
  };

  const validatePassword = () => {
    setIsPasswordValid(
      passwordValidation.uppercase &&
        passwordValidation.lowercase &&
        passwordValidation.numberOrSpecial
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }


    try {
      setSubmitting(true);
  
     
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-2 ">Passwort zurücksetzen</h1>
  <p className="mb-6 text-center">
    Erstellen Sie ein neues Passwort, das den Sicherheitsanforderungen entspricht.
  </p>
      <form className="w-full max-w-sm space-y-4 bg-black border border-gray-700 p-6 rounded-lg" onSubmit={handleSubmit}>
        {/* Password Field */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Passwort
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword();
            }}
            className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          {/* Toggle Show/Hide Password */}
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>

        {/* Validation Indicators */}
        <ul className="space-y-1 text-sm">
          <li
            className={`${
              passwordValidation.uppercase
                ? "text-green-500"
                : password
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            ✓ Großbuchstaben (A-Z)
          </li>
          <li
            className={`${
              passwordValidation.lowercase
                ? "text-green-500"
                : password
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            ✓ Kleinbuchstaben (a-z)
          </li>
          <li
            className={`${
              passwordValidation.numberOrSpecial
                ? "text-green-500"
                : password
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            ✓ Zahlen (0-9) und Sonderzeichen (z. B. !@#$%^&*)
          </li>
        </ul>

        {/* Confirm Password Field */}
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2"
          >
            Passwort wiederholen
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          {/* Toggle Show/Hide Confirm Password */}
          <div
  className="absolute inset-y-0 right-3 flex items-center justify-center cursor-pointer"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
</div>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 font-medium text-black bg-white rounded-lg hover:bg-gray-200 disabled:opacity-50"
          disabled={
            !isPasswordValid || password !== confirmPassword || password === ""
          }
        
        >
          SPEICHERN
        </button>
      </form>
    </div>
  );


}