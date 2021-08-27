const checkForm = (form) => {
        if(form.Projectnaam === ""){
          return false
        }else if(form.Klant === ""){
          return false
        }else if(form.Projectnummer === ""){
          return false
        }else if(form.Naam === ""){
          return false
        }else{
          return true
        }
}

export default checkForm