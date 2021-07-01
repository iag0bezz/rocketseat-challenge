/* eslint-disable prettier/prettier */
/*
    CREDITOS PARA O AUTOR: https://github.com/alferov/is-github-url
    * RETIREI E SIMPLIFIQUEI O QUE PRECISAVA UTILIZAR.
*/
export function isValidUrl(url) {
  const regex = '(?:git|https?|git@)(?:\\:\\/\\/)?github.com[/|:][A-Za-z0-9-]+?\\/[\\w\\.-]+\\/?(?!=.git)(?:\\.git(?:\\/?|\\#[\\w\\.\\-_]+)?)?$';

  return new RegExp(regex).test(url);
}
