import joi from 'joi';
const signupSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.ref('password')
});
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required()
});
export function loginValidate(req,res,next){
  const result = loginSchema.validate(req.body);
  console.log(req.body)
  if(result.error){
    res.status(400).json({error:result.error.details[0].message});
  }
  else{
    next();
  }
}
export function signupValidate(req,res,next){
  const result = signupSchema.validate(req.body);
  console.log(req.body)
  if(result.error){
    res.status(400).json({error:result.error.details[0].message});
  }
  else{
    next();
  }
}
