import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";


export default function Layout(props) {
    const { children } = props;
    const { globalUser, logout } = useAuth();


    const header = (
        <header>
            <div className="d-flex mb-3">
                <div className="p-3">
                    <h1 className="fw-bolder gradient-start">CAFFIEND</h1>
                    <p>For Coffee Insatiates</p>
                </div>
                <div className="ms-auto p-3">
                    {
                        globalUser ?
                            <button
                                type="button"
                                className="btn btn-outline-secondary p-3"
                                onClick={logout}
                            >
                                <span className="fw-bold">
                                    Logout  <i className="fa-solid fa-right-from-bracket"></i>
                                </span>
                            </button> :
                            <button
                                type="button"
                                className="btn btn-outline-secondary p-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <span className="fw-bold">
                                    Sign up free  <i className="fa-solid fa-mug-hot"></i>
                                </span>
                            </button>
                    }
                </div>
            </div>
        </header>
    );

    const footer = (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col py-3 pt-5 text-center">
                        <span className="gradient-start">Caffiend</span> was made by
                            <a target="_blank" href="https://www.smoljames.com"> Smoljames </a> using the
                            <a href="https://www.fantacss.smoljames.com" target="_blank"> FantaCSS </a> design library.<br />
                        Check out the project on
                            <a target="_black" href="https://www.github.com/jamezmca/reactjs-full-course"> GitHub </a>!
                    </div>
                </div>
            </div>
        </footer>
    );


    return (
        <>
            <Modal>
                <Authentication />
            </Modal>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}