import Content from '../../Modals/ContentModel.js';
import WraphAsyncError from '../MiddlewareGraphql/WraphAsync.js';
import { AuthroizeAndAuthenticateUser, isAuthenticateUser } from '../MiddlewareGraphql/AuthUser.js';
import ErrorHandle from '../../utilis/errorHandle.js';

// Content Create
export const ContentCreate = WraphAsyncError(async (_, { tittle, description, image, course_type }, context) => {
    await AuthroizeAndAuthenticateUser("admin")(context);
    if (!tittle || !description || !image || !course_type) {
        throw new ErrorHandle("Please Enter Content Details", 400)
    }
    const newContent = await Content.create({ tittle, description, image, course: course_type });
    if (!newContent) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Content Created Successfully"
})

// Get All Content
export const GetAllContent = WraphAsyncError(async (parent, args, context) => {
    await isAuthenticateUser(context);
    const content = await Content.find().populate({
        path: "course",
        populate: {
            path: "user",
            model: "User"
        }
    })
    if (!content) {
        throw new ErrorHandle("Internal Server Error", 500)
    };
    return content
});

// Get Single Content
export const GetSingleContent = WraphAsyncError(async (parent, { id }, context) => {
    await isAuthenticateUser(context);
    const content = await Content.findById(id).populate({
        path: "course",
        populate: {
            path: "user",
            model: "User"
        }
    })
    if (!content) {
        throw new ErrorHandle("Content Not Found", 400)
    };
    return content
});

// Update Content
export const UpdateContent = WraphAsyncError(async (parent, { id, tittle, description, image, course_type }, context) => {
    await AuthroizeAndAuthenticateUser("admin")(context);
    const content = await Content.findById(id)
    if (!content) {
        throw new ErrorHandle("Content Not Found", 400)
    }
    const updateContent = await Content.findByIdAndUpdate(id, { tittle, description, image, course: course_type }, { new: true })
    if (!updateContent) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Content Updated Successfully"
});

// Delete Content
export const DeleteContent = WraphAsyncError(async (parent, { id }, context) => {
    await AuthroizeAndAuthenticateUser("admin")(context);
    const content = await Content.findById(id)
    if (!content) {
        throw new ErrorHandle("Content Not Found", 400)
    }
    const deleteContent = await Content.findByIdAndDelete(id)
    if (!deleteContent) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Content Deleted Successfully"
});

// Get Content By Course
export const GetContentByCourse = WraphAsyncError(async (parent, { id }, context) => {
    await isAuthenticateUser(context);
    const content = await Content.find({ course: id }).populate({
        path: "course",
        populate: {
            path: "user",
            model: "User"
        }
    })
    if (!content) {
        throw new ErrorHandle("Content Not Found", 400)
    };
    return content
});

// Get Content By Course Type
export const GetContentByCourseType = WraphAsyncError(async (parent, { categorys }, context) => {
    await isAuthenticateUser(context);
    console.log(categorys)
    const content = await Content.find({ course: {$ne:null} }).populate({
        path: "course",
        match: { category: categorys },
        populate: {
            path: "user",
            model: "User"
        }
    })
    console.log(content)
    if (!content) {
        throw new ErrorHandle("Content Not Found", 400)
    };
    return content
});

// Complete Content
export const CompleteContent = WraphAsyncError(async (parent, { id }, context) => {
    await AuthroizeAndAuthenticateUser("user", "root admin")(context);
    const content = await Content.findById(id)
    if (!content) {
        throw new ErrorHandle("Content Not Found", 400)
    }
    const completeContent = await Content.findByIdAndUpdate(id, { complete: true }, { new: true })
    if (!completeContent) {
        throw new ErrorHandle("Internal Server Error", 500)
    }
    return "Content Completed Successfully"
});

