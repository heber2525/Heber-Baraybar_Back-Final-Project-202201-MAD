import mongoose from 'mongoose';

const modelName = 'teacherUser';
const teacherUserSchemma = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    languages: { type: Array, required: true },
    price: { type: String, required: true },
    comment: { type: String, required: true },
    password: { type: String, required: true },
});
teacherUserSchemma.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwd;
    },
});
let teacherUser;
if (mongoose.default.models[modelName]) {
    teacherUser = mongoose.model(modelName);
} else {
    teacherUser = mongoose.model(modelName, teacherUserSchemma);
}

export default teacherUser;
