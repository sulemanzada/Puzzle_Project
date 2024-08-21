import { useEffect, useState } from "react";

const Notification = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        setTimeout(() => setVisible(false), 3000);
    }, []);

    return (
        <div
            className="bg-slate-800 shadow-md text-white absolute z-[999] left-1 bottom-1 px-5 py-2"
            hidden={!visible}
        >
            Your cookie has expired, you have been logged out automatically.
        </div>
    );
};

export default Notification;
