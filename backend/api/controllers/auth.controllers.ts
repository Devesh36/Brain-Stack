import { Request, Response, RequestHandler } from 'express';
import userModel from '../models/user'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";

const signupSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email().max(50),
    password: z
        .string()
        .min(6, "Password must be om minimum 6 char")
        .refine((val) => /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(val), "Password must contain atleast one special character")
        .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
        .refine((val) => /.*[0-9].*/.test(val), "Password must contain at least one number"),
})

const loginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z
        .string()
        .min(6, "Password must be om minimum 6 char")
        .refine((val) => /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(val), "Password must contain atleast one special character")
        .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter")
        .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
        .refine((val) => /.*[0-9].*/.test(val), "Password must contain at least one number"),
})




export const signup: RequestHandler = async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.errors[0]?.message || "Invalid inputs";
    res.status(400).json({ message: firstError, errors: result.error.errors });
    return;
  }

  const { username, email, password } = result.data;

  try {
    // Check username and email separately for clear responses
    const existingByUsername = await userModel.findOne({ username }).lean();
    if (existingByUsername) {
      res.status(409).json({ message: "Username already exists." });
      return;
    }

    const existingByEmail = await userModel.findOne({ email }).lean();
    if (existingByEmail) {
      res.status(409).json({ message: "Email already exists." });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const created = await userModel.create({ username, email, password: hashed });

    res.status(201).json({
      result: { id: created._id, username: created.username, email: created.email },
      message: "Account created"
    });
    return;
  } catch (err: any) {
    // Mongo duplicate key fallback
    if (err?.code === 11000) {
      res.status(409).json({ message: "Email or username already exists." });
      return;
    }
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export async function login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body)
    console.log(JSON.stringify(result));

    if (!result.success) {
        res.status(411).json({
            message: "Error in inputs"
        })
        return
    }

    const { username, password } = result.data;

    if (!username || !password) {
        res.status(411).json({
            message: "Error in inputs"
        })
        return
    }

    try {

        const existingUser = await userModel.findOne({ username })

        if (!existingUser) {
            res.status(404).json({
                message: 'Username not found'
            })
            return
        }

        const isMatch = await bcrypt.compare(password, existingUser.password!)
        if (!isMatch) {
            res.status(403).json({
                message: "Error password not matching"
            })
            return
        }

        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET!)

        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }).status(200).json({
            message: "Login Succesfull"
        })

    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error"
        })
    }
}

export function logout(req: Request, res: Response) {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            error,
            message: "Server Error during logout"
        });
    }
}

export function verifyAuth(req: Request, res: Response) {
    // If this function is reached, it means the auth middleware has validated the token
    res.status(200).json({
        message: "User is authenticated",
        userId: req.userId
    });
}