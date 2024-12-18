"use client";

import { useState } from "react";


export default function forgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!emailValidationRegex.test(value)) {
      setEmailError("Ungültiges E-Mail-Format. Bitte überprüfen Sie Ihre Eingabe.");
    } else {
      setEmailError("");
    }
  };

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailValidationRegex.test(email)) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      // Simulate an API call or trigger the reset
  
      setMessage("Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet.");
    } catch (error) {
      console.error(error);
      setMessage("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
      setSubmitting(false);
    }
  }; */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
        const response = await fetch("/api/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "rayen.kacem@codecooperation.com" }),
          });
        
          const result = await response.json();
          console.log(result);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to send email.");
      } else {
        const data = await response.json();
        setMessage("Email sent successfully!");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative">
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute top-10 left-10 text-white opacity-20 text-4xl">✖</div>
        <div className="absolute top-10 right-10 text-white opacity-20 text-4xl">▦</div>
        <div className="absolute bottom-10 left-20 text-white opacity-20 text-4xl">▶</div>
        <div className="absolute bottom-10 right-20 text-white opacity-20 text-4xl">■</div>
      </div>

      {/* Forgot Password Form */}
      <div className="relative z-10 w-full max-w-md p-8 bg-black border border-gray-600 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Passwort vergessen?</h1>
        <p className="text-sm text-center mb-4">
          Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen Ihres Passworts zu erhalten.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-Mail *
            </label>
            <input
              id="email"
              type="email"
              placeholder="John@gmail.com"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}

          <button
            type="submit"
            className={`w-full py-2 mt-4 font-medium text-black bg-white rounded-lg flex items-center justify-center ${
              submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
            disabled={submitting}
          >
            {submitting ? "Senden..." : "WEITER"}
          </button>
        </form>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}
