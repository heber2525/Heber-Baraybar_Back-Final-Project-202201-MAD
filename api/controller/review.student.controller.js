// import studentReview from "../models/reviews.student.model.js";
// import studentUser from "../models/students.model";
// import teacherUser from "../models/teachers.model.js";

// export const reviewOfStudent = async (req, res, next) => {
//     try {
//         let currentUser = await studentUser.findById(req.tokenPayload.userId);

//         const currentStudentReview = currentUser.review.map((element) =>
//             element.toString()
//         );

//         const isReviewed = currentStudentReview.some(
//             (elem) => elem === req.params.id
//         );

//         let updateStudentReview;

//         isReviewed = {
//             updateStudentReview = await teacherUser.findByIdAndUpdate(
//                 req.tokenPayload.userId,
//                 {
//                     $pull: { review: req.params.id },
//                 },
//                 { new: true }
//             )
//         }

//         res.status(200).json(updateStudentReview);
//     } catch (err) {
//         next(err);
//     }

// };
