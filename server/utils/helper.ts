import jwt from "jsonwebtoken";
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return false;
  } catch (error: any) {
    return (
      error.name === "TokenExpiredError" || error.name === "JsonWebTokenError"
    );
  }
}
