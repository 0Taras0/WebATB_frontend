import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        toastr.error('Сервер не відповідає. Спробуйте пізніше.', 'Помилка мережі');
      } else if (error.status >= 500) {
        toastr.error('Сталася серверна помилка.', `Код: ${error.status}`);
      } else {
        toastr.warning(error.message, `Помилка ${error.status}`);
      }

      return throwError(() => error);
    })
  );
};
