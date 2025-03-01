// // React
// import { useContext, useEffect } from "react";
// import { Outlet } from "react-router-dom";

// // Component
// import Sidenav from "../../components/side-nav/Sidenav";

// // Redux
// import { useAppSelector, useAppDispatch } from "../../redux/hooks";
// import { selectNameHamburger } from "../../redux/features/hamburger/hamburgerSlice";

// // Mantine
// import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const AuthenticatedLayout: React.FC = () => {
  // const { hamburgerIsOpen } = useAppSelector(selectNameHamburger);
  // const dispatch = useAppDispatch();

  // // Mantine MediaQuery hook for checking if the screen width matches the "md" breakpoint
  // const isMdUp = useMediaQuery("(min-width: 768px)");

  // // Manage body overflow style
  // useEffect(() => {
  //   if (hamburgerIsOpen && !isMdUp) {
  //     document.body.style.overflow = "hidden"; // Prevent scrolling when hamburger is open
  //   } else {
  //     document.body.style.overflow = "auto"; // Enable scrolling
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto"; // Reset on cleanup
  //   };
  // }, [hamburgerIsOpen, isMdUp]);

  return (
    // <div>
    //   {/* Side navigation */}
    //   <aside
    //     className={`${
    //       hamburgerIsOpen ? "block" : "hidden"
    //     } md:block fixed left-0 z-50 "`}
    //   >
    //     <div className="relative z-50">
    //       <Sidenav />
    //     </div>
    //     <div className="md:hidden bg-black bg-opacity-50 h-[100vh] w-full z-40 inset-0 fixed"></div>
    //   </aside>

    //   {/* Main content area */}
    //   <main className="md:ml-[300px]">
    //     <div className="p-4">
    //       <Outlet />
    //     </div>
    //   </main>
    // </div>
    <></>
  );
};

export default AuthenticatedLayout;
