import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </>
  );
}