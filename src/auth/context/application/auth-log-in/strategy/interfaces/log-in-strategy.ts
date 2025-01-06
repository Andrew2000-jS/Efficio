import { ApiResponse } from '@shared/context';
import { AuthPrimitives } from '@auth/context/domain';

export interface LogInStrategy {
  execute(auth: AuthPrimitives): Promise<ApiResponse<string | null>>;
}
