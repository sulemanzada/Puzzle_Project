import Container from "./Container.jsx";
import Spinner from "../Spinner";

const DeleteAccount = ({ yes, no, disabled }) => {
    return (
        <Container width={"max-w-[80%]"}>
            <p className="text-xl mb-5">
                Are you sure you want to delete your account?
            </p>
            <div className="flex items-center justify-between w-full">
                <button
                    disabled={disabled}
                    onClick={yes}
                    className="bg-green-600 text-xl flex items-center justify-center text-white p-3 w-[45%] border border-black rounded-lg"
                >
                    {disabled ? <Spinner size="text-2xl" /> : "Yes"}
                </button>
                <button
                    disabled={disabled}
                    onClick={no}
                    className="bg-red-600 text-xl text-white p-3 w-[45%] border border-black rounded-lg"
                >
                    No
                </button>
            </div>
        </Container>
    );
};
export default DeleteAccount;
