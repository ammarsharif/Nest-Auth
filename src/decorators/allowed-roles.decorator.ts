import { SetMetadata } from '@nestjs/common';
import { ALLOWED_ROLES_META_KEY } from '../utils/const';
import { Role } from '../modules/public/person/enum/role.enum';

export const AllowedRoles = (roles: Role[]) => SetMetadata(ALLOWED_ROLES_META_KEY, roles);
