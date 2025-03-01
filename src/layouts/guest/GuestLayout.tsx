// React
import { Outlet } from "react-router-dom";

const GuestLayout: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default GuestLayout;
