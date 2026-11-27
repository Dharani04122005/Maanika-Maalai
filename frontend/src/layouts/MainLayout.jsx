
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
    

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;