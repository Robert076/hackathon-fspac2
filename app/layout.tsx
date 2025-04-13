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
        <Toaster
          position="bottom-center"
          toastOptions={{ style: { fontSize: "12px" } }}
        ></Toaster>
        {children}
      </body>
    </html>
  );
}
