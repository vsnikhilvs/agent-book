import { NextFunction, Request, Response } from "express";
export interface AuthenticatedRequest extends Request {
    userId?: string;
}
export declare function requireUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map