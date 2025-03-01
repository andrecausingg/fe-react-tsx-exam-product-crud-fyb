import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Router
import routerConfig from "./router";

// Context
// import { EuDeviceContext } from "./context/EuDeviceContext";
// import { TokenContext } from "./context/TokenContext";
// import { SideNavContext } from "./context/SideNavContext";
// import { InfoContext } from "./context/InfoContext";

// Mantine
import { LoadingOverlay } from "@mantine/core";

const App: React.FC = () => {
  // const { euDevice } = useContext(EuDeviceContext);
  // const { token } = useContext(TokenContext);
  // const { sideNav } = useContext(SideNavContext);
  // const { info } = useContext(InfoContext);

  const [selectedRoute, setSelectedRoute] = useState<string>("guest");

  // useEffect(() => {
  //   if (info?.role) {
  //     setSelectedRoute(
  //       info.role === "super_admin"
  //         ? "superAdmin"
  //         : info.role === "admin"
  //         ? "admin"
  //         : info.role === "lender"
  //         ? "admin"
  //         : info.role === "lender_staff"
  //         ? "lenderStaff"
  //         : "guest"
  //     );
  //   }
  // }, [info]);

  // useEffect(() => {
  //   if (!token) {
  //     window.location.href = "/";
  //   }
  // }, [token]);

  const routingConfig = routerConfig[selectedRoute] || []; // Fallback to empty array if undefined

  return (
    <>
      {/* {(euDevice === "" || euDevice === undefined) && (
        <LoadingOverlay
          visible={euDevice === ""}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )} */}

      <BrowserRouter>
        <Routes>
          {routingConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  >
                    {childRoute.children &&
                      childRoute.children.map((nestedRoute, nestedIndex) => (
                        <Route
                          key={nestedIndex}
                          path={nestedRoute.path}
                          element={nestedRoute.element}
                        />
                      ))}
                  </Route>
                ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
