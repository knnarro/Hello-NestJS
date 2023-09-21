import { ConfigService } from "@nestjs/config"
import { User } from "src/auth/user.entity"
import { Board } from "src/boards/board.entity"

import('adminjs').then(async ({AdminJS}) => AdminJS.registerAdapter({
  Resource: await import('@adminjs/typeorm').then(({Resource})=>{ return Resource }),
  Database: await import('@adminjs/typeorm').then(({Database})=>{ return Database })
}))

const DEFAULT_ADMIN = { email:'admin@example.com', password:'password' };

const authenticate = async(email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null;
}

export const adminJsOptions = {
  adminJsOptions:{
    rootPath: '/admin',
    resources: [User, Board],
  },
  auth: {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'secret'
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: 'secret'
  }
}
