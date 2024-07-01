export const decodeHtmlEntity = (function () {
   const element = document.createElement('div');

   const decodeHTMLEntities = (text: string) => {
      if (text && typeof text === 'string') {
         // strip script/html tags
         text = text.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
         text = text.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
         element.innerHTML = text;
         text = element.textContent ?? '';
         element.textContent = '';
      }

      return text;
   }

   return decodeHTMLEntities;
})();