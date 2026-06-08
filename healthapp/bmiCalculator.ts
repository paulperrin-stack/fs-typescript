import { isNotNumber } from "./utils";

const calculateBmi = (heightCm: number, weightKg: number): string => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    if (bmi < 18.5) {
        return "Underweight";
    }

    if (bmi < 25) {
        return "Normal range";
    }

    if (bmi < 30) {
        return "Overweight";
    }

    return "Obese";
};

const parseArguments = (args: string[]): [number, number] => {
    if (args.length !== 4) {
        throw new Error("Wrong number of arguments");
    }

    if (isNotNumber(args[2]) || isNotNumber(args[3])) {
        throw new Error("Provided values were not numbers!");
    }

    return [Number(args[2]), Number(args[3])];
};

try {
    const [height, weight] = parseArguments(process.argv);

    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }

    console.log(errorMessage);
}

export { calculateBmi };