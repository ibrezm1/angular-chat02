// stream.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  streamMessage(url: string, message: string): Observable<string> {
    return new Observable(observer => {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      })
      .then(response => response.body!.getReader())
      .then(reader => {
        const decoder = new TextDecoder();
        let output = '';

        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              observer.complete();
              return;
            }
            output += decoder.decode(value);
            observer.next(output);
            readStream();
          });
        };

        readStream();
      })
      .catch(error => observer.error(error));
    });
  }
}
