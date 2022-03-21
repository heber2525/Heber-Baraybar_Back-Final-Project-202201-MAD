// import mongoose from 'mongoose';

// const modelName = 'studentReview';

// const reviewSchema = new mongoose.Schema({
//     TeacherId: { type: mongoose.Types.ObjectId, ref: 'teacherUser' },
//     text: { type: String, required: true },
// });

// reviewSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         delete returnedObject.__v;
//         delete returnedObject.passwd;
//     },
// });
// let teacherUser;
// if (mongoose.default.models[modelName]) {
//     teacherUser = mongoose.model(modelName);
// } else {
//     teacherUser = mongoose.model(modelName, reviewSchema);
// }

// export default studentReview;
