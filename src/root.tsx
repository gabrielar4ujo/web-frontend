import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="root">
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
}
