class ValidaFormulario {
constructor() {
   this.formulario = document.querySelector('.formulario');
   this.inputCpf = document.querySelector('.cpf')
   this.eventos();
}

eventos() {
   this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
   });
}

handleSubmit(e) {
   e.preventDefault();
   const camposValidos = this.validField();
   const passwordsValidas = this.passwordValid();

   if(camposValidos && passwordsValidas) {
      alert('Formulário enviado.');
      this.formulario.submit();
   }
}

passwordValid() {
   let valid = true;

   const password = this.formulario.querySelector('.password');
   const repetirSenha = this.formulario.querySelector('.repeatedPassword');

   if(password.value !== repetirSenha.value) {
      valid = false;
      this.creatError(password, 'Campos senha e repetir senha precisar ser iguais.');
      this.creatError(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
   }

   if(password.value.length < 6 || password.value.length > 12) {
      valid = false;
      this.creatError(password, 'Senha precisa estar entre 6 e 12 caracteres.');
   }

   return valid;
}

validField() {
   let valid = true;

   for(let errorText of this.formulario.querySelectorAll('.text-danger')) {
      errorText.remove();
   }

   for(let field of this.formulario.querySelectorAll('.validate')) {
      const label = field.previousElementSibling.innerText;

      if(!field.value) {
      this.creatError(field, `Campo "${label}" não pode estar em branco.`);
      valid = false;
   }

      if(field.classList.contains('cpf')) {
      if(!this.validaCPF(field)) valid = false;
   }

      if(field.classList.contains('user-name')) {
      if(!this.validaUsuario(field)) valid = false;
   }

   }

   return valid;
}

checkChar() {
   this.inputCpf.addEventListener('keypress', (e) => {
      let char = String.fromCharCode(e.keyCode);
      const pattern = '[0-9 - - .]';
      if(!char.match(pattern)) e.preventDefault();
   })
}

validaUsuario(field) {
   const usuario = field.value;
   let valid = true;

   if(usuario.length < 3 || usuario.length > 12) {
      this.creatError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
   }

   if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.creatError(field, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
   }

   return valid;
}

validaCPF(field) {
   const cpf = new ValidaCPF(field.value);

   if(!cpf.verifidaCPF()) {
      this.creatError(field, 'CPF inválido.');
      return false;
   }

   return true;
}

creatError(field, msg) {
   const div = document.createElement('div');
   div.innerHTML = msg;
   div.classList.add('text-danger');
   field.insertAdjacentElement('afterend', div);
}
}

const valida = new ValidaFormulario();

valida.checkChar()
