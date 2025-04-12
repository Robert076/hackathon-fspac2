import { Toaster } from "react-hot-toast";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-center"></Toaster>
        {children}
      </body>
    </html>
  );
}
