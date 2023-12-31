import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import NavbarComponent from "./components/NavbarComponent";
import Profile from "./components/pages/ProfilePage";
import "./custom.scss";
import "../src/assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import ShoppingCartPage from "./components/pages/ShoppingCartPage";
import UploadPage from "./components/pages/UploadPage";
import NavbarMobile from "./components/NavbarMobile";
import Details from "./components/pages/Details";
import ArtistPage from "../src/components/pages/ArtistPage";
import LogoComponent from "./components/LogoComponent";
import LogInPage from "./components/pages/LoginPage";
import SearchPage from "./components/pages/SearchPage";
import EditPage from "./components/pages/EditPage";

// import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <NavbarComponent></NavbarComponent>

        <LogoComponent></LogoComponent>

        <Routes>
          <Route element={<Home></Home>} path="/"></Route>
          <Route element={<Details></Details>} path="/details-page/:id"></Route>
          <Route element={<UploadPage></UploadPage>} path="/upload"></Route>
          <Route element={<Profile></Profile>} path="/profile"></Route>
          <Route element={<SearchPage></SearchPage>} path="/search"></Route>
          <Route
            element={<ArtistPage></ArtistPage>}
            path="/artist-page/:uid"
          ></Route>
          <Route element={<EditPage></EditPage>} path="/edit-page/:id"></Route>

          <Route element={<LogInPage></LogInPage>} path="/login"></Route>
          <Route
            element={<ShoppingCartPage></ShoppingCartPage>}
            path="/shopping-cart"
          ></Route>
          <Route element={<NotFound />} path="*" />
        </Routes>
        <NavbarMobile></NavbarMobile>
        {/* <FooterComponent></FooterComponent> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
