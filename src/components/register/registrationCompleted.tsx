'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export interface ChildProps {
  onRegisterCompletedInterraction: (step: number) => void;
}

export default function RegistrationCompleted() {

  const router = useRouter();
  const [Routing, setRouting] = useState(false)

  return (
    <>
   
      <span
        onClick={() => {
          router.push("/login");
          setRouting(true);
        }}
       
      >
        &lt; &nbsp;&nbsp; Back to login
      </span>
 

    </>
  );
}
