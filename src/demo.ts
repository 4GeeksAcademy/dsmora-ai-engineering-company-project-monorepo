import { findFirstLinear, findInSortedCollection, groupCollectionBy, sortCollection } from "./utils/collections";
import { sampleCourse, sampleEnrollment, sampleStudent, Student } from "./types/models";
import {
  averageCoursePrice,
  buildCourseEnrollmentSummaries,
  countCoursesByCategory,
  totalRevenue
} from "./utils/transformations";
import { validateCourse, validateEnrollment, validateStudent } from "./utils/validations";

const students: Student[] = [sampleStudent];
const courses = [sampleCourse];
const enrollments = [sampleEnrollment];

const studentByEmail = findFirstLinear(students, (student) => student.email === "ana.gomez@example.com");
const sortedByName = sortCollection(students, (left, right) => left.fullName.localeCompare(right.fullName));
const sortedCoursesByPrice = sortCollection(courses, (left, right) => left.priceUsd - right.priceUsd);
const foundCourseByPrice = findInSortedCollection(sortedCoursesByPrice, sampleCourse, (left, right) => left.priceUsd - right.priceUsd);
const studentsByLevel = groupCollectionBy(students, (student) => student.experienceLevel);

const studentValidation = validateStudent(sampleStudent);
const courseValidation = validateCourse(sampleCourse);
const enrollmentValidation = validateEnrollment(sampleEnrollment, sampleStudent, sampleCourse);

const courseCategoryCount = countCoursesByCategory(courses);
const enrollmentSummaries = buildCourseEnrollmentSummaries(courses, enrollments);
const totalRevenueUsd = totalRevenue(enrollments);
const avgCoursePriceUsd = averageCoursePrice(courses);

console.log("Student found by email:", studentByEmail);
console.log("Students sorted by name:", sortedByName);
console.log("Course found in sorted array:", foundCourseByPrice);
console.log("Students grouped by level:", studentsByLevel);
console.log("Student validation:", studentValidation);
console.log("Course validation:", courseValidation);
console.log("Enrollment validation:", enrollmentValidation);
console.log("Course count by category:", courseCategoryCount);
console.log("Enrollment summaries:", enrollmentSummaries);
console.log("Total revenue:", totalRevenueUsd);
console.log("Average course price:", avgCoursePriceUsd);
