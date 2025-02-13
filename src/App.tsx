import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavigationLayout from "./layouts/sidebar_navigation_layout";
import Spinner from "./components/spinner/spinner";
import { RefundOrdersProvider } from "./context/RefundOrdersContext";

const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const OrderItems = lazy(() => import("./pages/dashboard/[order_items]/order_items"));
const NotFoundPage = lazy(() => import("./pages/not_found"));



const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route
          index
          element={
            <NavigationLayout>
              <RefundOrdersProvider>
                <Dashboard />
              </RefundOrdersProvider>
            </NavigationLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <NavigationLayout>
              <RefundOrdersProvider>
                <Dashboard />
              </RefundOrdersProvider>
            </NavigationLayout>
          }
        />
        <Route
          path="/:id"
          element={
            <NavigationLayout>
              <OrderItems />
            </NavigationLayout>
          }
        />
        <Route
          path="*"
          element={
            <NavigationLayout>
              <NotFoundPage />
            </NavigationLayout>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;