import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
export default function dashboardLayout({ children }) {
  return (
    <div className={`h-screen overflow-auto`}>
      <Header />
      <div className="w-full mt-4 flex flex-row">
        <Sidebar />
        <div className="w-full bg-[#E9E6DD] mx-6 rounded-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
}
