// import { studentReview } from '../models/reviews.student.model.js';
// import studentUser from '../models/students.model.js';
// import teacherUser from '../models/teachers.model.js';

// export const reviewOfStudent = async (req, res, next) => {
//     try {
//         let currentUser = await studentUser.findById(req.tokenPayload.userId);

//         const review = await studentReview.create(req.body);
//         const reviewId = review._id;

//         let updateStudentReview = await teacherUser.findByIdAndUpdate(
//             req.tokenPayload.userId,
//             {
//                 $push: { reviews: reviewId },
//             },
//             { new: true }
//         );

//         res.status(200).json(updateStudentReview);
//     } catch (err) {
//         next(err);
//     }
// };
