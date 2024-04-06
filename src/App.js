import { useState } from "react";
import { Page } from "./StyleApp";

function App() {
	const [step, setStep] = useState(1);
	const [count, setCount] = useState(0);
	const [date, updateDate] = useState(new Date());

	const formatDate = (() => {
		const formatter = new Intl.DateTimeFormat("en-US", {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		});

		return function (date) {
			return formatter.format(new Date(date));
		};
	})();

	const incrementStep = () => setStep((s) => s + 1);
	const decrementStep = () => setStep((s) => s - 1);

	const changeCountAndDate = (change) => {
		const newCount = count + step * change;
		const newDate = new Date();
		newDate.setDate(newDate.getDate() + newCount);

		setCount(newCount);
		updateDate(newDate);
	};
	function dateTimeFormat() {
		const today = new Date();
		const diffTime = date - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		const displayDate = formatDate(date);
		if (diffDays === 0) {
			return `Today is ${displayDate}`;
		} else if (diffDays > 0) {
			return `${diffDays} days from Today is ${displayDate}`;
		} else {
			return `${diffDays} days ago from Today was ${displayDate}`;
		}
	}
	return (
		<main style={Page}>
			<div style={{ paddingBottom: "1rem" }}>
				<button onClick={decrementStep}> - </button>
				<span>{` Step : ${step} `}</span>
				<button onClick={incrementStep}> + </button>
			</div>
			<div>
				<button onClick={() => changeCountAndDate(-1)}> - </button>
				<span>{` Count : ${count} `}</span>
				<button onClick={() => changeCountAndDate(+1)}> + </button>
			</div>

			<h3>{dateTimeFormat()}</h3>
		</main>
	);
}

export default App;
