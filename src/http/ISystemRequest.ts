import { User } from "../user/User.js";

export interface ISystemRequest<T = any> {
  /**
   * Full URL
   * --------
   * API Url requested WITH queryString attached
   */
  fullUrl: string;

  /**
   * URL
   * ----
   * API Requested url, must match an ApiEndpoint URL
   */
  url: string;

  /**
   *
   */
  queryString: string;

  resolvedQueryString: {
    [parameter: string]: any;
  };

  parameters: T;

  /**
   * State Parameters
   * -----------------
   *
   */
  headers: { [name: string]: string | string[] };

  cookies: { [name: string]: string };

  /**
   * System Name
   * ------------
   * System this request was made to
   */
  system: string;

  redirected: false;

  referer: string;

  getUser(): User | undefined;
}
