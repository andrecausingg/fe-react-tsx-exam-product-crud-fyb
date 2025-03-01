// React
import { createRoot } from "react-dom/client";

// Tailwind
import "./assets/style/index.css";

// Mantine
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Component
import App from "./App";

// React tanstack
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

// Mantine Theme
const theme = createTheme({
  colors: {
    blue: [
      "#eff6ff",
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
    ],
  },
  headings: {
    fontFamily: "Jost, sans-serif",
  },
  primaryColor: "blue",
  fontFamily: "Jost, sans-serif", // Set Jost as the default font for Mantine components
});

// Context
// import { EuDeviceProvider } from "./context/EuDeviceContext";
// import { TokenProvider } from "./context/TokenContext";
// import { SideNavProvider } from "./context/SideNavContext";
// import { InfoProvider } from "./context/InfoContext";

// React tanstack
const queryClient = new QueryClient();

const rootElement = document.getElementById("root") as HTMLElement;
if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <Notifications position="top-right" zIndex={1000} />
          <App />
        </MantineProvider>
        {/* <EuDeviceProvider>
          <TokenProvider>
            <SideNavProvider>
              <InfoProvider>
                <MantineProvider theme={theme}>
                  <Notifications position="top-right" zIndex={1000} />
                  <App />
                </MantineProvider>
              </InfoProvider>
            </SideNavProvider>
          </TokenProvider>
        </EuDeviceProvider> */}
      </Provider>
    </QueryClientProvider>
  );
}
