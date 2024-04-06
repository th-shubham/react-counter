import React, { useState, useMemo, useCallback } from "react";
import { PageStyle } from "./StyleApp"; // Assuming CSS modules or styled-components
import {
	format,
	addDays,
	startOfDay,
	differenceInCalendarDays,
} from "date-fns"; // Enhanced date manipulation

function App() {
	const [step, setStep] = useState(1);
	const [count, setCount] = useState(0);
	const [date, setDate] = useState(new Date());

	const dateFormatter = useMemo(() => {
		return new Intl.DateTimeFormat("en-US", {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}, []);

	const formatDate = useCallback(
		(date) => {
			return dateFormatter.format(date);
		},
		[dateFormatter]
	);

	const adjustCountAndDate = useCallback(
		(adjustmentFactor) => {
			setCount((prevCount) => prevCount + step * adjustmentFactor);
			setDate((prevDate) => addDays(prevDate, step * adjustmentFactor));
		},
		[step]
	);

	const dateTimeFormat = useMemo(() => {
		const today = startOfDay(new Date());
		const selectedDate = startOfDay(date);
		const diffDays = differenceInCalendarDays(selectedDate, today);

		let message = `Today is ${formatDate(selectedDate)}`;
		if (diffDays > 0) {
			message = `${diffDays} days from today is ${formatDate(selectedDate)}`;
		} else if (diffDays < 0) {
			message = `${Math.abs(diffDays)} days ago from today was ${formatDate(
				selectedDate
			)}`;
		}

		return message;
	}, [date, formatDate]);

	return (
		<main style={PageStyle}>
			<div className="control-panel">
				<button
					aria-label="Decrease step"
					onClick={() => setStep((s) => Math.max(1, s - 1))}
				>
					-
				</button>
				<span>Step: {step}</span>
				<button
					aria-label="Increase step"
					onClick={() => setStep((s) => s + 1)}
				>
					+
				</button>
			</div>
			<div className="counter">
				<button
					aria-label="Decrease count"
					onClick={() => adjustCountAndDate(-1)}
				>
					-
				</button>
				<span>Count: {count}</span>
				<button
					aria-label="Increase count"
					onClick={() => adjustCountAndDate(1)}
				>
					+
				</button>
			</div>

			<h3>{dateTimeFormat}</h3>
		</main>
	);
}

export default App;
