import teacherReview from "../models/reviews.teacher.model.js";

export const reviewOfTeacher = async (req, res, next) => {
    try {
        let currentUser = await teacherUser.findById(req.tokenPayload.userId);

        const currentTeacherReview = currentUser.review.map((element) =>
            element.toString()
        );

        const isReviewed = currentTeacherReview.some(
            (elem) => elem === req.params.id
        );

        let updatedTeacherReview;

        isReviewed = {
            updatedTeacherReview = await teacherUser.findByIdAndUpdate(
                req.tokenPayload.userId,
                {
                    $pull: { review: req.params.id },
                },
                { new: true }
            );
        } 

        res.status(200).json(updatedTeacherReview);
    } catch (err) {
        next(err);
    }
};

// export const addFavorites = async (req, res, next) => {
//     try {
//         let currentUser = await studentUser.findById(req.tokenPayload.userId);

//         const currentStudentFavorites = currentUser.favorites.map((element) =>
//             element.toString()
//         );

//         const isInFavorites = currentStudentFavorites.some(
//             (elem) => elem === req.params.id
//         );

//         let updatedStudentFavorites;

//         if (isInFavorites) {
//             updatedStudentFavorites = await studentUser.findByIdAndUpdate(
//                 req.tokenPayload.userId,
//                 {
//                     $pull: { favorites: req.params.id },
//                 },
//                 { new: true }
//             );
//         } else {
//             updatedStudentFavorites = await studentUser.findByIdAndUpdate(
//                 req.tokenPayload.userId,
//                 {
//                     $addToSet: { favorites: req.params.id },
//                 },
//                 { new: true }
//             );
//         }

//         res.status(200).json(updatedStudentFavorites);
//     } catch (err) {
//         next(err);
//     }
// };
