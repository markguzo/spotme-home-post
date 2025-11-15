import { getOpenAIClient } from "./openai";

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  rest?: number;
  notes?: string;
}

export interface WorkoutRoutine {
  title: string;
  exercises: Exercise[];
  duration: number;
  description?: string;
}

export const generateWorkoutRoutine = async (
  goal: string,
  experience: string,
  frequency: string,
  duration: string,
  equipment: string[],
  focus: string[]
): Promise<WorkoutRoutine> => {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OpenAI API key not configured");
  }

  const prompt = `Create a personalized workout routine based on the following preferences:

Goal: ${goal}
Experience Level: ${experience}
Workout Frequency: ${frequency} per week
Session Duration: ${duration} minutes
Available Equipment: ${equipment.join(", ")}
Focus Areas: ${focus.join(", ")}

Please generate a workout routine with:
1. A creative, motivating title
2. 4-8 exercises appropriate for the experience level
3. Sets, reps, and suggested weight (if applicable) for each exercise
4. Rest periods between sets
5. Brief notes for each exercise

Return the response as a JSON object with this exact structure:
{
  "title": "Routine Name",
  "description": "Brief description",
  "duration": ${duration},
  "exercises": [
    {
      "name": "Exercise Name",
      "sets": 3,
      "reps": 10,
      "weight": 135,
      "rest": 60,
      "notes": "Form tips"
    }
  ]
}

Only return the JSON, no additional text.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional fitness trainer. Generate workout routines in JSON format only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    // Extract JSON from response (handle markdown code blocks if present)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    const workout = JSON.parse(jsonMatch[0]) as WorkoutRoutine;
    return workout;
  } catch (error) {
    console.error("Error generating workout:", error);
    throw error;
  }
};

export const modifyRoutineWithAI = async (
  routine: WorkoutRoutine,
  userRequest: string
): Promise<WorkoutRoutine> => {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OpenAI API key not configured");
  }

  const prompt = `Modify this workout routine based on the user's request:

Current Routine:
${JSON.stringify(routine, null, 2)}

User Request: ${userRequest}

Modify the routine according to the request while maintaining the same structure. Return only the JSON object with the same format as the input.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional fitness trainer. Modify workout routines based on user requests. Return only JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    const modifiedRoutine = JSON.parse(jsonMatch[0]) as WorkoutRoutine;
    return modifiedRoutine;
  } catch (error) {
    console.error("Error modifying routine:", error);
    throw error;
  }
};

export const analyzeWorkoutData = async (workoutData: any): Promise<string> => {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OpenAI API key not configured");
  }

  const prompt = `Analyze this workout data and provide insights:

${JSON.stringify(workoutData, null, 2)}

Provide a comprehensive analysis including:
1. Overall progress trends
2. Strength improvements
3. Consistency patterns
4. Recommendations for improvement
5. Areas of concern

Format the response in a clear, motivating way.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a fitness data analyst. Provide clear, actionable insights from workout data.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || "Unable to analyze data.";
  } catch (error) {
    console.error("Error analyzing data:", error);
    throw error;
  }
};

export const getGymHelperResponse = async (
  question: string,
  imageBase64?: string
): Promise<string> => {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OpenAI API key not configured");
  }

  const messages: any[] = [
    {
      role: "system",
      content: "You are a knowledgeable gym trainer and form expert. Help users with exercise form, technique, and workout questions. Be encouraging and provide clear, actionable advice.",
    },
    {
      role: "user",
      content: question,
    },
  ];

  // If image is provided, use vision model
  if (imageBase64) {
    messages[1].content = [
      {
        type: "text",
        text: question,
      },
      {
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${imageBase64}`,
        },
      },
    ];
  }

  try {
    const completion = await client.chat.completions.create({
      model: imageBase64 ? "gpt-4o-mini" : "gpt-4o-mini", // Use vision-capable model if image
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Error getting gym helper response:", error);
    throw error;
  }
};

