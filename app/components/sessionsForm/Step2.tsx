import DatePicker from "../date";
import TimePicker from "../time";

export default function Step2() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center md:text-right w-full mb-8 -mt-4">
        <p className="text-sm text-[#7e9b9c]">
          اختر التاريخ والوقت المفضلين لديك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <DatePicker />
        <TimePicker />
      </div>
    </div>
  );
}
