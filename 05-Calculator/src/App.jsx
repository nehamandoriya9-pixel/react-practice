import React from "react";
import { useState } from "react";

export default function App() {
  const [calculatevalue, setCalculateValue] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [expression, setExpression] = useState("");

  const values = [
    "AC",
    "☒",
    "%",
    "7",
    "8",
    "9",
    "÷",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "×",
    "=",
  ];

  const calculation = (value) => {
    if (value === "AC") {
      setCalculateValue("0");
      setFirstNumber(null);
      setOperator(null);
      setShouldResetDisplay(false);
      setExpression("");
    }
    //delete last digit
    else if (value === "☒") {
      if (shouldResetDisplay) {
        setCalculateValue("0");
        setShouldResetDisplay(false);
      } else {
        setCalculateValue((prev) =>
          prev.length > 1 ? prev.slice(0, -1) : "0",
        );
        setExpression((prev) => (prev ? prev.slice(0, -1) : updatedValue));
      }
    }

    // percentange
    else if (value === "%") {
      setCalculateValue(String(Number(calculatevalue) / 100));
    }

    //Numbers
    else if (value >= "0" && value <= "9") {
      if (shouldResetDisplay || calculatevalue === "0") {
        setCalculateValue(value);
        setExpression((prev) => (operator ? `${prev} ${value}` : value));
        setShouldResetDisplay(false);
      } else {
        setCalculateValue(calculatevalue + value);
        setExpression((prev) => prev + value);
      }
    }

    //Opeartors
    else if (["+", "-", "÷", "×"].includes(value)) {
      setFirstNumber(Number(calculatevalue));
      setOperator(value);
      setExpression(`${calculatevalue} ${value}`);
      setShouldResetDisplay(true);
    }

    //Decimal Point
    else if (value === ".") {
      if (shouldResetDisplay) {
        setCalculateValue("0.");
        setShouldResetDisplay(false);
      } else if (!calculatevalue.includes(".")) {
        setCalculateValue(calculatevalue + ".");
      }
    } else if (value === "=") {
      if (firstNumber !== null && operator !== null) {
        const secondNumber = Number(calculatevalue);
        let result;

        if (operator === "+") {
          result = firstNumber + secondNumber;
        } else if (operator === "-") {
          result = firstNumber - secondNumber;
        } else if (operator === "×") {
          result = firstNumber * secondNumber;
        } else if (operator === "÷") {
          result = secondNumber === 0 ? "Error" : firstNumber / secondNumber;
        }
        setCalculateValue(
          result === "Error" ? "Error" : String(Number(result.toFixed(10))),
        );
        setFirstNumber(null);
        setShouldResetDisplay(true);
        setOperator(null);
        setExpression(String(result));
      }
    }
  };
  // console.log(values)
  return (
    <div className="min-h-screen justify-center items-center font-bold flex bg-gray-400">
      <div className="bg-white shadow-md rounded-2xl p-2 w-sm">
        <div className="bg-gray-100 rounded-xl p-4 mb-4 h-20 flex items-center justify-end">
          <span className="text-3xl font-semibold">
            {expression || calculatevalue}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 p-2">
          {values.map((item, index) => (
            <button
              key={index}
              className={`rounded-xl shadow-md h-14 text-lg
                ${
                  ["÷", "×", "-", "+", "="].includes(item)
                    ? "bg-orange-400 text-white hover:bg-orange-500"
                    : ["AC", "⌫", "%"].includes(item)
                      ? "bg-gray-300 hover:bg-gray-500"
                      : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => calculation(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
