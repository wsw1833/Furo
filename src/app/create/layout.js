export default function CreateLayout({ children }) {
  return (
    <div className={`py-10 h-screen overflow-auto flex justify-center`}>
      {children}
    </div>
  );
}
