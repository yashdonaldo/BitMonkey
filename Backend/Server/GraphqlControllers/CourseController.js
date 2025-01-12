// import {redisClient} from '../../config/RedisDatabase.js';
import CourseModal from '../../Modals/CourseModal.js';
import ErrorHandle from '../../utilis/errorHandle.js';
import { AuthroizeAndAuthenticateUser } from '../MiddlewareGraphql/AuthUser.js';
import WraphAsyncError from '../MiddlewareGraphql/WraphAsync.js';

// Create Course
export const CreateCourse = WraphAsyncError(async (parent, { tittle, discription, thumbnail, category }, context) => {
    const { user } = await AuthroizeAndAuthenticateUser("admin")(context)
    if (!tittle || !discription || !thumbnail || !category) {
        throw new ErrorHandle("Please Enter Course Details", 400)
    }
    const newCourse = await CourseModal.create({ tittle, discription, thumbnail, category, user: user._id })
    if (!newCourse) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Course Created Successfully"
})

// Get All Courses
export const GetAllCourses = WraphAsyncError(async (parent, args, context) => {
    const courses = await CourseModal.find().populate("user")
    return courses
})

// Get Single Course
export const GetSingleCourse = WraphAsyncError(async (parent, { id }, context) => {
    const course = await CourseModal.findById(id).populate("user");
    if (!course) {
        throw new ErrorHandle("Course Not Found", 400)
    }

    if(!course.enroll){
        throw new ErrorHandle("Please Enroll to the course", 400)
    }
    return course
});

// Update Course
export const UpdateCourse = WraphAsyncError(async (parent, { id, tittle, discription, thumbnail, category }, context) => {
    await AuthroizeAndAuthenticateUser("admin")(context)
    const course = await CourseModal.findById(id)
    if (!course) {
        throw new ErrorHandle("Course Not Found", 400)
    }
    const updateCourse = await CourseModal.findByIdAndUpdate(id, { tittle, discription, thumbnail, category }, { new: true })
    if (!updateCourse) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Course Updated Successfully"
})

// Delete Course
export const DeleteCourse = WraphAsyncError(async (parent, { id }, context) => {
    await AuthroizeAndAuthenticateUser("admin")(context)
    const course = await CourseModal.findById(id)
    if (!course) {
        throw new ErrorHandle("Course Not Found", 400)
    }
    const deleteCourse = await CourseModal.findByIdAndDelete(id)
    if (!deleteCourse) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Course Deleted Successfully"
});

// Enroll Course
export const EnrollCourse = WraphAsyncError(async (parent, { id }, context) => {
    await AuthroizeAndAuthenticateUser("user", "root admin")(context)
    const course = await CourseModal.findById(id)
    if (!course) {
        throw new ErrorHandle("Course Not Found", 400)
    }
    const enrollCourse = await CourseModal.findByIdAndUpdate(id, { enroll: true }, { new: true })
    if (!enrollCourse) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Course Enrolled Successfully"
});

// Unenroll Course
export const UnenrollCourse = WraphAsyncError(async (parent, { id }, context) => {
    await AuthroizeAndAuthenticateUser("user", "root admin")(context)
    const course = await CourseModal.findById(id)
    if (!course) {
        throw new ErrorHandle("Course Not Found", 400)
    }
    const unenrollCourse = await CourseModal.findByIdAndUpdate(id, { enroll: false }, { new: true })
    if (!unenrollCourse) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Course Unenrolled Successfully"
});



