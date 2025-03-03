import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
export default function dashboardLayout({ children }) {
  return (
    <div className={`h-screen overflow-auto`}>
      <Header />
      <div className="w-full h-[40rem] mt-4 flex flex-row">
        <Sidebar />
        <div className="w-full md:w-screen bg-[#E9E6DD] xl:h-full h-max mx-6 rounded-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
}
