import { RouterProvider } from "react-router";
import route from "./route";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./Redux/authSlice";


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUserFromStorage())
  },[dispatch])
  return (
    <>
      <RouterProvider router={route}>
      </RouterProvider>
    </>
  );
}

export default App;
