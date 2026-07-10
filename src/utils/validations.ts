import { CookingCourse, Enrollment, Student } from "../types/models";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateRequiredFields<T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[]
): ValidationResult {
  const errors: string[] = [];

  requiredFields.forEach((field) => {
    const value = data[field];

    if (value === undefined || value === null || value === "") {
      errors.push(`Field '${String(field)}' is required.`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateNumericRange(
  fieldName: string,
  value: number,
  minimum: number,
  maximum: number
): ValidationResult {
  const errors: string[] = [];

  if (value < minimum || value > maximum) {
    errors.push(`Field '${fieldName}' must be between ${minimum} and ${maximum}.`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateDateOrder(
  startDate: string,
  endDate: string,
  startLabel = "startDate",
  endLabel = "endDate"
): ValidationResult {
  const errors: string[] = [];
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();

  if (Number.isNaN(startTimestamp)) {
    errors.push(`Field '${startLabel}' must be a valid date.`);
  }

  if (Number.isNaN(endTimestamp)) {
    errors.push(`Field '${endLabel}' must be a valid date.`);
  }

  if (!Number.isNaN(startTimestamp) && !Number.isNaN(endTimestamp) && startTimestamp >= endTimestamp) {
    errors.push(`Field '${startLabel}' must be before '${endLabel}'.`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateStudent(student: Student): ValidationResult {
  const errors: string[] = [];
  const requiredCheck = validateRequiredFields(student as unknown as Record<string, unknown>, [
    "id",
    "fullName",
    "email",
    "birthDate",
    "city",
    "experienceLevel"
  ]);
  errors.push(...requiredCheck.errors);

  if (student.fullName.trim().length < 3) {
    errors.push("Student fullName must contain at least 3 characters.");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(student.email.trim())) {
    errors.push("Student email must be valid.");
  }

  if (!student.isAdult(16)) {
    errors.push("Student must be at least 16 years old.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCourse(course: CookingCourse): ValidationResult {
  const errors: string[] = [];
  const requiredCheck = validateRequiredFields(course as unknown as Record<string, unknown>, [
    "id",
    "title",
    "category",
    "difficulty",
    "maxStudents",
    "priceUsd",
    "startDate",
    "endDate"
  ]);
  errors.push(...requiredCheck.errors);

  if (course.title.trim().length < 5) {
    errors.push("Course title must contain at least 5 characters.");
  }

  const maxStudentsCheck = validateNumericRange("maxStudents", course.maxStudents, 1, 40);
  const priceCheck = validateNumericRange("priceUsd", course.priceUsd, 10, 10000);
  const dateCheck = validateDateOrder(course.startDate, course.endDate);

  errors.push(...maxStudentsCheck.errors, ...priceCheck.errors, ...dateCheck.errors);

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateEnrollment(
  enrollment: Enrollment,
  student: Student | undefined,
  course: CookingCourse | undefined
): ValidationResult {
  const errors: string[] = [];

  const requiredCheck = validateRequiredFields(enrollment as unknown as Record<string, unknown>, [
    "id",
    "studentId",
    "courseId",
    "enrolledAt",
    "totalPaidUsd"
  ]);
  errors.push(...requiredCheck.errors);

  if (!student) {
    errors.push(`Student '${enrollment.studentId}' does not exist.`);
  }

  if (!course) {
    errors.push(`Course '${enrollment.courseId}' does not exist.`);
  }

  if (course) {
    const amountCheck = validateNumericRange("totalPaidUsd", enrollment.totalPaidUsd, 0, course.priceUsd);
    errors.push(...amountCheck.errors);

    const enrollmentDate = new Date(enrollment.enrolledAt).getTime();
    const courseStartDate = new Date(course.startDate).getTime();

    if (Number.isNaN(enrollmentDate)) {
      errors.push("Enrollment date must be a valid date.");
    }

    if (!Number.isNaN(enrollmentDate) && enrollmentDate > courseStartDate) {
      errors.push("Enrollment date cannot be after course start date.");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
