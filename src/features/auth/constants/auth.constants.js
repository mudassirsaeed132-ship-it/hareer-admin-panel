export const AUTH_ROUTES = {
  login: "/login",
  forgotPassword: "/forgot-password",
  emailSent: "/email-sent",
  resetPassword: "/reset-password",
  dashboard: "/",
};

export const AUTH_COLORS = {
  brand: "#E8B0B2",
  brandSoft: "#FBF1F1",
  text: "#1F1B1A",
  muted: "#6F6A67",
  danger: "#F04438",
  surface: "#FFFFFF",
  page: "#F8F6F4",
};

export const AUTH_COPY = {
  login: {
    title: "Login to Dashboard",
    description: "Please enter the credentials to get started",
    submit: "Continue",
  },
  forgotPassword: {
    title: "Forgot Password",
    description: "Please enter the email address you used during registration.",
    submit: "Send Verification Link",
  },
  emailSent: {
    title: "Email Sent!",
    description:
      "We have sent your reset password link to your email address you provided. Please verify and reset your password.",
    submit: "Check email",
  },
  resetPassword: {
    title: "Reset Password",
    description:
      "Please create your new password. Do not share your password with anyone.",
    submit: "Send Verification Link",
  },
};

export const DEMO_USER = {
  name: "Kevin B.",
  email: "kevin@hareer.com",
  role: "ADMIN",
};