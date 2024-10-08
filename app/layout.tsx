import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import {Roboto_Slab,Roboto} from 'next/font/google'
import { Footer } from "@/components/footer";

export const robotoSlab = Roboto_Slab({
  subsets: ['latin'], // 选择所需的字母子集
  weight: ['400', '500'], // 指定所需的字体粗细
  style: ['normal'], // 指定字体样式
  display: 'swap', // 设置字体加载的显示策略
  variable: '--roboto-slab-font', // 定义 CSS 变量
});

export const roboto= Roboto({
  subsets: ['latin'], // 选择所需的字母子集
  weight: ['400', '500'], // 指定所需的字体粗细
  style: ['normal'], // 指定字体样式
  display: 'swap', // 设置字体加载的显示策略
  variable: '--roboto-font', // 定义 CSS 变量
});


export const metadata: Metadata = {
  title: "Free PDF Page Rotator - Rotate Individual or All Pages",
  description: "Generated by create next app",
  icons: {
    icon: '/logo.svg'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       
      <body
        className={`${robotoSlab.variable} ${roboto.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
