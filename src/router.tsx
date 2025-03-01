// Layout
import AuthenticatedLayout from "./layouts/authenticated/AuthenticatedLayout";
import GuestLayout from "./layouts/guest/GuestLayout";

// Guest View
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";

// Auth View
import ProductView from "./views/product/ProductView";

// Not found
import NotFound from "./views/not-found/NotFound";


interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

const routerConfig: Record<string, RouteConfig[]> = {
  guest: [
    {
      path: "/",
      element: <GuestLayout />,
      children: [
        {
          path: "/",
          element: <LoginView />,
        },
        {
          path: "/register",
          element: <RegisterView />,
        },
        {
          path: "/product",
          element: <ProductView />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],

  superAdmin: [
    {
      // Layout
      path: "/",
      element: <AuthenticatedLayout />,
      children: [
        // PAGES
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default routerConfig;
