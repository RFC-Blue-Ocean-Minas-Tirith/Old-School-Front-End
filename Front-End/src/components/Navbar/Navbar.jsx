import { Link } from 'react-router-dom';

function Navbar() {
  // const [reviews, setReviews] = useState([])

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Old School</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </ul>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button">Notifications</Link>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button">Upload</Link>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button">Login</Link>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button">Signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
