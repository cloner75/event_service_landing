import Footer from '@/components/Footer';
import Header from '@/components/Main/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dopin',
  description: 'Dopin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 antialiased overflow-x-hidden min-h-screen bg-[#FFF2FE] w-screen">
      <Header />
      <main className="max-w-161.5 py-4 mx-auto w-full">
        <section className="">{children}</section>
      </main>
      <Footer className="mt-0" />
    </div>
  );
}
