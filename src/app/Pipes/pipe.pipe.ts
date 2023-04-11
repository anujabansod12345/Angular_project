import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class PipePipe implements PipeTransform {

  transform(value: any) {
var string = value.replace(/ /g, "")
return string;
}

}
