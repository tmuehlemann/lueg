export const jwtConstants = {
  // todo: use env variables
  secret: 'basic text for now :)',
};

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
