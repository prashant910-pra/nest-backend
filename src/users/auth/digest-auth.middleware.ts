// auth/digest-auth.middleware.ts
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DigestAuthMiddleware implements NestMiddleware {
  private users = [{ username: 'user1', password: '$2b$10$...' }]; // Replace with hashed password

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED).send('Authorization header required');
    }

    const [username, password] = this.parseDigestAuthHeader(authHeader);
    const user = this.users.find(u => u.username === username);

    if (user && this.validatePassword(password, user.password)) {
      return next();
    }

    return res.status(HttpStatus.UNAUTHORIZED).send('Invalid credentials');
  }

  private parseDigestAuthHeader(header: string): [string, string] {
    // Parse the Digest Authentication header to extract username and password
    const parts = header.split(' ')[1].split(',');
    const username = parts.find(part => part.trim().startsWith('username=')).split('=')[1].replace(/"/g, '');
    const password = parts.find(part => part.trim().startsWith('response=')).split('=')[1].replace(/"/g, '');
    return [username, password];
  }

  private async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
