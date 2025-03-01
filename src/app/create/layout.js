export default function createLayout({ children }) {
  return <div className={`py-10 h-screen overflow-auto`}>{children}</div>;
}
