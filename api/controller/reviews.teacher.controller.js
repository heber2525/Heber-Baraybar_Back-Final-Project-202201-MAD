// import teacherReview from '../models/reviews.teacher.model.js';

// import teacherUser from '../models/teachers.model.js';

// export const reviewOfTeacher = async (req, res, next) => {
//     try {
//         let currentUser = await teacherUser.findById(req.tokenPayload.userId);

//         const review = await teacherReview.create(req.body);
//         const reviewId = review._id;

//         let updatedTeacherReview = await teacherUser.findByIdAndUpdate(
//             req.tokenPayload.userId,
//             {
//                 $push: { reviews: reviewId },
//             },
//             { new: true }
//         );

//         res.status(200).json(updatedTeacherReview);
//     } catch (err) {
//         next(err);
//     }
// };
