export type Id = string;
export type ISODateString = string;

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";
export type CourseCategory = "bakery" | "pastry" | "savory" | "international";

export interface Student {
  id: Id;
  fullName: string;
  email: string;
  birthDate: ISODateString;
  city: string;
  experienceLevel: ExperienceLevel;
  isAdult: (minimumAge?: number) => boolean;
}

export interface CookingCourse {
  id: Id;
  title: string;
  category: CourseCategory;
  difficulty: ExperienceLevel;
  maxStudents: number;
  priceUsd: number;
  startDate: ISODateString;
  endDate: ISODateString;
  isOpenOn: (date: ISODateString) => boolean;
}

export interface Enrollment {
  id: Id;
  studentId: Id;
  courseId: Id;
  enrolledAt: ISODateString;
  totalPaidUsd: number;
  isPaymentComplete: (coursePriceUsd: number) => boolean;
}

export const sampleStudent: Student = {
  id: "student-001",
  fullName: "Ana Gomez",
  email: "ana.gomez@example.com",
  birthDate: "2000-04-15",
  city: "Madrid",
  experienceLevel: "beginner",
  isAdult: (minimumAge = 18) => {
    const today = new Date();
    const birthDate = new Date("2000-04-15");
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= minimumAge;
  }
};

export const sampleCourse: CookingCourse = {
  id: "course-001",
  title: "Artisan Bread Fundamentals",
  category: "bakery",
  difficulty: "beginner",
  maxStudents: 16,
  priceUsd: 250,
  startDate: "2026-08-01",
  endDate: "2026-08-29",
  isOpenOn: (date) => {
    const reference = new Date(date).getTime();
    return reference >= new Date("2026-08-01").getTime() && reference <= new Date("2026-08-29").getTime();
  }
};

export const sampleEnrollment: Enrollment = {
  id: "enrollment-001",
  studentId: "student-001",
  courseId: "course-001",
  enrolledAt: "2026-07-20",
  totalPaidUsd: 150,
  isPaymentComplete: (coursePriceUsd) => 150 >= coursePriceUsd
};
