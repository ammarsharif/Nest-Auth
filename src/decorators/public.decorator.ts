import { SetMetadata } from '@nestjs/common';
import { PUBLIC_META_KEY } from '../utils/const';

export const Public = () => SetMetadata(PUBLIC_META_KEY, true);
