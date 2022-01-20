import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestContext } from "src/domain/entity/request.entity";

export const ReqCtx = createParamDecorator<string, ExecutionContext, RequestContext>(
    (data: string, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return RequestContext.fromRequest(request);
    },
  );

