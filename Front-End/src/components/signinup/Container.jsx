const Container = ({ onSubmit, children }) => {
    return (
        <div className="flex flex-col items-center justify-center max-w-[900px] min-h-screen my-5 p-5 mx-auto">
            <form
                onSubmit={onSubmit}
                className="w-full bg-white border border-black rounded-lg flex flex-col gap-7 p-4 shadow-2xl"
            >
                {children.slice(0, -1)}
            </form>
            {children.slice(-1)}
        </div>
    );
};

export default Container;
