import mongoose from 'mongoose'

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: {
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
    }
},
{timestamps: true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  // Password validation method
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User = new mongoose.model("User", userSchema);

const Signup = mongoose.model('Signup', signupSchema);

export default Signup
