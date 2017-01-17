import { Component } from '@angular/core';

@Component({
  selector: 'application',
  template: `<h1>Hello!! {{name}}</h1>`,
})
export class AppComponent 
{
	name = 'Angular';
}
