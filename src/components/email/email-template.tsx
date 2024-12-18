import * as React from "react";

interface EmailTemplateProps {
  resetPasswordLink: string; // URL for resetting the password
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  resetPasswordLink,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333" }}>
    <h1 style={{ color: "#4CAF50" }}>Forgot your password?</h1>
    <p>
    Oops! We heard you lost your password. If you really did, click the button below to change your password:
    </p>
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <a
        href={resetPasswordLink}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          color: "#fff",
          backgroundColor: "#007BFF",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Change Password
      </a>
    </div>
    <p>
      If the button above doesn’t work, copy and paste the following link into your
      browser:
    </p>
    <p style={{ wordBreak: "break-word", color: "#555" }}>{resetPasswordLink}</p>
  </div>
);
