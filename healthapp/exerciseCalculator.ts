import { isNotNumber } from "./utils";

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    dailyHours: number[],
    target: number
): ExerciseResult => {
    const periodLength = dailyHours.length;

    const trainingDays = dailyHours.filter(
        hours => hours > 0
    ).length;

    const totalHours = dailyHours.reduce(
        (sum, hours) => sum + hours,
        0
    );

    const average = totalHours / periodLength;

    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = "great job, target achieved";
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "you need to exercise more";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseExerciseArguments = (
    args: string[]
): { target: number; dailyHours: number[] } => {
    if (args.length < 4) {
        throw new Error("Not enough arguments");
    }

    const values = args.slice(2);

    if (values.some(isNotNumber)) {
        throw new Error("Provided values were not numbers!");
    }

    return {
        target: Number(values[0]),
        dailyHours: values.slice(1).map(Number),
    };
};

try {
    const { target, dailyHours } =
    parseExerciseArguments(process.argv);

    console.log(
        calculateExercises(dailyHours, target)
    );
} catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }

    console.log(errorMessage);
}

export { calculateExercises };
export type { ExerciseResult };