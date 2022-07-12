import "./App.scss";

import { Routes, Route } from "react-router-dom";
import Layout from "@pages/Layout";
import Header from "@components/Header/Header";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              {/* <Home /> */}
              <h1>Home</h1>
            </>
          }
        />
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="unauthorized" element={<Unauthorized />} /> */}

        {/* we want to protect these routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
        <Route
          path="checkout"
          element={
            <>
              <Header />
              {/* <Checkout /> */}
              <h1>Checkout</h1>
            </>
          }
        />
        <Route
          path="orders"
          element={
            <>
              <Header />
              {/* <Orders /> */}
              <h1>Orders</h1>
            </>
          }
        />
        <Route
          path="payment"
          element={
            <>
              <Header />
              {/* <Payment /> */}
              <h1>Payment</h1>
            </>
          }
        />
      </Route>
      {/* catch all */}
      {/* <Route path="*" element={<Missing />} /> */}
      {/* </Route> */}
    </Routes>
  );
}
