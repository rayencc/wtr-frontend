'use client'
import React, { useEffect, useState } from "react";
import RegistrationCompleted from "../../../components/register/registrationCompleted";
import ConfirmPassword from "../../../components/register/confirmPassword";
import { SignupForm } from "@/components/register/signup-form";



export default function SingUoRoute() {
  const [step, setStep] = useState<number>(1);
  const [password, setPassword] = useState(""); // Shared password state
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });
  const handleNextStep = (data: any) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handlePasswordUpdate = (password: string) => {
    setRegistrationData((prev) => ({ ...prev, password }));
  };

  const changeStep = (step: number) => {
    setStep(step);
  };

  return (
    <div>
      {step === 1 && (
        <SignupForm
          onRegisterInterraction={handleNextStep}
          initialData={registrationData}
        />
      )}
      {step === 2 && (
        <ConfirmPassword
          onPrevious={handlePreviousStep}
          onPasswordUpdate={handlePasswordUpdate}
          registrationData={registrationData}
        />
      )}
    </div>
  );

}