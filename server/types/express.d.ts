import "@clerk/clerk-sdk-node";
import { AuthObject } from "@clerk/clerk-sdk-node";
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthObject; // Clerk adds this
    }
  }
}

declare global {
  namespace Express {
    export interface Request {
      user?: {
        _id: string;
        email?: string;
      };
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      redisClient?: Redis;
    }
  }
}
