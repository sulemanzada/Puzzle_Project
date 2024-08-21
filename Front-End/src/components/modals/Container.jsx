const Container = ({ children, width }) => {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60 w-full flex items-center justify-center min-h-screen z-50">
            <div
                className={`flex items-center ${width} bg-white border border-black rounded-lg p-5 gap-3 flex-col shadow-md mx-auto`}
            >
                {children}
            </div>
        </div>
    );
};
export default Container;
