import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/gallery", element: <SummaryPage /> },
      { path: "/create", element: <CreatePage /> },
      { path: "/crewmates/:id", element: <DetailPage /> },
      { path: "/crewmates/:id/edit", element: <EditPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}