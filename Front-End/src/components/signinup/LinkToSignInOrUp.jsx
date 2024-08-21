import { Link } from "react-router-dom";

const LinkToSignInOrUp = ({ text, link }) => {
    return (
        <p className="text-white text-lg">
            {text}{" "}
            <Link
                to={"/" + link.toLowerCase()}
                className="hover:underline text-green-300"
            >
                {link}
            </Link>
        </p>
    );
};
export default LinkToSignInOrUp;
