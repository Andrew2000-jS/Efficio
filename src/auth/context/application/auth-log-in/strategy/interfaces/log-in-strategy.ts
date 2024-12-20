import { ApiResponse } from '@shared/context';
import { AuthPrimitives } from 'src/auth/context/domain/auth.entity';

export interface LogInStrategy {
  execute(auth: AuthPrimitives): Promise<ApiResponse<string | null>>;
}
