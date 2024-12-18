import ResultPage from "../../../components/dashbord/ResultPage";
import FormPage from "../../../components/findPlan/findform";

export default function ResPage() {
  return (
    <div className="flex-1 flex">
    {/* Left: Results */}
    <div className="flex-1 bg-white">
    <ResultPage />
    </div>

    {/* Right: Search Form */}
    <div className="w-1/3 bg-gray-50 p-6">
      <FormPage />
    </div>
  </div>
  );
}