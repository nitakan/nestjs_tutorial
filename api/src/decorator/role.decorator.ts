import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/domain/entity/role.entity";
import { User } from "src/domain/entity/user.entity";


export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user as User;
        
        return requiredRoles.some((role) => {
            if (role == Role.Admin) {
                if (user.roles.some(r => r.isAdmin)) {
                    return true;
                } else {
                    return false;
                }
            }
            return user.roles.length > 0;
        });
    }

}