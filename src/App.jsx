import { RouterProvider } from "react-router";
import route from "./route";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./Redux/authSlice";
import { Toaster } from "react-hot-toast";


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUserFromStorage())
  },[dispatch])
  return (
    <>
      <RouterProvider router={route}>
      </RouterProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
