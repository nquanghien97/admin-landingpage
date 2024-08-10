import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layout";
import Home from "../pages/Home";
import Products from "../pages/products";
import Feedback from "../pages/feedback";
import Handbook from "../pages/handbook";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/cam-nang" element={<Handbook />} />
      </Route>
      {/* <Route path="/thay-doi-mat-khau" element={<ChangePasswordPage />} /> */}
    </>
  )
);

export default router;