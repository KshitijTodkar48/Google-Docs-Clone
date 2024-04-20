import Img1 from "../assets/Google-Docs-logo.png" ;
import Img2 from "../assets/SearchIcon.jpeg" ;

export const Topbar = () => {
    return(
        <nav className="Topbar">
            <div className="logodiv">
                <img src={Img1} alt="Logo" />
                <span> Docs </span>
            </div>
            <div className="Searchbar">
                <img src={Img2} alt="" />
                <input type="text" placeholder="Search"/>   
            </div>
        </nav>
    )
}