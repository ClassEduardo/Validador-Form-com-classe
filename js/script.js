class ValidaFormulario {
   constructor() {
      this.formulario = document.querySelector('.formulario');
      this.eventos();
   }

   eventos() {
      this.formulario.addEventListener('submit', e => {
         this.handleSubmit(e);
      })
   }

   handleSubmit(e) {
      e.preventDefault();
      const camposValidos = this.validField();
   }

   validField(){
      let valid = true;

      for(let field of this.formulario.querySelectorAll('.validate')) {
         const label = field.previousElementSibling.innerHTML;
         if(!field.value) {
            this.creatError(field, `Campo "${label}" não pode estar em branco`)
            valid = false
         }
      }
   }

   creatError(field, mnsg) {

      const div = document.createElement('div');
      div.innerHTML = mnsg;
      div.classList.add('text-danger');
      field.insertAdjacentElement('afterend', div);
   }
}

const form = new ValidaFormulario();