import { isNotNumber } from "./utils.ts";

export const calculateBmi = (
    heightCm: number,
    weightKg: number
): string => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal range";
    if (bmi < 30) return "Overweight";
    return "Obese";
};

export const parseBmiArguments = (
    args: string[]
): [number, number] => {
    if (args.length !== 4) {
        throw new Error("Wrong number of arguments");
    }
    if (isNotNumber(args[2]) || isNotNumber(args[3])) {
        throw new Error("Provided values were not numbers!");
    }
    return [Number(args[2]), Number(args[3])];
};

// run only when executed directly, not when imported by index.ts
if (process.argv[1] === import.meta.filename) {
    try {
        const [height, weight] = parseBmiArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        console.log(errorMessage);
    }
}