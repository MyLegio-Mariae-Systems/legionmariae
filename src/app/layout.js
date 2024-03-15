import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {config} from '@fortawesome/fontawesome-svg-core'
import Script from 'next/script'

config.autoAddCss=false

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Legion Maria of African Church Mission",
  // description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://unpkg.com/@material-tailwind/html@latest/scripts/collapse.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
