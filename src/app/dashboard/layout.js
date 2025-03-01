import Header from '@/components/header';

export default function dashboardLayout({ children }) {
  return (
    <div className={`h-screen overflow-auto`}>
      <Header />
      {children}
    </div>
  );
}
