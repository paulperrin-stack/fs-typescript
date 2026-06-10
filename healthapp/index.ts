import express from 'express';
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (
        typeof height !== 'string' ||
        typeof weight !== 'string' ||
        isNaN(Number(height)) ||
        isNaN(Number(weight))
    ) {
        return res.status(400).json({
            error: 'malformatted parameters',
        });
    }

    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    return res.json({
        weight: weightNumber,
        height: heightNumber,
        bmi: calculateBmi(heightNumber, weightNumber),
    });
});

app.post('/exercises', (req, res) => {
    const body = req.body;

    if (
        body.daily_exercises === undefined || body.target === undefined
    ) {
        return res.status(400).json({
            error: 'parameters missing'
        });
    }

    const dailyExercises = body.daily_exercises;

    const target = body.target;

    if (
        !Array.isArray(dailyExercises) ||
        typeof target !== 'number' ||
        dailyExercises.some(
            value => typeof value !== 'number'
        )
    ) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    return res.json(
        calculateExercises(
            dailyExercises,
            target
        )
    );
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});