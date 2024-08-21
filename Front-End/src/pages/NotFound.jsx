const NotFound = () => {
    return (
        <div className="flex flex-col gap-5 text-white items-center justify-center w-full h-fit mt-[36vh]">
            <h1 className="text-5xl mb-1">Oops...</h1>
            <i className="text-3xl">Error: 404</i>
            <p className="text-4xl">Page not found.</p>
        </div>
    );
};

export default NotFound;
