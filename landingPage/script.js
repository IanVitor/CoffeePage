const URL = "db.json";
const btn = document.querySelector("#btn");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#senha-input");
const errorText = document.querySelector("#error-text");
const emailContainer = document.querySelector("#email-input-icon");
const passwordContainer = document.querySelector("#senha-input-icon");

// Funcao que pega os valores do json e transforma em objeto javascript.

const getData = async() => {

  const response = await fetch(URL);
  const data = await response.json();

  return data
}

// Funcao que verifica a autenticidade dos valores de entrada do usuario.

const checkData = async() =>{

  const data = await getData();
  const dataLength = data.users.length;

  let access = false;

  for(let i=0; i<=dataLength-1; i++){
    
    if(data.users[i].email === emailInput.value && data.users[i].password === passwordInput.value)
    {
      access = true
      break;
    }
  }

  if(access === false)
  {
    passwordContainer.classList.add("error");
    emailContainer.classList.add("error");
    errorText.classList.remove("hide");
  }


  return access
}

// Funcao para validar se o usuario tera acesso e abrir nova guia

const validateData = async() => {

  const access = await checkData()

  {access ? window.open("../coffe/index.html", "_self"): 
  setTimeout(throwError, 3000) }
}

function throwError() {
  passwordContainer.classList.remove("error");
  emailContainer.classList.remove("error");
  errorText.classList.add("hide");
}

// Executar a validacao de dados apartir do click ou enter.

btn.addEventListener('click', validateData)

passwordInput.addEventListener("keyup", (e) => {

  if(e.code === "Enter") {
      validateData()
    }
  }
)

emailInput.addEventListener("keyup", (e) => {

  if(e.code === "Enter") {
      validateData()
    }
  }
)