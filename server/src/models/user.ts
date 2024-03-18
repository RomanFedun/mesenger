import { Error, model, Schema } from 'mongoose';
import { UserDocument } from '../types/user.interface';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema<UserDocument>({
    userName: {
        type: String,
        required: [true, 'userName is required'],
        createIndexes: {unique: true}
    },
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    }
},
    {timestamps: true}
);

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    try{
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err as Error);
    }
});

userSchema.methods.validatePassword = function (password: string) {
    return bcryptjs.compare(password, this.password)
}

export default model<UserDocument>('User', userSchema);
