import { inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";


export const getToken = () => {
  const localStorage = inject(DOCUMENT).defaultView?.localStorage
  return localStorage?.getItem('token') || null
}
