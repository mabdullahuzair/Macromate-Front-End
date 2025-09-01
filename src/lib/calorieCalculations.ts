interface PersonalInfo {
  age: number;
  weight: number;
  height: string;
  gender: string;
  weightUnit: string;
  heightUnit: string;
}

interface GoalData {
  primaryGoal: string; // e.g., "lose", "gain", "maintain"
  calorieAdjustment?: number | null; // Optional adjustment in calories
  weightChangeRate?: string; // e.g., "0.5", "1", "1.5", "2" (lbs/week) - Note: This field is not used in the current code but is in the interface.
}

interface ActivityData {
  activityMultiplier: number | null; // Use nullish coalescing ??
}

/**
 * Calculate BMR using Mifflin-St Jeor equation
 * More accurate than Harris-Benedict for modern populations
 */
export function calculateBMR(personalInfo: PersonalInfo): number {
  // Basic check for essential missing data.
  // Note: age/weight 0 are treated as missing here, height "" is missing.
  if (!personalInfo.age || !personalInfo.weight || !personalInfo.height) {
    return 0;
  }

  // Use parseFloat directly on the value (handles numbers and strings) and add || 0 for robustness
  let weightInKg = parseFloat(personalInfo.weight as any) || 0; // Use `as any` or update interface if strings are common
  let heightInCm = 0;
  // Use parseInt directly on the value (handles numbers and strings) and add || 0
  const age = parseInt(personalInfo.age as any) || 0; // Use `as any` or update interface if strings are common
  const isMale = personalInfo.gender?.toLowerCase() === "male"; // Added toLowerCase for case-insensitivity

  // If any core value ended up as 0 after parsing, return 0
  if (weightInKg === 0 || age === 0) {
    return 0;
  }

  // Convert weight to kg if needed
  if (personalInfo.weightUnit?.toLowerCase() === "lbs") { // Added toLowerCase
    weightInKg = weightInKg / 2.20462; // More precise conversion
  }

  // Convert height to cm
  if (personalInfo.heightUnit?.toLowerCase() === "ft-in") { // Added toLowerCase
    let totalInches = 0;
    const heightStr = personalInfo.height.trim(); // Trim whitespace

    if (heightStr.includes("'")) {
      // Handles X'Y" format
      const parts = heightStr.split("'");
      const feet = parseFloat(parts[0]) || 0;
      const inchesPart = parts[1]?.replace('"', "").trim() || "0"; // Handle missing inch part, trim
      const inches = parseFloat(inchesPart) || 0;
      totalInches = feet * 12 + inches;
    } else {
      // Handles inputs like "5" (assuming feet) or "60" (assuming inches)
      // This is ambiguous, assuming a single number with ft-in unit means feet is common.
      // If the user enters just "70" with ft-in selected, it's likely intended as inches.
      // Let's assume if no ' symbol is present, it's either just feet or just inches.
      // A simple parseFloat and then checking range or context is hard.
      // Let's stick to assuming if no ' is present, it's just feet for simplicity as per the original logic intent, but acknowledge ambiguity.
      const feet = parseFloat(heightStr) || 0; // Assume input like "5" means 5 feet
      totalInches = feet * 12; // Convert feet to inches
    }
    heightInCm = totalInches * 2.54; // Convert total inches to cm

  } else {
    // Assume height is in cm (or raw number is in cm)
    heightInCm = parseFloat(personalInfo.height) || 0;
  }

  // If height ended up as 0 after parsing, return 0 (prevents calculation issues)
  if (heightInCm === 0) {
    return 0;
  }


  // Mifflin-St Jeor BMR calculation
  let bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age;

  if (isMale) {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  return Math.round(bmr);
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * BMR * activity multiplier
 */
export function calculateTDEE(
  personalInfo: PersonalInfo,
  activityData: ActivityData,
): number {
  const bmr = calculateBMR(personalInfo);
  // Use nullish coalescing ?? to default only if null or undefined
  const activityMultiplier = activityData.activityMultiplier ?? 1.2;

  // If BMR is 0 (due to invalid input), TDEE is 0
  if (bmr === 0) {
    return 0;
  }

  return Math.round(bmr * activityMultiplier);
}

/**
 * Calculate daily calorie goal based on goals
 * Applies deficit/surplus based on weight change goals
 */
export function calculateDailyCalories(
  personalInfo: PersonalInfo,
  goalData: GoalData,
  activityData: ActivityData,
): number {
  let tdee = calculateTDEE(personalInfo, activityData);

  // If TDEE is 0 (due to invalid input), daily calories is 0 before minimum floor
  if (tdee === 0) {
    return 0; // Apply min floor later
  }

  // Apply goal-based calorie adjustment
  // Check if calorieAdjustment is explicitly provided (not undefined or null)
  if (goalData.calorieAdjustment !== undefined && goalData.calorieAdjustment !== null) {
    // Only apply adjustment if goal is lose or gain
    if (goalData.primaryGoal?.toLowerCase() === "lose") { // Added toLowerCase
      tdee -= goalData.calorieAdjustment;
    } else if (goalData.primaryGoal?.toLowerCase() === "gain") { // Added toLowerCase
      tdee += goalData.calorieAdjustment;
    }
    // If goal is "maintain" or other, and adjustment is provided (e.g., 0), TDEE is used directly.
  } else {
    // Fallback: If no explicit adjustment is provided, use default 500 kcal based on goal
    if (goalData.primaryGoal?.toLowerCase() === "lose") { // Added toLowerCase
      tdee -= 500; // Default 1 lb/week deficit (approx)
    } else if (goalData.primaryGoal?.toLowerCase() === "gain") { // Added toLowerCase
      tdee += 500; // Default 1 lb/week surplus (approx)
    }
    // If goal is "maintain" and no adjustment is provided, TDEE is used directly.
  }

  // Ensure a minimum calorie intake (e.g., 1200 is common recommendation)
  // Apply rounding after applying the floor
  return Math.round(Math.max(tdee, 1200));
}

/**
 * Calculate BMI
 */
export function calculateBMI(personalInfo: PersonalInfo): number {
  // Basic check for essential missing data
  if (!personalInfo.weight || !personalInfo.height) return 0;

  // Use parseFloat directly on the value (handles numbers and strings) and add || 0 for robustness
  let weightInKg = parseFloat(personalInfo.weight as any) || 0; // Use `as any` or update interface if strings are common
  let heightInM = 0;

  // If weight ended up as 0 after parsing, return 0
  if (weightInKg === 0) {
    return 0;
  }


  // Convert weight to kg if needed
  if (personalInfo.weightUnit?.toLowerCase() === "lbs") { // Added toLowerCase
    weightInKg = weightInKg / 2.20462; // More precise conversion
  }

  // Convert height to meters
  if (personalInfo.heightUnit?.toLowerCase() === "ft-in") { // Added toLowerCase
    let totalInches = 0;
    const heightStr = personalInfo.height.trim(); // Trim whitespace

    if (heightStr.includes("'")) {
      // Handles X'Y" format
      const parts = heightStr.split("'");
      const feet = parseFloat(parts[0]) || 0;
      const inchesPart = parts[1]?.replace('"', "").trim() || "0"; // Handle missing inch part, trim
      const inches = parseFloat(inchesPart) || 0;
      totalInches = feet * 12 + inches;
    } else {
      // Handles inputs like "5" (assuming feet) or "70" (assuming inches).
      // Sticking to assuming feet if no ' as per the BMR logic.
      const feet = parseFloat(heightStr) || 0; // Assume input like "5" means 5 feet
      totalInches = feet * 12; // Convert feet to inches
    }
    heightInM = totalInches * 0.0254; // Convert total inches to meters

  } else {
    // Assume height is in cm and convert to meters
    heightInM = (parseFloat(personalInfo.height) || 0) / 100;
  }

  // Prevent division by zero if height is 0 after conversion
  if (heightInM === 0) return 0;

  // Calculate BMI
  // Return rounded BMI, typically to 1 decimal place
  return Math.round((weightInKg / (heightInM * heightInM)) * 10) / 10; // Rounded to 1 decimal place
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number) {
  // Handle non-positive BMI values gracefully
  if (bmi <= 0) return { label: "N/A", color: "text-gray-600" }; // Or some other indicator

  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600" };
  if (bmi < 25) return { label: "Normal", color: "text-green-600" };
  if (bmi < 30) return { label: "Overweight", color: "text-orange-600" };
  return { label: "Obese", color: "text-red-600" };
}

/**
 * Calculate macros in grams based on calories and percentages
 * proteinPercent, carbsPercent, fatPercent should ideally add up to 100
 */
export function calculateMacroGrams(
  calories: number,
  proteinPercent: number,
  carbsPercent: number,
  fatPercent: number,
) {
  // Ensure calories is not negative
  const safeCalories = Math.max(0, calories);

  // Defensive check: Ensure percentages are non-negative
  const safeProteinPercent = Math.max(0, proteinPercent);
  const safeCarbsPercent = Math.max(0, carbsPercent);
  const safeFatPercent = Math.max(0, fatPercent);


  const proteinGrams = Math.round((safeCalories * (safeProteinPercent / 100)) / 4);
  const carbGrams = Math.round((safeCalories * (safeCarbsPercent / 100)) / 4);
  const fatGrams = Math.round((safeCalories * (safeFatPercent / 100)) / 9);

  return { proteinGrams, carbGrams, fatGrams };
}