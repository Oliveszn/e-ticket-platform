import { useEffect, useState } from "react";

interface CountdownProps {
  eventDate: string;
}

const Countdown = ({ eventDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const target = new Date(eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setStarted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div className="text-center">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-blue-500 rounded text-white flex text-center p-4 items-center flex-col"
          >
            <span className="text-3xl font-semibold">{item.value}</span>
            <span className="text-xs uppercase tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {started && <p className="text-sm text-gray-500">Event Started!</p>}
    </div>
  );
};

export default Countdown;
