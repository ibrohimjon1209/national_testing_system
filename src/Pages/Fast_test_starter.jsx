import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Fast_test_starter = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            navigate("/send_test", { state: { testId: id } });
        } else {
            navigate("/send_test");
        }
    }, [id, navigate]);

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-[#1a2328] text-[#e2e8f0] text-center p-10">
            <h1 className="text-2xl font-bold mb-4">Yuklanmoqda...</h1>
            <Loader2 className="animate-spin h-12 w-12 text-[#4a90e2]" />
        </div>
    );
};

export default Fast_test_starter;
