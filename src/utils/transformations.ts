import { CookingCourse, CourseCategory, Enrollment } from "../types/models";

export function countByCategory<T, K extends string | number>(
  items: T[],
  categorySelector: (item: T) => K
): Record<string, number> {
  return items.reduce<Record<string, number>>((accumulator, item) => {
    const key = String(categorySelector(item));
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});
}

export function sumBy<T>(items: T[], numericSelector: (item: T) => number): number {
  return items.reduce((total, item) => total + numericSelector(item), 0);
}

export function minBy<T>(items: T[], numericSelector: (item: T) => number): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  return items.reduce((currentMin, item) => {
    return numericSelector(item) < numericSelector(currentMin) ? item : currentMin;
  });
}

export function maxBy<T>(items: T[], numericSelector: (item: T) => number): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  return items.reduce((currentMax, item) => {
    return numericSelector(item) > numericSelector(currentMax) ? item : currentMax;
  });
}

export function averageBy<T>(items: T[], numericSelector: (item: T) => number): number {
  if (items.length === 0) {
    return 0;
  }

  return sumBy(items, numericSelector) / items.length;
}

export interface CourseEnrollmentSummary {
  courseId: string;
  title: string;
  category: CourseCategory;
  enrolledCount: number;
  revenueUsd: number;
  pendingBalanceUsd: number;
  occupancyRate: number;
}

export function buildCourseEnrollmentSummaries(
  courses: CookingCourse[],
  enrollments: Enrollment[]
): CourseEnrollmentSummary[] {
  return courses.map((course) => {
    const enrollmentsForCourse = enrollments.filter((enrollment) => enrollment.courseId === course.id);
    const enrolledCount = enrollmentsForCourse.length;
    const revenueUsd = sumBy(enrollmentsForCourse, (enrollment) => enrollment.totalPaidUsd);
    const pendingBalanceUsd = sumBy(enrollmentsForCourse, (enrollment) => {
      return Math.max(course.priceUsd - enrollment.totalPaidUsd, 0);
    });

    return {
      courseId: course.id,
      title: course.title,
      category: course.category,
      enrolledCount,
      revenueUsd,
      pendingBalanceUsd,
      occupancyRate: course.maxStudents === 0 ? 0 : enrolledCount / course.maxStudents
    };
  });
}

export function countCoursesByCategory(courses: CookingCourse[]): Record<string, number> {
  return countByCategory(courses, (course) => course.category);
}

export function totalRevenue(enrollments: Enrollment[]): number {
  return sumBy(enrollments, (enrollment) => enrollment.totalPaidUsd);
}

export function averageCoursePrice(courses: CookingCourse[]): number {
  return averageBy(courses, (course) => course.priceUsd);
}
