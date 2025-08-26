// const jwt = require("jsonwebtoken");
import RefreshToken from "../models/RefreshToken";
import jwt from "jsonwebtoken";
import crypto from "crypto";

type JwtUserPayload = {
  _id: string;
  email: string;
};

const generateTokens = async (user: JwtUserPayload) => {
  ///here we create an accesstoken using jwt
  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "30m" }
  );

  ///generate a token
  const refreshToken = crypto.randomBytes(40).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // refresh token expires in 7 days

  //here we store the refresh token in the db allocated to the user
  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expiresAt,
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
/// the refresh token is stored in the db so when the 30min access token expires the user doesnt need to login we just generate a new access token
/// provided thers still a refresh token that hasnt expired
