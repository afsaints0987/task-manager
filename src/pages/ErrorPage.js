import {Link} from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="container" id="error">
            <h3>Sorry, Page not Found :(</h3>
            <Link to='/dashboard' className="text-primary">&larr; Go Back</Link>
        </div>
    )
}

export default ErrorPage
