import { JwtDtoResponse } from '@/dtos/jwt.dto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any): Promise<JwtDtoResponse> {
    return {
      _id: payload._id,
      username: payload.username,
      roles: payload.roles,
      iat: payload.iat,
      exp: payload.exp,
    };
  }
}
