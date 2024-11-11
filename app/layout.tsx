import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/context/AuthContext";



export const metadata: Metadata = {
  title: "Pro Oasis",
  description: "The super manager you always wanted",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        {/* <PrivateRoute> */}
        <AuthProvider>
          <ToastContainer />
          {children}
        </AuthProvider>
        {/* </PrivateRoute> */}
      </body>
    </html>
  );
}
