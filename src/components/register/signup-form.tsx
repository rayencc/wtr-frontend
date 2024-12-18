"use client";

import { useState } from "react";
import RegisterDto from "../../dtos/register.dto";
import { RegisterApi } from "../../api/auth/auth-api";

export interface SignupFormProps {
  onRegisterInterraction: (data: any) => void;
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}


export function SignupForm(props: SignupFormProps) {

  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [role, setrole] = useState("");
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');

  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmitTest = (e: React.FormEvent) => {
    e.preventDefault();
    props.onRegisterInterraction({
      firstName,
      lastName,
      email,
      role,
    });
  };
  const [formData, setFormData] = useState<RegisterDto>({
    username: firstName + lastName,
    email: email,
    password: "defaultPassword123", // Replace or make it editable if needed
    role: role,
  });
    
      const [message, setMessage] = useState("");
      const [submitting, setSubmitting] = useState(false);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
          ...prev,
          [id]: type === "checkbox" ? checked : value,
        }));
      };
    
      const handleEmailChange = (e : any) => {
        const value = e.target.value;
        setEmail(value);
        if (!emailValidationRegex.test(value)) {
          setEmailError('Ungültiges E-Mail-Format. Bitte überprüfen Sie Ihre Eingabe.');
        } else {
          setEmailError('');
        }
      };

      const handleRoleChange = (e: any) => {
        const value = e.target.value.toLowerCase(); // Normalize to lowercase
        if (value === "user" || value === "admin") {
          setrole(value); // Update the state with the valid role
          setRoleError(""); // Clear any existing error
        } else {
          setRoleError("Ungültige Rolle. Bitte geben Sie nur 'user' oder 'admin' ein."); // Set an error message
        }
      };
      
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");
    
        try {
        const data = await RegisterApi({
            username: firstName + lastName,
            email: email,
            password:  "props.password", // Replace or make it editable if needed
            role: role,
          }); 
       if (data === "a new verification code has been sent to your email address") {
            localStorage.setItem("email", formData.email);
            setMessage("Verification code sent to your email.");
          } else {
            setMessage("Registration successful!");
          }

            props.onRegisterInterraction(2);
          setMessage("Registration successful!");
        } catch (error) {
          console.error(error);
          setMessage("An error occurred during registration.");
        } finally {
          setSubmitting(false);
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

    {/* Registration Form */}
    <div className="relative z-10 w-full max-w-md p-8 bg-black border border-gray-600 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign in</h1>
      <form className="space-y-4" onSubmit={handleSubmitTest}>
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium">
            Vorname *
          </label>
          <input
            id="first-name"
            type="text"
            placeholder="John"
            onChange={(e) => setfirstName(e.target.value)}
            className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium">
            Nachname *
          </label>
          <input
            id="last-name"
            type="text"
            placeholder="Doe"
            onChange={(e) => setlastName(e.target.value)}
            className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            E-Mail *
          </label>
          <input
            id="email"
            type="email"
            placeholder="John@gmail.com"
             onChange={handleEmailChange}
            className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
           
        </div>
        {emailError && <p style={{ color: 'red', fontSize: '12px' }}>{emailError}</p>}
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Rolle *
          </label>
          <input
            id="role"
            type="text"
            placeholder="Senior Architect"
            onChange={handleRoleChange}
            className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>

        {roleError && <p style={{ color: 'red', fontSize: '12px' }}>{roleError}</p>}

        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Lokation *
          </label>
          <input
            id="location"
            type="text"
            placeholder="Berlin"
            className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        <div className="flex items-center">
          <input
            id="expert"
            type="checkbox"
            className="w-4 h-4 text-black bg-transparent border border-gray-500 rounded focus:ring-2 focus:ring-white focus:border-transparent"
          />
          <label htmlFor="expert" className="ml-2 text-sm">
            Fachexperte*in
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 font-medium text-black bg-white rounded-lg hover:bg-gray-200 flex items-center justify-center"
        >
          WEITER
        </button>
      </form>
    </div>
  </div>
  );
}