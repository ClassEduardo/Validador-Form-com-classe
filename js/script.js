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
      for(let errorText of this.formulario.querySelectorAll('.text-danger')) {
         errorText.remove();
      }
      for(let field of this.formulario.querySelectorAll('.validate')) {
         const label = field.previousElementSibling.innerHTML;
         if(!field.value) {
            this.creatError(field, `Campo "${label}" não pode estar em branco.`)
            valid = false
         }
         if(field.classList.contains('cpf')) {
            if(!this.validaCPF(field)) valid = false;
         }

         if(field.classList.contains('user-name-tag')) {
            if(!this.validaUser(field)) valid = false;
         }
      }
   }
   validaUser(field) {
      const user = field.value;
      let valid = true;
      if(user.length < 3 || user.length > 12); {
         this.creatError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
         valid = false;
      }
      if(!user.match(/^[a-zA-Z0-9]+$/g)); {
         this.creatError(field, 'Tag usuário precisa conter apenas letras e/ou números.');
         valid = false;
      }
      return valid;
   }

   validaCPF(field) {
      const cpf = new ValidaCPF(field.value)
      if(!cpf.verifidaCPF()) {
         this.creatError(field, 'CPF inválido.')
         return false;
      }
      return true;
   }

   creatError(field, mnsg) {
      const div = document.createElement('div');
      div.innerHTML = mnsg;
      div.classList.add('text-danger');
      field.insertAdjacentElement('afterend', div);
   }
}

const form = new ValidaFormulario();