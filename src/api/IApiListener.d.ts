import { ISystemResponse } from 'auria-lib';
import { ISystemRequest } from '../http/ISystemRequest.js';
import { ExposedApiRoutesMetadata } from './ExposedApiEnpointsMetadata.js';
export interface IApiListener {
    name: string;
    baseUrl: () => string;
    answerRequest: (request: ISystemRequest) => any | ISystemResponse | Promise<any> | Promise<ISystemResponse>;
    exposedApiRoutes: () => ExposedApiRoutesMetadata;
}
