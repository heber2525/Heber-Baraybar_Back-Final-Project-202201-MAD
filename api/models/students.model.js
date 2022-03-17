import mongoose from 'mongoose';

const modelName = 'studentUser';

const studentUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    languages: { type: Array, required: true, ref: 'languages' },
    comment: { type: String, required: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose.Types.ObjectId, ref: 'teacherUser' }],
});
studentUserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwd;
    },
});
let studentUser;
if (mongoose.default.models[modelName]) {
    studentUser = mongoose.model(modelName);
} else {
    studentUser = mongoose.model(modelName, studentUserSchema);
}

export default studentUser;
