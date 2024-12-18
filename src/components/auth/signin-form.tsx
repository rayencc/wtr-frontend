"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { authenticationError } from "../../app/errors/authenticationError";
import { LoginApi } from "../../api/auth/auth-api";



export function SigninForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordValidation = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numberOrSpecial: /[0-9]|[!@#$%^&*]/.test(password),
  };
  const isPasswordValid =
    passwordValidation.uppercase &&
    passwordValidation.lowercase &&
    passwordValidation.numberOrSpecial;

  const handleEmailChange = (e : any) => {
    const value = e.target.value;
    setEmail(value);
    if (!emailValidationRegex.test(value)) {
      setEmailError('Ungültiges E-Mail-Format. Bitte überprüfen Sie Ihre Eingabe.');
    } else {
      setEmailError('');
    }
  };
  // Handle the form submission
  function submitValues(values: { email: string; password: string }) {
    setSubmitting(true);
    setLoginError(false);
    setMessageError("");
    setShowPassword(false);

    LoginApi({ email: values.email, password: values.password })
    .then((data: any) => {
      if (data?.access_token) {
        // Save the token, for example
        localStorage.setItem("access_token", data.access_token);
  
        // Redirect user to the dashboard
        router.push("dashboard");
      } else if (data === "a new verification code has been sent to your email address") {
        localStorage.setItem("email", values.email);
      } else {
        setMessageError(data);
        setLoginError(true);
      }
    })
      .catch((error) => {
        if (error instanceof authenticationError) {
          setMessageError(error.message);
          setLoginError(true);
          setTimeout(() => setLoginError(false), 15000); // reset after 15 seconds
        }
      })
      .finally(() => setSubmitting(false));
  }

  // Handle form submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitValues({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute top-10 left-10 text-white opacity-40 text-4xl">✖</div>
        <div className="absolute top-10 right-10 text-white opacity-40 text-4xl">▦</div>
        <div className="absolute bottom-10 left-20 text-white opacity-40 text-4xl">▶</div>
        <div className="absolute bottom-10 right-20 text-white opacity-40 text-4xl">■</div>
      </div>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md p-8 bg-black border border-gray-600 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login wtr Plan-Assistent
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@gmail.com"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>
          {emailError && <p style={{ color: 'red', fontSize: '12px' }}>{emailError}</p>}

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Passwort
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>
      


          {/* Password visibility toggle */}
          <div className="flex justify-between items-center text-sm">
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-400 hover:underline"
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
            <a  href="/forgotPassword" className="text-gray-400 hover:underline">
              Passwort Vergessen?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 font-medium text-black bg-white rounded-lg hover:bg-gray-200 disabled:opacity-50"
            disabled={!email || !!emailError || !isPasswordValid }
            >
            {submitting ? "Submitting..." : "SIGN IN"}
          </button>
        </form>

        {/* Login Error Message */}
        {loginError && (
          <p className="mt-4 text-sm text-center text-red-500">
            {messageError || "An error occurred. Please try again."}
          </p>
        )}

        {/* Register link */}
        <p className="mt-4 text-sm text-center text-gray-400">
          Noch nicht registriert?{" "}
          <a href="/signup" className="text-white underline">
            Bitte hier klicken.
          </a>
        </p>
      </div>
    </div>
  );
}
