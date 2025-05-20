import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.isAdmin) {
      throw new ForbiddenException(
        'Apenas administradores podem acessar este recurso.',
      );
    }

    return true;
  }
}